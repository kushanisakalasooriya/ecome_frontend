import {useIsFocused} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'react-native-axios';

function FuelTipView({route}) {
  const [tip, setTip] = useState([]);
  const [comment, setComment] = useState([]);
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  const {id} = route.params;
  const UId = '1234';
  const isFocused = useIsFocused();

  const getFuelTip = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5050/FuelTips/' + id);
      setTip(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    let temp = [];
    try {
      const response = await axios.get(
        'http://10.0.2.2:5050/FuelComment/tipcomment/' + id,
      );
      for (let i = 0; i < response.data.length; i++) {
        temp.push(response.data[i]);
      }
      setComment(temp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getFuelTip();
      getComments();
    }
  }, [isFocused]);

  const onDeleteCmnt = async did => {
    await axios({
      method: 'DELETE',
      url: `http://10.0.2.2:5050/FuelComment/${did}`,
    });
    getComments();
  };

  const deleteCmnt = async did => {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to remove this comment?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => onDeleteCmnt(did)},
      ],
    );
  };

  return (
    <View style={styles.MainContainer}>
      <Text style={styles.textTitle}> {tip.tipTitle} </Text>
      <Image source={{uri: tip.image}} style={styles.img} />
      <Text style={styles.textDescription}> {tip.tipDescription} </Text>

      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          color: '#26B787',
          marginLeft: -235,
          marginTop: 10,
        }}>
        Comments
      </Text>

      <TextInput
        onChangeText={input => setInput(input)}
        onEndEditing={async () => {
          try {
            const data = {
              tipId: id,
              userId: UId,
              comments: input,
            };

            await axios.post(`http://10.0.2.2:5050/FuelComment/add`, data);
            alert('Comment is added successfully.');
            getComments();
          } catch (error) {
            alert(error);
          }
          return false;
        }}
        underlineColorAndroid="transparent"
        style={styles.SmallTextInputStyleClass3}
      />

      <ScrollView style={{height: 180}}>
        {comment.length === 0 ? (
          <Text style={{width: '100%', marginTop: 15}}>
            Currently don't have any comments.
          </Text>
        ) : (
          comment.map(cmt => (
            <View key={cmt._id} style={styles.cardButton}>
              <Text style={{width: '80%'}}>{cmt.comments}</Text>

              {cmt.userId === UId ? (
                <View style={styles.fixToText}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UpdateFuelComent', {
                        cid: cmt._id,
                        id: tip._id,
                        textEdit: cmt.comments,
                      })
                    }>
                    <Image
                      source={require('../../assets/fuel_saver/pensil.png')}
                      style={{marginTop: -17, marginLeft: 250}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => deleteCmnt(cmt._id)}>
                    <Image
                      source={require('../../assets/fuel_saver/cross.png')}
                      style={{marginTop: -17, marginLeft: 7}}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
export default FuelTipView;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#26B787',
  },
  textDescription: {
    width: '78%',
    fontSize: 14,
    textAlign: 'justify',
    marginTop: 10,
  },
  img: {
    width: 300,
    height: 175,
    marginBottom: 5,
    marginTop: 10,
  },
  icon: {
    color: 'red',
  },
  SmallTextInputStyleClass3: {
    textAlign: 'center',
    height: 40,
    width: '78%',
    borderBottomEndRadius: 5,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#E4E4E4',
    color: 'black',
  },
  cardButton: {
    padding: 15,
    paddingLeft: 0,
    width: 300,
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  icon: {
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  fixToText: {
    flexDirection: 'row',
  },
});
