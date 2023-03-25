import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';

function WaterSavingTips({route}) {

    const [tips, setTips] = useState([]);
    const navigation = useNavigation();
    const { category } = route.params;

    const getTipsCategory = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:5050/WaterTips/category/` + category) 
            setTips(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getFuelTips = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:5050/WaterTips/`) 
            setTips(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        category ? getTipsCategory() : getFuelTips()
    }, [])

    return (

        <View style={styles.MainContainer}>

            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'black',
                textAlign: 'center',
                marginBottom: 25
            }}>
                {category} Water Saving Tips
            </Text>
            <ScrollView
                contentContainerStyle={{
                }}>

                {tips.map(tip => (
                    <View key={tip._id}>
                        <TouchableOpacity onPress={() => navigation.navigate("WaterTipView", { id: tip._id })}>
                            <View style={styles.row}>
                                <View style={styles[`1col`]}>
                                    <Image source={{ uri: tip.image }} style={styles.img} />
                                </View>
                                <View style={styles[`2col`]}>
                                    <Text style={{ fontSize: 15, fontWeight: "600", color: "#52B1E2", alignSelf: "flex-start" }}>
                                        {tip.tipTitle}
                                    </Text>
                                </View>
                                <View style={styles[`0.5col`]} onPress={() => navigation.navigate("WaterTipView", { id: tip._id })}>
                                    <Image source={require('../../assets/water_saver/arrow.png')} style={styles.arrowimg} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.tch}/>
                    </View>
                ))}
                <Text style={styles.btmtxt}> More ideas coming soon...</Text>
            </ScrollView>
        </View>

    );
}
export default WaterSavingTips

const styles = StyleSheet.create({
    tch: {
        marginTop: 20,
        borderBottomColor: 'black',
        // borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0.5
    },
    arrowimg: {
        width: 13,
        height: 13
    },
    row: {
        flexDirection: "row",
    },
    "0.5col": {
        borderColor: "black",
        // borderWidth: 1,
        flex: 0.2,
        // alignItems:'center',
        justifyContent: 'center',
        // alignContent:'center',
        // textAlign:'center'
    },
    "1col": {
        borderColor: "black",
        // borderWidth: 1,
        flex: 1,
        alignItems: 'center',

    },
    "2col": {
        borderColor: "black",
        // borderWidth: 1,
        flex: 2,
        justifyContent: 'center',
        paddingRight: 15
    },
    btmtxt: {
        marginTop: 10,
        marginBottom: 50,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: "#52B1E2"

    },
    MainContainer: {
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    button: {
        width: '80%',
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: '#26B787',
        borderRadius: 20,
        marginTop: 20,
        height: 100
    },
    cardButton: {
        padding: 15,
        width: 350,
        alignItems: 'center',
        marginTop: 10,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
        padding: 30,
        fontWeight: "500"
    },
    img: {
        width: 65,
        height: 65,
        borderRadius: 10
    },
    row: {
        flexDirection: 'row',
        marginTop: 15,
    },
});
