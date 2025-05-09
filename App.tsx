import { StatusBar } from 'expo-status-bar';

import './global.css';
import Intro from './app/(onboarding)/intro';

export default function App() {
  return (
    <>
      <Intro />
      <StatusBar style="auto" />
    </>
  );
}
