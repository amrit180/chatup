import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ChatListItem from '../components/ChatListItem';
import {AuthContext} from '../context/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const ChatList = ({navigation}) => {
  const [user, setUser] = useContext(AuthContext);
  const [chatLists, setChatLists] = useState([]);
  const getChatList = async () => {
    let list = [];
    const lists = await firestore()
      .collection('chats')
      .where('chatname', 'array-contains', `${user?.id}`)
      // .orderBy('messageTime', 'desc')
      // .limit(10)
      .get();

    for (let i = 0; i < lists.size; i++) {
      const data = {
        ...lists.docs[i].data(),
        id: lists.docs[i].id,
      };
      list.push(data);
    }
    setChatLists(list);
  };
  useEffect(() => {
    if (user) {
      getChatList();
    }
  }, [user]);
  const moveToChat = async data => {
    navigation.navigate('ChatScreen', data);
  };
  return (
    <View>
      {chatLists?.map((v, i) => {
        return (
          <View key={i}>
            <ChatListItem data={v} moveToChat={() => moveToChat(v)} />
          </View>
        );
      })}
    </View>
  );
};

export default ChatList;
