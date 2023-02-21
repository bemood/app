import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/HomeScreen";
import {SafeAreaProvider} from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={() => null}
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>

        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
