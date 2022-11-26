import {createStackNavigator} from '@react-navigation/stack';
import ChatList from '../screens/ChatList';
import ChatScreen from '../screens/ChatScreen';
import Interest from '../screens/Interest';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';

const MainStackNavigator = ({user}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={user ? 'BottomTabNavigator' : 'LoginScreen'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Interest" component={Interest} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};
export default MainStackNavigator;
