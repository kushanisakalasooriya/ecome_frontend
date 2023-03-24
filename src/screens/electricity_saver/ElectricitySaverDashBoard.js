/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import axios from 'react-native-axios';
import {useNavigation} from '@react-navigation/native';

function ElectricitySaverDashBoard() {
  const [wallets, setWallets] = useState([]);
  const navigation = useNavigation();

  const getWalletItems = async () => {
    try {
      const response = await axios.get('http://192.168.1.6:5050/wallet');
      setWallets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWalletItems();
  }, []);

  return (
    <View style={styles.MainContainer}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'black',
        }}>
        Electricity Saver
      </Text>
      <Image
        source={require('../../assets/electricity_saver/home_logo.png')}
        style={styles.img}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ElectricityCostCalculator')}>
        <Text style={styles.text}>BILL CALCULATOR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddBillInformation')}>
        <Text style={styles.text}>ADD MONTHLY BILL</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ElectricitySaverBillHistory')}>
        <Text style={styles.text}>VIEW BILL HISTORY</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ElectricitySaverReport')}>
        <Text style={styles.text}>VIEW REPORT</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ElectricitySaverTips')}>
        <Text style={styles.text}>BROWSE TIPS</Text>
      </TouchableOpacity>
    </View>
  );
}
export default ElectricitySaverDashBoard;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: '80%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#FA8072',
    borderRadius: 20,
    marginTop: 15,
    height: 60,
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    padding: 15,
    fontWeight: '500',
  },
  img: {
    width: 75,
    height: 110,
    marginBottom: 10,
    marginTop: 20,
  },
});
