import { useState, useRef, useEffect } from 'react';
import { Pressable, View, Text, Animated, Easing, Alert } from 'react-native';

import { CheckV2Icon, ClockIcon, SquareCheckIcon, SquareIcon } from '../icons/icons';

import { useMedicationContext } from '~/context/MedicationContext';
import useApi from '~/hooks/useApi';
import { useMedicationTiming } from '~/hooks/useMedicationTiming';
import { Medication } from '~/types/medication';

interface MedicationCardProps {
  medication: Medication;
  onMedicationUpdate?: (updatedMedication: Medication) => void;
}

const MedicationCard = ({ medication, onMedicationUpdate }: MedicationCardProps) => {
  const [isTaken, setIsTaken] = useState(false);
  const [checked, setChecked] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(medication);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  // Hook para la API
  const { loading, fetchData } = useApi<Medication>();

  // Hook para el contexto de medicamentos
  const { updateMedication } = useMedicationContext();

  // Hook para manejo de tiempo y ventana de tolerancia
  const {
    shouldShowCheckbox: shouldShowCheckboxByTime,
    timeStatus,
    statusMessage,
  } = useMedicationTiming(currentMedication);

  // Helper functions to check medication status
  const isCompleted =
    currentMedication.status === 'COMPLETED' || currentMedication.status === 'Completado';

  // Combinar validaciones de estado y tiempo
  const shouldShowCheckbox = shouldShowCheckboxByTime;

  // Función para actualizar el estado de la medicación
  const updateMedicationStatus = async () => {
    try {
      const updatedMedication = await fetchData('/api/medications/status', 'PUT', {
        medicationId: currentMedication.medicationId,
        status: 'COMPLETED',
      });

      if (updatedMedication) {
        setCurrentMedication(updatedMedication);
        updateMedication(updatedMedication); // Actualizar el contexto
        onMedicationUpdate?.(updatedMedication);
        setIsTaken(true);
      }
    } catch (error) {
      console.error('Error al actualizar el estado de la medicación:', error);
      Alert.alert(
        'Error',
        'No se pudo actualizar el estado de la medicación. Inténtalo de nuevo.',
        [{ text: 'OK' }]
      );
      // Revertir el estado visual si hay error
      setChecked(false);
      setIsTaken(false);
    }
  };

  // Determine card styling based on status
  const getBorderStyle = () => {
    if (isCompleted) return 'border-green-600';
    if (checked) return 'border-primary';
    if (timeStatus.isLate && timeStatus.isToday) return 'border-red-400';
    return 'border-gray-300';
  };

  // Sincronizar el estado local cuando cambie la prop medication
  useEffect(() => {
    setCurrentMedication(medication);
  }, [medication]);

  useEffect(() => {
    if (checked) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
    }
  }, [checked]);

  const handleMarkAsTaken = async () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 120,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start(async () => {
      await updateMedicationStatus();
    });
  };

  const handlePressIn = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  return (
    <View>
      <View
        className={`flex-row items-center justify-between rounded-2xl border-2 ${getBorderStyle()} bg-white p-5`}>
        <View className="flex-row items-center">
          <View className="mr-4 rounded-full bg-primary_200 p-3 shadow-sm">
            <ClockIcon size={22} color="#32729f" />
          </View>
          <View>
            <View className="flex-row items-center gap-2">
              <Text className="text-[22px] font-extrabold tracking-tight text-black">
                {currentMedication.timeOfTaking}
              </Text>
              <View
                style={{
                  backgroundColor:
                    getColorMedicationStatus[currentMedication.status].backgroundColor,
                }}
                className="flex-row items-center rounded-full px-3 py-1">
                <Text
                  className="text-xs font-bold"
                  style={{ color: getColorMedicationStatus[currentMedication.status].color }}>
                  {currentMedication.status}
                </Text>
              </View>
            </View>
            <Text className="mt-1 text-base font-semibold text-gray-500">
              {currentMedication.nameMedicine} - {currentMedication.doses}
            </Text>
            {statusMessage &&
              timeStatus.isToday &&
              !isCompleted &&
              currentMedication.status !== 'NOT_TAKEN' &&
              currentMedication.status !== 'No tomado' && (
                <Text
                  className={`mt-1 text-sm font-medium ${
                    timeStatus.isLate
                      ? 'text-red-500'
                      : timeStatus.withinTolerance
                        ? 'text-green-600'
                        : 'text-amber-600'
                  }`}>
                  {statusMessage}
                </Text>
              )}
          </View>
        </View>
        {shouldShowCheckbox && (
          <Pressable
            className="ml-2"
            disabled={isTaken}
            onPress={() => {
              setChecked(!checked);
            }}>
            {checked ? (
              <SquareCheckIcon size={28} color="#32729F" />
            ) : (
              <SquareIcon size={28} color="#CBD5E1" />
            )}
          </Pressable>
        )}
      </View>
      {/* MARCAR COMO TOMADO */}
      {checked && !isTaken && shouldShowCheckbox && (
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="mt-3">
          <Animated.View
            style={{
              transform: [{ scale: buttonScaleAnim }],
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Pressable
              onPress={handleMarkAsTaken}
              className="w-full flex-row items-center justify-center rounded-xl border-2 border-primary bg-white py-3"
              disabled={isTaken || loading}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <CheckV2Icon size={26} color={isTaken ? '#22C55E' : '#32729F'} />
              </Animated.View>
              <Text className="ml-2 text-base font-medium text-gray-700">
                {loading ? 'Actualizando...' : isTaken ? '¡Tomado!' : 'Marcar como tomado'}
              </Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
};

export default MedicationCard;

const getColorMedicationStatus: Record<string, { backgroundColor: string; color: string }> = {
  INTENDED: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  'Por tomar': {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  'En curso': {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  COMPLETED: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  Completado: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  NOT_TAKEN: {
    backgroundColor: '#fef2f2',
    color: '#b91c1c',
  },
  'No tomado': {
    backgroundColor: '#fef2f2',
    color: '#b91c1c',
  },
};
