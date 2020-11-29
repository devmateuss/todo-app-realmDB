import React from 'react';
import {View, TextInput, StyleSheet, Platform} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont();

export function Input({value, onPress, onChangeText}) {
  return (
    <View style={styles.containerInput}>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text)}
        style={styles.textInput}
      />

      <Ionicons
        name={'md-add-circle-sharp'}
        size={35}
        color={'#00ff00'}
        onPress={() => onPress(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    marginTop: Platform.OS == 'ios' ? 50 : 0,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#919191',
    elevation: 5,
    shadowOffset: {width: -1, height: 1},
    shadowOpacity: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    height: 30,
    backgroundColor: '#fff',
    margin: 5,
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: '500',
  },
});
