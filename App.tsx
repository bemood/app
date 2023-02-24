import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/HomeScreen";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {extendTheme, NativeBaseProvider} from "native-base";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import RegisterScreen from "./screens/auth/RegisterScreen";
import axios from "axios";
import LoginScreen from "./screens/auth/LoginScreen";

axios.defaults.baseURL = 'http://192.168.1.17:3000/api'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
});
export default function App() {
  const isAuthenticated = false

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          {isAuthenticated ? (
            <Tab.Navigator
              tabBar={() => null}
              screenOptions={{ headerShown: false }}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator
              tabBar={() => null}
              screenOptions={{ headerShown: false }}
            >
              <Tab.Screen name="Register" component={RegisterScreen} />
              <Tab.Screen name="Login" component={LoginScreen} />
            </Tab.Navigator>
          )}

          <StatusBar style="auto" />
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
