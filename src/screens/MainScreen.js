import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';
import {AuthContext} from '../context/AuthProvider';
import MainStackNavigator from '../routes/MainStackNavigator';
import firestore from '@react-native-firebase/firestore';
export default function MainScreen() {
  const [initializing, setInitializing] = useState(true);
  const [userAuth, setUserAuth] = useState({});
  const [user, setUser] = useContext(AuthContext);
  async function onAuthStateChanged(user) {
    if (user) {
      const userOne = await firestore()
        .collection('users')
        .where('email', '==', user?.email)
        .get();
      userOne.forEach(r => {
        setUser({
          email: r.data().email,
          image: r.data().image,
          interest: r.data().interest,
          name: r.data().name,
          id: r.id,
        });
      });
    }
    setUserAuth(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initializing) return null;
  else {
    return (
      <NavigationContainer>
        <MainStackNavigator user={userAuth} />
      </NavigationContainer>
    );
  }
}
