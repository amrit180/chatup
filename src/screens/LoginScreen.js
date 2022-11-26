import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, {useContext, useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../context/AuthProvider';
import useFirebase from '../hooks/useFirebase';
import firestore from '@react-native-firebase/firestore';
GoogleSignin.configure({
  webClientId:
    '515593529468-q671f9d565fqj1jdcdok12t4s3gd5ros.apps.googleusercontent.com',
});
const LoginScreen = ({navigation}) => {
  const {createOrAdd, getDataId} = useFirebase();

  const [userCount, setuserCount] = useState(0);
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }
  const [user, setUser] = useContext(AuthContext);
  const result = async () => {
    // setuserId(await getDataId('users', user?.email).);
    await firestore()
      .collection('users')
      .where('email', '==', user?.email)
      .get()
      .then(res => setuserCount(res.size))
      .catch(err => console.log(err.message));
  };
  useEffect(() => {
    if (user) {
      // result();
    }
  }, [user]);
  return (
    <View>
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(async ({user}) => {
            if (userCount == 0) {
              await createOrAdd('users', {
                email: `${user.email}`,
                name: `${user.displayName}`,
                image: `${user.photoURL}`,
                lastUpdate: firestore.FieldValue.serverTimestamp(),
              })
                .then(res => {
                  setUser({
                    email: user.email,
                    name: user.displayName,
                    image: user.photoUrl,
                    id: res.id,
                  });
                  navigation.navigate('Interest');
                })
                .catch(err => console.log(err.message));
            }

            setUser({
              email: user.email,
              name: user.displayName,
              image: user.photoUrl,
            });
            navigation.navigate('Interest');
          })
        }
      />
    </View>
  );
};

export default LoginScreen;
