import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';

function WaterSaverCategories() {

    const [wallets, setWallets] = useState([]);
    const navigation = useNavigation();

    // const getWalletItems = async () => {
    //     try {
    //         const response = await axios.get(`http://192.168.1.111:5050/wallet`);
    //         setWallets(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     getWalletItems();
    // }, [])

    return (

        <View style={styles.MainContainer}>

            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'black'
            }}>
                Categories
            </Text>
            <Image source={require('../../assets/water_saver/categories.png')} style={styles.img} />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("WaterSavingTips", { category: "Domestic" })}>
                <Text style={styles.text}>DOMESTIC IDEAS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("WaterSavingTips", { category: "Medium Scale"})}>
                <Text style={styles.text}> MEDUIM SCALE IDEAS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("WaterSavingTips", {category: "Industrial"})}>
                <Text style={styles.text}> INDUSTRIAL IDEAS</Text>
            </TouchableOpacity>

        </View>

    );
}
export default WaterSaverCategories

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        width: '80%',
        paddingTop: 2,
        paddingBottom: 0,
        backgroundColor: '#52B1E2',
        borderRadius: 20,
        marginTop: 20,
        height: 80
    },
    text: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 25,
        fontWeight: "600"
    },
    img: {
        width: 150,
        height: 150,
        marginBottom: 30,
        marginTop: 30
    },
});
