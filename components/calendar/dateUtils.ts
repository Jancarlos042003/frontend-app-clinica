import dayjs, { Dayjs } from 'dayjs';

export const generateInitialDates = (range: number = 30): Dayjs[] => {
  const dates: Dayjs[] = [];
  const today = dayjs();
  for (let i = -range; i <= range; i++) {
    dates.push(today.add(i, 'day'));
  }
  return dates;
};

export const addDatesAtBeginning = (currentDates: Dayjs[], daysToAdd: number): Dayjs[] => {
  if (currentDates.length === 0) return [];
  const newDates: Dayjs[] = [];
  const firstDate = currentDates[0];
  for (let i = daysToAdd; i >= 1; i--) {
    newDates.push(firstDate.subtract(i, 'day'));
  }
  return [...newDates, ...currentDates];
};

export const addDatesAtEnd = (currentDates: Dayjs[], daysToAdd: number): Dayjs[] => {
  if (currentDates.length === 0) return [];
  const newDates: Dayjs[] = [];
  const lastDate = currentDates[currentDates.length - 1];
  for (let i = 1; i <= daysToAdd; i++) {
    newDates.push(lastDate.add(i, 'day'));
  }
  return [...currentDates, ...newDates];
};
