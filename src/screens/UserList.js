import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthProvider';
import UserListItem from '../components/UserListItem';
import useFirebase from '../hooks/useFirebase';

const UserList = ({navigation}) => {
  const [userLists, setUserLists] = useState([]);
  const [user, setUser] = useContext(AuthContext);
  const {createChat} = useFirebase();
  const result = async () => {
    let lists = [];
    await firestore()
      .collection('users')
      .where('interest', '==', user?.interest)
      .get()
      .then(res => {
        console.log(res.size);
        for (let i = 0; i < res.size; i++) {
          let data = {
            ...res.docs[i].data(),
            id: res.docs[i].id,
          };
          lists.push(data);
        }
        setUserLists(lists);
      })
      .catch(err => console.log(err.message));
  };
  useEffect(() => {
    if (user) {
      result();
    }
  }, [user]);
  const createChatChannel = async (chatname, id) => {
    const chatId = await firestore()
      .collection('chats')
      .where('chatname', 'array-contains', user?.name)
      .get();
    const userId = await firestore()
      .collection('chats')
      .where('chatname', 'array-contains', chatname)
      .get();
    console.log(chatId.size, userId.size);
    if (chatId.size == 0 && userId.size == 0) {
      await createChat(id, {
        chatname: [id, user?.id],
        lastMessage: '',
        messageTime: firestore.FieldValue.serverTimestamp(),
        seencount: 0,
      });
    }

    navigation.navigate('ChatList');
  };
  return (
    <View>
      {userLists?.map((v, i) => (
        <View key={i}>
          <UserListItem data={v} createChat={createChatChannel} />
        </View>
      ))}
    </View>
  );
};

export default UserList;
