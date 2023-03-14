import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from './hooks/useAuth';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { Text } from 'native-base';
import ProfileScreen from './screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const AppTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AuthTab = () => {
  return (
    <Tab.Navigator tabBar={() => null} screenOptions={{ headerShown: false }}>
      <>
        <Tab.Screen name="Register" component={RegisterScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </>
    </Tab.Navigator>
  );
};

export default function Router() {
  const { authData, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      {authData?.auth_token ? <AppTab /> : <AuthTab />}
    </NavigationContainer>
  );
}
