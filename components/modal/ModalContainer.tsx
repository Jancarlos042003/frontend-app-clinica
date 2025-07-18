import { Modal, View, Text, Platform } from 'react-native';

type ModalContainerProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  title?: string;
  children?: React.ReactNode;
};

const ModalContainer = ({ showModal, setShowModal, children, title }: ModalContainerProps) => {
  return (
    <Modal
      visible={showModal}
      presentationStyle="pageSheet"
      animationType={Platform.OS === 'ios' ? 'slide' : 'fade'}
      onRequestClose={() => setShowModal(false)}>
      {/* TITULO PARA LA MODAL */}
      <View className="border-b border-gray-300 bg-white p-4">
        {title && <Text className="text-center text-lg font-bold">{title}</Text>}
      </View>
      {children}
    </Modal>
  );
};

export default ModalContainer;
