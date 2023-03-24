/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sparse-arrays */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import axios from 'react-native-axios';
// import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

function UpdateBillInformation({route}) {
  const navigation = useNavigation();
  // const [wallets, setWallets] = useState([]);
  // const navigation = useNavigation();

  const [month, setMonth] = useState('');
  const [units, setUnits] = useState('');
  const [entry, setEntry] = useState([]);
  const {id} = route.params;

  useEffect(() => {
    getEntry();
  }, []);

  const data = [
    {label: 'January', value: 'January'},
    {label: 'February', value: 'February'},
    {label: 'March', value: 'March'},
    {label: 'April', value: 'April'},
    {label: 'May', value: 'May'},
    {label: 'June', value: 'June'},
    {label: 'July', value: 'July'},
    {label: 'August', value: 'August'},
    {label: 'September', value: 'September'},
    {label: 'October', value: 'October'},
    {label: 'November', value: 'November'},
    {label: 'December', value: 'December'},
  ];

  const updateBillInfo = () => {
    Alert.alert('Confirm Update', 'Do you really want to update this entry?', [
      {
        text: 'Cancel',
        onPress: () =>
          navigation.navigate('UpdateBillInformation', {
            id: id,
          }),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const monthlyBill = {
            month: month,
            units: units,
          };
          axios({
            url: `http://10.0.2.2:5050/electricity/update/${id}`,
            method: 'POST',
            data: monthlyBill,
          }).then(() => {
            navigation.navigate('ElectricitySaverBillHistory');
          });
          navigation.navigate('ElectricitySaverBillHistory');
        },
      },
    ]);
  };

  const getEntry = () => {
    try {
      axios.get(`http://10.0.2.2:5050/electricity/${id}`).then(res => {
        setEntry(res.data);
        setMonth(res.data.month);
        setUnits(res.data.units);
      });
    } catch (error) {
      console.log(error);
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
        Update Bill Information
      </Text>

      <Image
        source={require('../../assets/electricity_saver/add_bill.png')}
        style={styles.img}
      />

      <View style={styles.container}>
        <Text style={styles.labelClass}>Select Month</Text>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          searchPlaceholder="Search..."
          placeholder="Select Month"
          value={month}
          onChange={item => {
            setMonth(item.value);
          }}
        />

        <Text style={styles.labelClassTwo}>Number of Units (kWh)</Text>

        <TextInput
          onChangeText={unit => setUnits(unit)}
          defaultValue={10}
          underlineColorAndroid="transparent"
          value={units}
          style={styles.SmallTextInputStyleClass}
          keyboardType="numeric"
        />
      </View>

      <View
        style={{
          width: 350,
          alignItems: 'center',
          borderBottomColor: '#26B787',
          marginTop: 250,
        }}
      />

      <View style={styles.fixToText}>
        <TouchableOpacity
          style={styles.CalBtn}
          onPress={() => updateBillInfo()}>
          <Text style={styles.CalBtnText}>UPDATE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default UpdateBillInformation;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  CalBtn: {
    width: '35%',
    paddingTop: 7,
    paddingBottom: 2,
    backgroundColor: '#FA8072',
    borderRadius: 10,
    marginTop: -60,
    marginLeft: 10,
    height: 55,
  },
  CalBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    fontWeight: '500',
  },
  dropdown: {
    height: 40,
    // borderColor: 'gray',
    backgroundColor: '#E4E4E4',
    color: 'black',
    marginTop: 0,
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  fixToText: {
    marginTop: 20,
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
  labelClass: {
    textAlign: 'center',
    height: 40,
    fontSize: 18,
    marginTop: 20,
    color: '#FA8072',
    fontWeight: '600',
    marginBottom: -10,
  },
  labelClassTwo: {
    textAlign: 'center',
    height: 40,
    fontSize: 18,
    marginTop: 20,
    color: '#FA8072',
    fontWeight: '600',
    marginBottom: -10,
  },
  labelClassThree: {
    textAlign: 'center',
    height: 40,
    fontSize: 35,
    marginTop: 5,
    color: '#000000',
    fontWeight: '600',
    marginBottom: -14,
  },
  SmallTextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    width: 250,
    borderBottomEndRadius: 5,
    borderRadius: 10,
    backgroundColor: '#E4E4E4',
    color: 'black',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  img: {
    width: 120,
    height: 120,
    marginBottom: 10,
    marginTop: 20,
  },
});
