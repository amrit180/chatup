import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment/moment';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthProvider';

const ChatListItem = ({data, moveToChat}) => {
  const [user, setUser] = useContext(AuthContext);
  const [receiver, setReceiver] = useState({});
  const [recentMessage, setRecentMessage] = useState({});
  const getUserById = async id => {
    return await firestore().collection('users').doc(id).get();
  };
  const lastMessage = async () => {
    const chat = await firestore().collection('chats').doc(data.id).get();
    console.log(chat.data().lastMessage);
    await firestore()
      .collection('chats')
      .doc(data.id)
      .collection('message')
      .doc(chat.data().lastMessage)
      .get()
      .then(res => setRecentMessage(res.data()));
  };
  useEffect(() => {
    if (user) {
      lastMessage();
      getUserById(data.chatname.filter(v => v !== user?.id)[0]).then(res => {
        setReceiver({
          ...res.data(),
          id: res.id,
        });
      });
    }
  }, [user]);
  return (
    <TouchableOpacity
      onPress={moveToChat}
      style={{
        height: 70,
        width: '98%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        marginVertical: 3,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: receiver.image}}
          style={{height: 50, width: 50, borderRadius: 100, marginRight: 5}}
          resizeMode="cover"
        />
        <View>
          <Text
            style={{color: 'rgba(0,0,0,.6)', fontSize: 14, fontWeight: '600'}}>
            {receiver.name}
          </Text>
          <Text style={{color: 'rgba(0,0,0,.6)', fontSize: 12}}>
            {recentMessage.text?.substring(0, 30)}...
            {/* {JSON.stringify(recentMessage)} */}
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={{fontSize: 12, marginBottom: 3}}>
          {moment(recentMessage.messageTime).fromNow()}
        </Text>
        <View
          style={{
            backgroundColor: data.seencount > 0 ? '#0093db' : '#fff',
            height: 15,
            width: 15,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {data.seencount > 0 && (
            <Text style={{color: '#fff', fontSize: 12}}>{data.seencount}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;
