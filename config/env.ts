import Constants from 'expo-constants';

// Obtiene las variables de entorno adicionales (definidas como extra en app.config.js) del objeto Constants.expoConfig.
const raw = Constants.expoConfig?.extra as { API_URL: string }; // Hace un typecasting de esas variables a un tipo con la propiedad API_URL de tipo string.

// Exporta la variable API_URL para que pueda ser utilizada en toda la aplicación.
export const API_URL = raw.API_URL;
