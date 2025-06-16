import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenWrapperProps = {
  children: ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
};

export function ScreenWrapper({ children, edges = ['top', 'bottom'] }: ScreenWrapperProps) {
  return (
    <SafeAreaView style={styles.wrapper} edges={edges}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F3F7FA',
  },
});
