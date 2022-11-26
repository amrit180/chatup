import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatList from '../screens/ChatList';
import Interest from '../screens/Interest';
import UserList from '../screens/UserList';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="ChatList">
      <Tab.Screen name="Interest" component={Interest} />
      <Tab.Screen name="ChatList" component={ChatList} />
      <Tab.Screen name="UserList" component={UserList} />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
