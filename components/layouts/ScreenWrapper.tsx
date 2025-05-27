import { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenWrapperProps = {
  children: ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  className?: string;
};

export function ScreenWrapper({
  children,
  edges = ['top', 'bottom'],
  className,
}: ScreenWrapperProps) {
  return (
    <SafeAreaView className={`flex-1 bg-primary_100 ${className}`} edges={edges}>
      {children}
    </SafeAreaView>
  );
}
