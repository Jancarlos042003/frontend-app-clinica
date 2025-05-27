import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

interface KeyboardAvoidingWrapperProps {
  children: ReactNode;
}

const KeyboardAvoidingWrapper = ({ children }: KeyboardAvoidingWrapperProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
