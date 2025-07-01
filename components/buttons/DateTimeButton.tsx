import { ReactNode, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

type DateButtonProps = {
  title: string;
  icon: ReactNode;
  setShowPicker: (show: boolean) => void;
  formattedDate: string;
};

const DateTimeButton = ({ title, icon, formattedDate, setShowPicker }: DateButtonProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    });
  };

  const animatedBorderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#A3A3A3', '#32729F'], // Gray to blue
  });

  return (
    <>
      <View className="flex-row">
        <Text className="mb-2 text-xl font-bold text-primary">{title}</Text>
        <Text className="text-xl text-red-500">*</Text>
      </View>
      <Pressable
        onPress={() => setShowPicker(true)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Animated.View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: animatedBorderColor,
            borderWidth: 2,
            borderRadius: 8,
            paddingRight: 8,
            paddingLeft: 8,
            paddingTop: 12,
            paddingBottom: 12,
          }}>
          {icon}
          <Text className="ml-2 text-base">{formattedDate}</Text>
        </Animated.View>
      </Pressable>
    </>
  );
};

export default DateTimeButton;
