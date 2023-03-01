/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from 'react-native';
import axios from 'react-native-axios';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';

function ElectricitySaverReport() {
  const [monthlyData, setDataForMonth] = useState([]);
  const navigation = useNavigation();
  const [month, setMonth] = useState('');
  const [units, setUnits] = useState('N/A');
  const [category, setCategory] = useState('N/A');
  const [currentCost, setCurrentCost] = useState('N/A');
  const [target, setTarget] = useState('N/A');
  const [save, setSave] = useState('N/A');

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

  const getMonthlyData = async month => {
    try {
      axios({
        url: `http://10.0.2.2:5050/electricity/getByMonth/${month}`,
        method: 'GET',
      }).then(res => {
        setCategory('N/A');
        setCurrentCost('N/A');
        if (res.data[0] === undefined) {
          setUnits('N/A');
          setCategory('N/A');
          setCurrentCost('N/A');
          setSave('N/A');
          setTarget('N/A');
        } else {
          const cost = calculateDomesticBill(res.data[0].units);
          setDataForMonth(res.data[0]);
          setUnits(res.data[0].units);
          setCurrentCost('LKR ' + cost.toString() + '.00');
          if (res.data[0].units > 0 && res.data[0].units <= 30) {
            setCategory('0 - 30');
            setTarget('Keep it up!');
            setSave('N/A');
          } else if (res.data[0].units > 30 && res.data[0].units <= 60) {
            setCategory('30 - 60');
            setTarget('-' + (res.data[0].units - 30).toString() + ' kWh');
            setSave(
              'LKR ' + ((res.data[0].units - 30) * 10).toString() + '.00',
            );
          } else if (res.data[0].units > 60 && res.data[0].units <= 90) {
            setCategory('60 - 90');
            setTarget('-' + (res.data[0].units - 60).toString() + ' kWh');
            setSave(
              'LKR ' + ((res.data[0].units - 30) * 16).toString() + '.00',
            );
          } else if (res.data[0].units > 90 && res.data[0].units <= 180) {
            setCategory('90 - 180');
            setTarget('-' + (res.data[0].units - 90).toString() + ' kWh');
            setSave(
              'LKR ' + ((res.data[0].units - 90) * 50).toString() + '.00',
            );
          } else if (res.data[0].units > 180) {
            setCategory('above 180');
            setTarget('-' + '60' + ' kWh');
            setSave('LKR ' + (60 * 75).toString() + '.00');
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [monthlyData, units, category, currentCost]);

  const calculateDomesticBill = unit => {
    let value = 0;
    if (unit <= 30 && unit > 0) {
      value = unit * 8 + 120;
    } else if (unit > 30 && unit <= 60) {
      value = unit * 10 + 240;
    } else if (unit > 60 && unit <= 90) {
      value = 60 * 16 + (unit - 60) * 16 + 360;
    } else if (unit > 60 && unit <= 180) {
      value = 60 * 16 + 30 * 16 + (unit - 90) * 50 + 960;
    } else if (unit > 60 && unit > 180) {
      value = 60 * 16 + 30 * 16 + 90 * 50 + (unit - 180) * 75 + 1500;
    }
    return value;
  };

  return (
    <View style={styles.MainContainer}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'black',
          marginBottom: 10,
        }}>
        Electricity Report
      </Text>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          marginLeft: 55,
          marginRight: 55,
          width: 'auto',
        }}>
        <Image
          source={require('../../assets/electricity_saver/chart.png')}
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
              getMonthlyData(item.value);
            }}
          />
          <Text style={styles.labelClassTwo}>Units Consumed (kWh)</Text>

          <TextInput
            // onChangeText={unit => setUnits(unit)}
            defaultValue={10}
            underlineColorAndroid="transparent"
            style={styles.SmallTextInputStyleClass}
            keyboardType="numeric"
            value={units}
            editable={false}
            selectTextOnFocus={false}
          />

          <Text style={styles.labelClassTwo}>Category Belongs</Text>

          <TextInput
            // onChangeText={unit => setUnits(unit)}
            defaultValue={10}
            underlineColorAndroid="transparent"
            style={styles.SmallTextInputStyleClass}
            keyboardType="numeric"
            value={category}
            editable={false}
            selectTextOnFocus={false}
          />

          <Text style={styles.labelClassTwo}>Current Cost</Text>

          <TextInput
            // onChangeText={unit => setUnits(unit)}
            defaultValue={10}
            underlineColorAndroid="transparent"
            style={styles.SmallTextInputStyleClass}
            keyboardType="numeric"
            value={currentCost}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View style={styles.containerTwo}>
          <View style={styles.container}>
            <Text style={styles.labelClassTwo}>Target</Text>
            <TextInput
              // onChangeText={unit => setUnits(unit)}
              defaultValue={10}
              underlineColorAndroid="transparent"
              style={styles.SmallTextInputStyleClassThree}
              keyboardType="numeric"
              value={target}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.labelClassTwo}>You Can Save</Text>
            <TextInput
              // onChangeText={unit => setUnits(unit)}
              defaultValue={10}
              underlineColorAndroid="transparent"
              style={styles.SmallTextInputStyleClassThree}
              keyboardType="numeric"
              value={save}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </View>
        <Text style={styles.labelClassThree}>Keep it Up!</Text>
      </ScrollView>
    </View>
  );
}
export default ElectricitySaverReport;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
  button: {
    width: '80%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#FA8072',
    borderRadius: 20,
    marginTop: 20,
    height: 60,
    justifyContent: 'center',
  },
  SmallTextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    width: 250,
    fontSize: 18,
    borderBottomEndRadius: 5,
    borderRadius: 10,
    backgroundColor: '#E4E4E4',
    color: 'black',
    alignSelf: 'center',
  },
  SmallTextInputStyleClassTwo: {
    textAlign: 'center',
    height: 50,
    width: 'auto',
    fontSize: 18,
    borderBottomEndRadius: 5,
    borderRadius: 10,
    color: 'black',
    fontWeight: '700',
    alignSelf: 'center',
  },
  SmallTextInputStyleClassThree: {
    textAlign: 'center',
    height: 50,
    width: 'auto',
    fontSize: 18,
    borderBottomEndRadius: 5,
    borderRadius: 10,
    color: 'rgb(46, 139, 87)',
    fontWeight: '700',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  containerTwo: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  text: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 10,
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
    fontSize: 18,
    marginTop: 20,
    color: '#FA8072',
    fontWeight: '600',
    marginBottom: 50,
    width: 'auto',
  },
  dropdown: {
    height: 40,
    backgroundColor: '#E4E4E4',
    color: 'black',
    marginTop: 0,
    borderRadius: 8,
    paddingHorizontal: 8,
    textAlign: 'center',
    width: 250,
  },
  endText: {
    color: '#FA8072',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 80,
    marginTop: 20,
    textAlign: 'center',
  },
  titleText: {
    color: '#FA8072',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    fontFamily: 'Roboto Extrabold',
  },
  titleTextTop: {
    color: '#FA8072',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    fontFamily: 'Roboto Extrabold',
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
