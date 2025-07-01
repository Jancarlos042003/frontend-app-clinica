import { Dayjs } from 'dayjs';
import { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface DateItemProps {
  item: {
    date: Dayjs;
    formatted: {
      dayName: string;
      dayNumber: string;
      month: string;
    };
    isToday: boolean;
    isWeekend: boolean;
  };
  isSelected: boolean;
  onPress: (date: Dayjs) => void;
  styles: any;
}

const DateItemComponent: React.FC<DateItemProps> = ({ item, isSelected, onPress, styles }) => {
  const { date, formatted, isToday, isWeekend } = item;
  const { dayName, dayNumber, month } = formatted;

  const containerStyle = `${styles.itemContainer} ${
    isSelected
      ? styles.selectedItem
      : isToday
        ? styles.todayItem
        : isWeekend
          ? styles.weekendItem
          : styles.transparentItem
  }`;

  const dayNameStyle = `${styles.dayNameText} ${
    isSelected
      ? styles.selectedText
      : isToday
        ? styles.todayText
        : isWeekend
          ? styles.weekendText
          : styles.normalText
  }`;

  const dayNumberStyle = `${styles.dayNumberText} ${
    isSelected
      ? styles.selectedText
      : isToday
        ? styles.todayText
        : isWeekend
          ? styles.weekendText
          : styles.normalDayText
  }`;

  const monthStyle = `${styles.monthText} ${
    isSelected
      ? styles.selectedText
      : isToday
        ? styles.todayText
        : isWeekend
          ? styles.weekendText
          : styles.normalMonthText
  }`;

  return (
    <TouchableOpacity className={containerStyle} onPress={() => onPress(date)} activeOpacity={0.7}>
      <Text className={dayNameStyle}>{dayName}</Text>
      <Text className={dayNumberStyle}>{dayNumber}</Text>
      <Text className={monthStyle}>{month}</Text>
    </TouchableOpacity>
  );
};

export default memo(DateItemComponent);
