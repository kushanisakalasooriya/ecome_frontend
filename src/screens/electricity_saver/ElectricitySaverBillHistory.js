/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import axios from 'react-native-axios';
import {useNavigation} from '@react-navigation/native';

function ElectricitySaverBillHistory() {
  const [update, setUpdate] = useState('');
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const getFuelTips = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5050/electricity/');
      setData(response.data);
      setUpdate('updated');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntry = id => {
    Alert.alert(
      'Confirm Deletion',
      'Do you really want to delete this entry?',
      [
        {
          text: 'Cancel',
          onPress: () => navigation.navigate('ElectricitySaverBillHistory'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            axios.delete(`http://10.0.2.2:5050/electricity/${id}`);
            getFuelTips();
          },
        },
      ],
    );
  };

  useEffect(() => {
    getFuelTips();
  }, [data]);

  return (
    <View style={styles.MainContainer}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: 'black',
        }}>
        Bill History
      </Text>

      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          marginLeft: 20,
          marginRight: 20,
          marginTop: 10,
          marginBottom: 10,
        }}>
        {data.map(entry => (
          <TouchableOpacity style={styles.cardButton}>
            <View key={entry._id} style={styles.container}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#FA8072',
                  textAlign: 'left',
                }}>
                {entry.month} - 2023
              </Text>
              <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'right',
                    color: '#F62108',
                    fontWeight: '700',
                    alignSelf: 'flex-end',
                  }}>
                  {entry.units} kWh
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UpdateBillInformation', {
                      id: entry._id,
                    })
                  }>
                  <Image
                    source={require('../../assets/electricity_saver/edit_button.png')}
                    style={styles.img}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteEntry(entry._id)}>
                  <Image
                    source={require('../../assets/electricity_saver/delete_button.png')}
                    style={styles.img}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <Text style={styles.endText}>End of the entries</Text>
      </ScrollView>
    </View>
  );
}
export default ElectricitySaverBillHistory;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  csText: {
    marginBottom: 50,
    marginTop: 10,
    textAlign: 'center',
    color: '#26B787',
  },
  endText: {
    color: '#FA8072',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 50,
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#26B787',
    borderRadius: 20,
    marginTop: 20,
    height: 100,
  },
  cardButton: {
    padding: 15,
    width: 350,
    alignItems: 'center',
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    padding: 30,
    fontWeight: '500',
  },
  img: {
    width: 16,
    height: 16,
    marginLeft: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
});
