import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';

function WaterSaverDashBoard() {

    const [wallets, setWallets] = useState([]);
    const navigation = useNavigation();

    const getWalletItems = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:5050/wallet`);
            setWallets(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getWalletItems();
    }, [])

    return (

        <View style={styles.MainContainer}>

            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'black'
            }}>
                Water Saver
            </Text>
            <Image source={require('../../assets/water_saver/water_icon.png')} style={styles.img} />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("WaterSavingTips", { category: null })}>
                <Text style={styles.text}>Latest Ideas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("WaterSaverCategories")}>
                <Text style={styles.text}>Categories</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddNewTip")}>
                <Text style={styles.text}>Add New Idea</Text>
            </TouchableOpacity>

        </View>

    );
}
export default WaterSaverDashBoard

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        width: '80%',
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: '#52B1E2',
        borderRadius: 20,
        marginTop: 20,
        height: 100
    },
    text: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
        padding: 30,
        fontWeight: "500"
    },
    img: {
        width: 130,
        height: 130,
        marginBottom: 20,
        marginTop: 20
    },
});
