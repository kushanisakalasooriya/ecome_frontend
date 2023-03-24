import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function FuelSaverDashBoard() {
  const navigation = useNavigation();

  return (
    <View style={styles.MainContainer}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'black',
        }}>
        Fuel Saver
      </Text>
      <Image
        source={require('../../assets/fuel_saver/fuelSaverIcon.png')}
        style={styles.img}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FuelSavingTips')}>
        <Text style={styles.text}>Fuel Saving Tips</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FuelCostCalculator')}>
        <Text style={styles.text}>Fuel Cost Calculator</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FuelEfficiencyCalculator')}>
        <Text style={styles.text}>Fuel Efficiency Calculator</Text>
      </TouchableOpacity>
    </View>
  );
}
export default FuelSaverDashBoard;

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
    backgroundColor: '#26B787',
    borderRadius: 20,
    marginTop: 20,
    height: 100,
  },
  text: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    padding: 30,
    fontWeight: '500',
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 5,
    marginTop: 10,
  },
});
