/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SelectList from 'react-native-dropdown-select-list';
import {Dropdown} from 'react-native-element-dropdown';

function ElectricityCostCalculator() {
  // const [wallets, setWallets] = useState([]);
  const navigation = useNavigation();

  const [distance, setDistance] = useState('');
  const [provider, setProvider] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [units, setUnits] = useState(0);
  const [consumption, setConsumption] = useState('');
  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');
  const [selected, setSelected] = React.useState('');
  const serviceData = [
    {label: 'LECO', value: 'LECO'},
    {label: 'CEB', value: 'CEB'},
  ];
  const customerData = [
    {label: 'Domestic', value: 'domestic'},
    {label: 'Industrial', value: 'industrial'},
  ];
  const [estimatedBill, setEstimatedBill] = useState(0);

  const totalCost = async () => {
    if (provider === '') {
      alert('Please Select a Provider');
      return false;
    } else if (customerType === '') {
      alert('Please Select a Customer Type');
      return false;
    } else if (units === 0) {
      alert('Number of Units cannot be empty');
      return false;
    } else {
      if (customerType === 'domestic') {
        setEstimatedBill(calculateDomesticBill());
      } else if (customerType === 'industrial') {
        setEstimatedBill(calculateIndustrialBill());
      }
    }
  };

  const calculateDomesticBill = () => {
    if (units <= 30 && units > 0) {
      return units * 8 + 120;
    } else if (units > 30 && units <= 60) {
      return units * 10 + 240;
    } else if (units > 60 && units <= 90) {
      return 60 * 16 + (units - 60) * 16 + 360;
    } else if (units > 60 && units <= 180) {
      return 60 * 16 + 30 * 16 + (units - 90) * 50 + 960;
    } else if (units > 60 && units > 180) {
      return 60 * 16 + 30 * 16 + 90 * 50 + (units - 180) * 75 + 1500;
    }
  };

  const calculateIndustrialBill = () => {
    if (units <= 300 && units > 0) {
      return units * 20 + 960;
    } else {
      return units * 20 + 1500;
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
        Calculate Your Bill
      </Text>

      <Image
        source={require('../../assets/electricity_saver/calculator.png')}
        style={styles.img}
      />

      <View style={styles.container}>
        <Text style={styles.labelClass}>Select Provider</Text>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={serviceData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          searchPlaceholder="Search..."
          placeholder="Select Provider"
          value={provider}
          onChange={item => {
            setProvider(item.value);
          }}
        />

        <Text style={styles.labelClassTwo}>Select Customer Type</Text>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={customerData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          searchPlaceholder="Search..."
          placeholder="Select Type"
          value={customerType}
          onChange={item => {
            setCustomerType(item.value);
          }}
        />

        <Text style={styles.labelClassTwo}>Number of Units (kWh)</Text>

        <TextInput
          onChangeText={value => setUnits(value)}
          defaultValue={distance}
          underlineColorAndroid="transparent"
          style={styles.SmallTextInputStyleClass}
          keyboardType="numeric"
        />
        <Text style={styles.labelClassTwo}>Estimated Bill</Text>
        <Text style={styles.labelClassThree}>LKR {estimatedBill}.00</Text>
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
        <TouchableOpacity style={styles.CalBtn} onPress={() => totalCost()}>
          <Text style={styles.CalBtnText}>Calculate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ElectricityCostCalculator;

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
    marginTop: 50,
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
  StstText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    padding: 30,
    // width: 380
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
  },
  labelClass: {
    textAlign: 'center',
    height: 40,
    fontSize: 18,
    marginTop: -10,
    color: '#FA8072',
    fontWeight: '600',
    marginBottom: -10,
  },
  labelClassTwo: {
    textAlign: 'center',
    height: 40,
    fontSize: 18,
    marginTop: 10,
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
  SmallTextInputStyleClass2: {
    textAlign: 'center',
    height: 40,
    width: '25%',
    borderBottomEndRadius: 5,
    marginTop: 100,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#E4E4E4',
    color: 'black',
  },
  lableClass3: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    marginTop: 178,
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
    marginTop: 170,
    borderRadius: 10,
    margin: 5,
    marginLeft: 60,
    backgroundColor: '#E4E4E4',
    color: 'black',
  },
  lableClass4: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    marginTop: 98,
    borderRadius: 20,
    margin: 5,
    color: '#26B787',
    fontWeight: '600',
  },
  SmallTextInputStyleClass4: {
    textAlign: 'center',
    height: 40,
    width: '25%',
    borderBottomEndRadius: 5,
    marginTop: 90,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#E4E4E4',
    color: 'black',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  img: {
    width: 130,
    height: 130,
    marginBottom: 10,
    marginTop: 10,
  },
});
