import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';

import {ListItem} from 'react-native-elements';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

import getRealm from '../services/realm';

import {Input} from '../components';

Ionicons.loadFont();

function screens() {
  const [description, setDescription] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    getRealm().then((realm) => {
      const ListItem = realm.objects(`TodoItem`).sorted('id', true);
      setList(ListItem);
    });
  }, []);

  async function todoAdd(description) {
    const realm = await getRealm();
    const data = {
      id: list.length + 1,
      description,
      date: moment().calendar(),
    };

    realm.write(() => {
      realm.create(`TodoItem`, data);
    });

    setDescription('');

    todoList();
  }

  async function todoList() {
    const realm = await getRealm();

    const list = realm.objects(`TodoItem`).sorted('id', true);

    setList(list);
  }

  async function todoDelete(id) {
    const realm = await getRealm();

    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey('TodoItem', id));
    });

    todoList();
  }

  return (
    <View style={styles.container}>
      <Input
        value={description}
        onChangeText={(text) => setDescription(text)}
        onPress={() => {
          todoAdd(description);
        }}
      />
      <ScrollView
        style={{
          flex: 5,
        }}>
        {list.map((item) => (
          <ListItem
            key={item.id}
            containerStyle={{
              borderWidth: 1,
            }}>
            <ListItem.Content>
              <ListItem.Title style={{fontWeight: 'bold'}}>
                {item.description}
              </ListItem.Title>
              <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
            </ListItem.Content>

            <Ionicons
              name={'checkmark-done-circle'}
              size={35}
              color={'red'}
              onPress={() => {
                todoDelete(item.id);
              }}
            />
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default screens;
