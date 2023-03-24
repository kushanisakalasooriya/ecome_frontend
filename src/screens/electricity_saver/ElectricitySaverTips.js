/* eslint-disable no-dupe-keys */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import axios from 'react-native-axios';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

function ElectricitySaverTips() {
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
          marginBottom: 10,
        }}>
        Electricity Saver Tips
      </Text>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          marginLeft: 20,
          marginRight: 20,
        }}>
        <Text style={styles.titleTextTop}>
          1. TURNING OFF THE LIGHTS WHEN LEAVING A ROOM{' '}
        </Text>
        <Text style={styles.text}>
          A basic habit to develop and foster is to make sure that you always
          turn off the lights when leaving a room. Make a reminder to do so
          until you get into a habit of doing so subconsciously. You can save a
          good chunk of your monthly electricity costs by doing something as
          simple as this regularly.
        </Text>
        <View
          style={{
            marginTop: 10,
            marginBottom: 20,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.titleTextTop}>2. USE LED LIGHTS </Text>
        <Text style={styles.text}>
          Many homes are moving towards smart LED lights as they not only look
          stylish and affordable but are also way more efficient than halogen
          bulbs.
        </Text>
        <View
          style={{
            marginTop: 10,
            marginBottom: 20,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.titleTextTop}>
          3. SWITCHING TO EFFICIENT APPLIANCES
        </Text>
        <Text style={styles.text}>
          Dryers and refrigerators are two of the most energy-intensive
          appliances in a home and replacing these with better efficient models
          can cut the electricity usage by half, thereby reducing your
          electricity bills. Installing heat pumps is another idea to reduce
          electricity consumption. In general, maintaining and replacing
          appliances every few years will make them have less burden on your
          electricity usage.
        </Text>
        <View
          style={{
            marginTop: 10,
            marginBottom: 20,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.titleTextTop}>4. UNPLUG DEVICES </Text>
        <Text style={styles.text}>
          Needless to say how important it is to unplug devices when not in use.
          Do not leave devices on standby but rather unplug them and save your
          electricity bill, and the planet.
        </Text>
        <View
          style={{
            marginTop: 10,
            marginBottom: 20,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.titleTextTop}>5. USE SMART AUTOMATED DEVICES </Text>
        <Text style={styles.text}>
          Smart automated devices can lower your energy bills even when you
          forget to. Smart automation systems will detect when you’re no longer
          using a device and turn off the power supply.
        </Text>
        <View
          style={{
            marginTop: 10,
            marginBottom: 20,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.titleTextTop}>6. BRING IN SUNLIGHT </Text>
        <Text style={styles.text}>
          During daylight hours, switch off artificial lights and use windows
          and skylights to brighten your home.
        </Text>
        <View
          style={{
            marginTop: 10,
            marginBottom: 20,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.titleTextTop}>7. SOLAR POWERED DEVICES </Text>
        <Text style={styles.text}>
          These days you can find a solar-powered version of almost any
          electronic you use in your home. Making small shifts and using more
          solar-powered electronics can go a long way and can also lower your
          maintenance and replacement costs of such electronics.
        </Text>
        <View
          style={{
            marginTop: 10,
            marginBottom: 20,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.titleTextTop}>
          8. SET CLEAR ENERGY SAVING GOALS{' '}
        </Text>
        <Text style={styles.text}>
          After you have an accurate assessment of your current energy use, set
          clear and attainable energy-saving goals for your business. Identify
          target focus areas, set benchmark goals and measure your progress.
        </Text>
        <View
          style={{
            marginTop: 10,
            marginBottom: 20,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.endText}>Keep the Good Work Up!</Text>
      </ScrollView>
    </View>
  );
}
export default ElectricitySaverTips;

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
    marginTop: 20,
    height: 60,
    justifyContent: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 10,
    textAlign: 'justify',
  },
  endText: {
    color: '#FA8072',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 80,
    marginTop: 20,
    textAlign: 'center',
  },
  titleTextTop: {
    color: '#FA8072',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    fontFamily: 'Roboto Extrabold',
    fontWeight: '700',
  },
});
