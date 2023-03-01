import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Button, Alert, Picker, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from 'react-native-axios';

function AddCommentForFoodTips({ route }) {

    // const [wallets, setWallets] = useState([]);
    const navigation = useNavigation();

    const { id } = route.params;

    const [tipId, setTipId] = useState(id);
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState('003');


    const onChangeTextComment = (value) => {
        setComment(value)
    }


    const insertData = () => {

        var data = {
            tipId: tipId,
            userId: userId,
            comment: comment,
        }
        axios({
            url: "http://10.0.2.2:5050/FoodSaver-comment/add",
            method: "POST",
            data: data
        }).then((response) => {
            // setList(response.data)
            Alert.alert(
                "Done",
                "Successfully Inserted!",
                [
                    { text: "OK", onPress: () => navigation.navigate("FoodSaverDashboard") }
                ]
            );
        })

    }

    return (

        <View style={styles.MainContainer}>

            <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 30
            }}>
                Add Review
            </Text>

            <Image
                source={require('../../../assets/food_waste_saver/feedback.png')}
                style={styles.img}
            />

            {/* <Text>tip id is: {tipId}</Text> */}

            <View style={styles.container}>

                <Text style={styles.lableClass}>Comment : </Text>
                <TextInput
                    onChangeText={onChangeTextComment}
                    underlineColorAndroid='transparent'
                    style={styles.SmallTextInputStyleClass3}
                    name='comment'
                    value={comment}
                    numberOfLines={10}
                    multiline={true}

                />

            </View>

            {/* <View style={{
                width: 450,
                alignItems: 'center',
                marginTop: 260,
            }}>
            </View> */}

            <View style={styles.fixToText2}>
                <TouchableOpacity style={styles.CalBtn} onPress={insertData}>
                    <Text style={styles.CalBtnText}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.CalBtn} onPress={() => navigation.navigate("FoodSaverDashboard")}>
                    <Text style={styles.CalBtnText}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}
export default AddCommentForFoodTips

const styles = StyleSheet.create({
    dropdownList: {
        textAlign: 'center',
        height: 40,
        width: '50%',
    },
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        flex: 1
    },
    CalBtn: {
        width: '35%',
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: '#ffc107',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
        height: 45
    },
    CalBtnText: {
        color: '#000',
        fontSize: 14,
        textAlign: 'center',
        padding: 10,
        fontWeight: "500"
    },
    fixToText2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 100,
        marginTop: 300,
        marginLeft: -10
    },
    text: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
        padding: 30,
        fontWeight: "500"
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
    lableClass: {
        textAlign: 'center',
        height: 40,
        fontSize: 14,
        marginTop: 40,
        marginLeft: 20,
        color: "#ffc107",
        fontWeight: "600",
    },
    SmallTextInputStyleClass: {
        textAlign: 'center',
        height: 40,
        width: '50%',
        borderBottomEndRadius: 5,
        marginTop: -5,
        marginLeft: 37,
        borderRadius: 10,
        margin: 5,
        backgroundColor: "#E4E4E4",
        color: "black"
    },
    lableClass2: {
        textAlign: 'center',
        height: 40,
        fontSize: 14,
        marginTop: 60,
        borderRadius: 20,
        marginLeft: 10,
        color: "#ffc107",
        fontWeight: "600"
    },
    SmallTextInputStyleClass2: {
        textAlign: 'center',
        height: 40,
        width: '50%',
        borderBottomEndRadius: 5,
        marginTop: 50,
        borderRadius: 10,
        margin: 5,
        backgroundColor: "#E4E4E4",
        color: "black",
        marginLeft: 40,
    },
    lableClass3: {
        textAlign: 'center',
        height: 40,
        fontSize: 14,
        marginTop: 200,
        borderRadius: 20,
        marginLeft: 1,
        color: "#ffc107",
        fontWeight: "600"
    },
    SmallTextInputStyleClass3: {
        height: 40,
        width: '50%',
        borderBottomEndRadius: 5,
        marginTop: 80,
        borderRadius: 10,
        margin: 5,
        marginLeft: -90,
        backgroundColor: "#E4E4E4",
        color: "black",
        height: 150,
        justifyContent: "flex-start",
        paddingHorizontal: 8,
    },
    lableClass4: {
        textAlign: 'center',
        height: 40,
        fontSize: 14,
        marginTop: 285,
        borderRadius: 20,
        marginLeft: 6,
        color: "#ffc107",
        fontWeight: "600"
    },
    SmallTextInputStyleClass4: {
        textAlign: 'center',
        height: 40,
        width: '50%',
        borderBottomEndRadius: 5,
        marginTop: 280,
        borderRadius: 10,
        margin: 5,
        backgroundColor: "#E4E4E4",
        color: "black",
        marginLeft: 37,
    },
    lableClass5: {
        textAlign: 'center',
        height: 40,
        fontSize: 14,
        marginTop: 345,
        borderRadius: 20,
        marginLeft: 4,
        color: "#ffc107",
        fontWeight: "600"
    },
    SmallTextInputStyleClass5: {
        textAlign: 'center',
        height: 40,
        width: '50%',
        borderBottomEndRadius: 5,
        marginTop: 340,
        borderRadius: 10,
        margin: 5,
        backgroundColor: "#E4E4E4",
        color: "black",
        marginLeft: 38,
    },
    container: {
        flex: 1,
        flexDirection: "row",
    },
    img: {
        width: 220,
        height: 220,
        marginBottom: -20,
        marginTop: -30,
    },
    // drop dow styles
    dropdown: {
        height: 50,
        width: '50%',
        // borderColor: 'gray',
        backgroundColor: "#E4E4E4",
        color: "black",
        marginTop: 51,
        // borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginLeft: 38,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
