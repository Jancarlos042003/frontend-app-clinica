import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export const requestPermission = async () => {
  // 1. Pedimos permiso al usuario
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    console.warn('Permiso de ubicación denegado');
    // Guardamos el estado del permiso
    await AsyncStorage.setItem('locationPermission', 'false');
    return;
  }

  await AsyncStorage.setItem('locationPermission', 'true');

  // 2. Si el usuario dio permiso, obtenemos la ubicación
  const currentLocation = await Location.getCurrentPositionAsync({});

  // 3. Ahora tenemos la ubicación
  console.log('Latitud:', currentLocation.coords.latitude);
  console.log('Longitud:', currentLocation.coords.longitude);
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
