import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function FuelEfficiencyCalculator() {
  const navigation = useNavigation();

  const [preDistance, setPreDistance] = useState('');
  const [newDistance, setNewDistance] = useState('');
  const [amount, setAmount] = useState('');

  const Calculate = async () => {
    if (preDistance == '') {
      alert('Please Enter Previous ODO Meater');
      return false;
    } else if (newDistance == '') {
      alert('Please Enter Current ODO Meater');
      return false;
    } else if (amount == '') {
      alert('Please Enter Fuel Amount You added to the tank');
      return false;
    } else {
      const Result = (newDistance - preDistance) / amount;
      Alert.alert('Fuel Efficiency', Result.toString() + ' KMPL', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('FuelEfficiencyCalculator'),
        },
      ]);
    }
  };

  return (
    <View style={styles.MainContainer}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: 'black',
        }}>
        Fuel Efficiency Calculator
      </Text>

      <View style={styles.container}>
        <Text style={styles.lableClass}>Previous ODO Meter (KM) :</Text>

        <TextInput
          onChangeText={preDistance => setPreDistance(preDistance)}
          underlineColorAndroid="transparent"
          style={styles.SmallTextInputStyleClass}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.lableClass2}>Current ODO Meter (KM) :</Text>

        <TextInput
          onChangeText={newDistance => setNewDistance(newDistance)}
          underlineColorAndroid="transparent"
          style={styles.SmallTextInputStyleClass2}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.lableClass3}>Added Fuel Amount (L) :</Text>

        <TextInput
          onChangeText={amount => setAmount(amount)}
          underlineColorAndroid="transparent"
          style={styles.SmallTextInputStyleClass3}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.fixToText}>
        <TouchableOpacity style={styles.CalBtn} onPress={() => Calculate()}>
          <Text style={styles.CalBtnText}>Calculate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default FuelEfficiencyCalculator;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  CalBtn: {
    width: '35%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#26B787',
    borderRadius: 10,
    marginTop: 100,
    marginLeft: 10,
    height: 45,
  },
  CalBtnText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    fontWeight: '500',
  },
  fixToText: {
    marginTop: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    padding: 30,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
  },
  lableClass: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    marginTop: 78,
    margin: 5,
    color: '#26B787',
    fontWeight: '600',
  },
  SmallTextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    width: '25%',
    borderBottomEndRadius: 5,
    marginTop: 70,
    marginLeft: 35,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#E4E4E4',
    color: 'black',
  },
  lableClass2: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    marginTop: 148,
    borderRadius: 20,
    margin: 5,
    color: '#26B787',
    fontWeight: '600',
  },
  SmallTextInputStyleClass2: {
    textAlign: 'center',
    height: 40,
    width: '25%',
    borderBottomEndRadius: 5,
    marginTop: 140,
    borderRadius: 10,
    margin: 5,
    marginLeft: 45,
    backgroundColor: '#E4E4E4',
    color: 'black',
  },
  lableClass3: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    marginTop: 218,
    borderRadius: 20,
    margin: 5,
    color: '#26B787',
    fontWeight: '600',
  },
  SmallTextInputStyleClass3: {
    textAlign: 'center',
    height: 40,
    width: '25%',
    borderBottomEndRadius: 5,
    marginTop: 210,
    borderRadius: 10,
    margin: 5,
    marginLeft: 50,
    backgroundColor: '#E4E4E4',
    color: 'black',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
