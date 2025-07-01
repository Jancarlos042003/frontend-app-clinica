import { View } from 'react-native';

const HeaderBackgroundWithBorder = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
    />
  );
};

export default HeaderBackgroundWithBorder;
