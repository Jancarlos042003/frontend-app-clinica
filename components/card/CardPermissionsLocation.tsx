import { View, Text } from 'react-native';

import { requestPermission } from '../../services/permissionsService';
import WarningButton from '../buttons/WarningButton';
import { WarningIcon } from '../icons/icons';

const CardPermissionsLocation = () => {
  return (
    <View className="rounded-lg border border-red-500 bg-red-100 px-4 py-5 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-xl font-extrabold">Permisos de ubicación</Text>
        </View>
        <View>
          <WarningIcon size={30} color="#F59E0B" />
        </View>
      </View>
      <Text className="mt-2 text-sm text-gray-700">
        Para poder usar funciones como el botón S.O.S, necesitas permitir el acceso a tu ubicación.
      </Text>
      <View className="mt-3">
        <WarningButton onPress={requestPermission} title="Permitir acceso" />
      </View>
    </View>
  );
};

export default CardPermissionsLocation;
