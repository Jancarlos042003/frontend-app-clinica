import { StatusBar } from 'expo-status-bar';

import './global.css';
import Index from './app/index';

export default function App() {
  return (
    <>
      <Index />
      <StatusBar style="auto" />
    </>
  );
}
