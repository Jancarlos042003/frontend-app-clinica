import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import DismissKeyboardView from './DismissKeyboardView';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';

interface KeyboardAwareFormLayoutProps {
  children: ReactNode;
}

const KeyboardAwareFormLayout = ({ children }: KeyboardAwareFormLayoutProps) => {
  return (
    <KeyboardAvoidingWrapper>
      <DismissKeyboardView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </DismissKeyboardView>
    </KeyboardAvoidingWrapper>
  );
};

export default KeyboardAwareFormLayout;
