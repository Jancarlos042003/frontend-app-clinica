import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

// Función para verificar el estado actual del permiso (sin AsyncStorage)
export const checkLocationPermission = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status === 'granted';
};

// Función para verificar si fue denegado permanentemente
export const wasPermissionDeniedPermanently = async () => {
  const deniedState = await AsyncStorage.getItem('locationPermissionDenied');
  return deniedState === 'permanently';
};

export const requestPermission = async () => {
  // 1. Verificar primero si ya tenemos permisos
  const { status: currentStatus } = await Location.getForegroundPermissionsAsync();

  if (currentStatus === 'granted') {
    // Limpiar cualquier estado de "denegado permanentemente" si ahora tiene permiso
    await AsyncStorage.removeItem('locationPermissionDenied');
    const currentLocation = await Location.getCurrentPositionAsync({});
    console.log('Latitud:', currentLocation.coords.latitude);
    console.log('Longitud:', currentLocation.coords.longitude);
    return { success: true, location: currentLocation };
  }

  // 2. Pedimos permiso al usuario
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    console.warn('Permiso de ubicación denegado');

    // Solo guardar en AsyncStorage si fue denegado permanentemente
    if (status === 'denied') {
      await AsyncStorage.setItem('locationPermissionDenied', 'permanently');
      return { success: false, permanentlyDenied: true };
    }

    return { success: false, permanentlyDenied: false };
  }

  // Limpiar estado anterior si ahora tiene permiso
  await AsyncStorage.removeItem('locationPermissionDenied');

  // 3. Si el usuario dio permiso, obtenemos la ubicación
  const currentLocation = await Location.getCurrentPositionAsync({});

  // 4. Ahora tenemos la ubicación
  console.log('Latitud:', currentLocation.coords.latitude);
  console.log('Longitud:', currentLocation.coords.longitude);

  return { success: true, location: currentLocation };
};

export const getCurrentLocation = async () => {
  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

export const getReverseGeocode = async (latitude: number, longitude: number) => {
  const result = await Location.reverseGeocodeAsync({ latitude, longitude });
  return result;
};

export const formatAddress = (address: Location.LocationGeocodedAddress[]) => {
  if (!address || !address.length) return 'Dirección no disponible';

  const { city, street, streetNumber, district, country } = address[0];

  // Construir la dirección por partes para manejar valores nulos
  const parts = [];

  // Calle y número
  if (street) {
    parts.push(streetNumber ? `${street} ${streetNumber}` : street);
  }

  // Distrito
  if (district) {
    parts.push(district);
  }

  // Ciudad
  if (city) {
    parts.push(city);
  }

  // País
  if (country) {
    parts.push(country);
  }

  return parts.length > 0 ? parts.join(', ') : 'Dirección no disponible';
};
