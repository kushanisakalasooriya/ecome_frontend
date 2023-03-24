import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.MainContainer}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: '900',
          color: 'black',
          marginTop: 30,
        }}>
        EcoMe
      </Text>
      <Image
        source={require('../assets/common/TogetherWeCan.png')}
        style={styles.img}
      />

      <ImageBackground
        source={require('../assets/common/homeBg.png')}
        resizeMode="cover"
        style={styles.bgImage}
        blurRadius={1}>
        <View style={styles.fixToText}>
          <TouchableOpacity
            style={styles.HomeBtnElec}
            onPress={() => navigation.navigate('Electricity')}>
            <Text style={styles.ElecBtnText}>Electricity Saver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.HomeBtnWater}
            onPress={() => navigation.navigate('Water')}>
            <Text style={styles.WaterBtnText}>Water Saver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fixToText}>
          <TouchableOpacity
            style={styles.HomeBtnFuel}
            onPress={() => navigation.navigate('Fuel')}>
            <Text style={styles.FuelBtnText}>Fuel Saver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.HomeBtnFood}
            onPress={() => navigation.navigate('Food')}>
            <Text style={styles.FoodBtnText}>Food Saver</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bgImage: {
    width: '100%',
    height: 400,
    marginTop: 120,
  },
  HomeBtnElec: {
    width: '35%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#FA8072',
    borderRadius: 10,
    marginTop: 70,
    height: 100,
    marginLeft: 45,
  },
  ElecBtnText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    paddingTop: 23,
    fontWeight: '500',
  },
  HomeBtnWater: {
    width: '35%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#52B1E2',
    borderRadius: 10,
    marginTop: 70,
    marginLeft: 30,
    height: 100,
  },
  WaterBtnText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    fontWeight: '500',
    paddingTop: 33,
  },
  fixToText: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  HomeBtnFuel: {
    width: '35%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#26B787',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 45,
    height: 100,
  },
  FuelBtnText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    fontWeight: '500',
    paddingTop: 33,
  },
  HomeBtnFood: {
    width: '35%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#FFC107',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 30,
    height: 100,
  },
  FoodBtnText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    fontWeight: '500',
    paddingTop: 33,
  },
});
