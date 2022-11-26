import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import MainStackNavigator from './src/routes/MainStackNavigator';
import auth from '@react-native-firebase/auth';
import {AuthProvider, AuthContext} from './src/context/AuthProvider';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  return (
    <AuthProvider>
      <MainScreen />
    </AuthProvider>
  );
};

export default App;
