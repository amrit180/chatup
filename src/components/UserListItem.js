import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import moment from 'moment/moment';

const UserListItem = ({data, createChat}) => {
  return (
    <TouchableOpacity
      onPress={() => createChat(data.name, data.id)}
      activeOpacity={0.6}
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
          source={{uri: data.image}}
          style={{height: 50, width: 50, borderRadius: 100, marginRight: 5}}
          resizeMode="cover"
        />

        <Text
          style={{color: 'rgba(0,0,0,.6)', fontSize: 14, fontWeight: '600'}}>
          {data.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserListItem;
