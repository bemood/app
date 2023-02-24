import {SafeAreaProvider} from "react-native-safe-area-context";
import {extendTheme, NativeBaseProvider} from "native-base";
import axios from "axios";
import { AuthProvider } from './contexts/auth';
import Router from './router';

axios.defaults.baseURL = 'http://192.168.1.17:3000/api'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
});
export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
