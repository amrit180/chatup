import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Button,
} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthProvider';

const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState();
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [user, users] = useContext(AuthContext);
  const data = route.params;
  const createMessage = async () => {
    const lastmessage = await firestore()
      // .collection('users')
      // .doc(user?.id)
      .collection('chats')
      .doc(data.id)
      .collection('message')
      .add({
        sender: user?.id,
        image: image,
        text: text,
        messageTime: firestore.FieldValue.serverTimestamp(),
        seencount: 1,
      });

    await firestore().collection('chats').doc(data.id).update({
      lastMessage: lastmessage.id,
    });
    setText('');
    setImage('');
  };
  useLayoutEffect(() => {
    const unsubscribe = firestore()
      // .collection('users')
      // .doc(user?.id)
      .collection('chats')
      .doc(data.id)
      .collection('message')
      .orderBy('messageTime', 'desc')
      .onSnapshot(snap =>
        setMessages(
          snap.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
    return () => unsubscribe();
  }, [route]);
  return (
    <View style={{width: '100%', height: '100%', justifyContent: 'flex-end'}}>
      <KeyboardAvoidingView behavior={'height'}>
        {/* <Text>{JSON.stringify(messages, null, 4)}</Text> */}
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <Text>{item.data.text}</Text>;
          }}
          inverted={true}
        />
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{
              backgroundColor: '#fff',
              width: '80%',
            }}
            value={text}
            onChangeText={text => setText(text)}
          />
          <Button
            onPress={createMessage}
            title="Submit"
            style={{width: '20%'}}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
