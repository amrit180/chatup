import {View, Text, Button} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import useFirebase from '../hooks/useFirebase';
import {AuthContext} from '../context/AuthProvider';

const Interest = ({navigation}) => {
  const {updateCollection, getDataId} = useFirebase();
  const [user, setUser] = useContext(AuthContext);
  const [userId, setUserId] = useState();
  useEffect(() => {
    getDataId('users', user.email).then(res => {
      res.forEach(r => {
        setUserId(r.id);
        console.log(r.id);
      });

      //   setUserId(res.forEach(r =>{ r.id}));
      //   console.log(res.forEach(r => r.id));
    });
  }, []);
  return (
    <View>
      <Button
        style={{marginTop: 10}}
        onPress={() => {
          updateCollection('users', userId, {
            interest: 'Hustling',
          });
          setUser({...user, interest: 'Hustling'});
          navigation.replace('BottomTabNavigator');
        }}
        title="Hustling"
      />
      <Button
        style={{marginTop: 10}}
        onPress={() => {
          updateCollection('users', userId, {
            interest: 'Gaming',
          });
          setUser({...user, interest: 'Gaming'});
          navigation.replace('BottomTabNavigator');
        }}
        title="Gaming"
      />
      <Button
        style={{marginTop: 10}}
        onPress={() => {
          updateCollection('users', userId, {
            interest: 'Travelling',
          });
          setUser({...user, interest: 'Travelling'});
          navigation.replace('BottomTabNavigator');
        }}
        title="Travelling"
      />
      <Button
        style={{marginTop: 10}}
        onPress={() => {
          updateCollection('users', userId, {
            interest: 'Reading',
          });
          setUser({...user, interest: 'Reading'});
          navigation.replace('BottomTabNavigator');
        }}
        title="Reading"
      />
      <Button
        style={{marginTop: 10}}
        onPress={() => {
          updateCollection('users', userId, {
            interest: 'Partying',
          });
          setUser({...user, interest: 'Partying'});
          navigation.replace('BottomTabNavigator');
        }}
        title="Partying"
      />
    </View>
  );
};

export default Interest;
