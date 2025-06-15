import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type DateButtonProps = {
  title: string;
  icon: ReactNode;
  setShowPicker: (show: boolean) => void;
  formattedDate: string;
};

const DateTimeButton = ({ title, icon, formattedDate, setShowPicker }: DateButtonProps) => {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={() => setShowPicker(true)} style={styles.button}>
        {icon}
        <Text style={styles.dateText}>{formattedDate}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#32729F',
  },
  button: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db', // gray-300
    paddingHorizontal: 8,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default DateTimeButton;
