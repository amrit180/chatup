import React from 'react';
import firestore from '@react-native-firebase/firestore';
const useFirebase = () => {
  const getChatByID = async chatId => {
    return await firestore().collection('Chats').doc(chatId);
  };
  const getDataId = async (collection, email) => {
    console.log(email);
    return await firestore()
      .collection(collection)
      .where('email', '==', email)
      .get();
  };
  const createOrAdd = async (collection, data) => {
    console.log(collection);
    await firestore()
      .collection(collection)
      .add(data)
      .then(res => {
        return res.id;
      });
  };
  const createChat = async (id, data) => {
    await firestore()
      .collection('chats')
      .add(data)
      .then(res => {
        return res.id;
      });
  };

  const updateCollection = async (collection, id, data) => {
    await firestore()
      .collection(collection)
      .doc(id)
      .update(data)
      .then(() => {
        console.log('User updated!');
      });
  };
  return {getChatByID, createOrAdd, updateCollection, getDataId, createChat};
};

export default useFirebase;
