import axios from 'react-native-axios';
import React, { Component, useState } from 'react';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

function AddNewTip() {

    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');


    const onChangeTextTitle = (value) => {
        setTitle(value)
    }
    const onChangeTextDescription = (value) => {
        setDescription(value)
    }

    const onChangeTextImage = (value) => {
        setImage(value)
    }
    const onChangeTextCategory = (value) => {
        setCategory(value)
    }

    const insertData = () => {

        if (title == "") {
            alert("Please Enter Title")
            return false;
        } else if (description == "") {
            alert("Please Enter Description")
            return false;
        } else if (category == "") {
            alert("Please Select the Category")
            return false;
        } else if (image == "") {
            alert("Please Enter Image URL")
            return false;
        } else {

            var data = {
                userId: '1234',
                image: image,
                tipTitle: title,
                tipDescription: description,
                tipCategory: category
            }
            axios({
                url: "http://10.0.2.2:5050/Watertips/add",
                method: "POST",
                data: data
            }).then((response) => {
                Alert.alert(
                    "Done",
                    "Successfully Inserted!",
                    [
                        { text: "OK", onPress: () => navigation.navigate("WaterSaverDashBoard") }
                    ]
                );
            })
        }



    }

    const dataa = [
        { label: 'Domestic', value: 'Domestic' },
        { label: 'Medium Scale', value: 'Medium Scale' },
        { label: 'Industrial', value: 'Industrial' },
    ];

    return (
        <View style={styles.app}>
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
                marginBottom: 30
            }}>
                Add New Tip
            </Text>
            <Image source={require('../../assets/water_saver/addIcon.png')} style={styles.img} />
            <View style={styles.row}>
                <View style={styles[`2col`]}>
                    <Text style={styles.texts}> Title :</Text>
                </View>
                <View style={styles[`2col`]}>
                    <TextInput
                        onChangeText={onChangeTextTitle}
                        defaultValue={title}
                        underlineColorAndroid='transparent'
                        style={styles.SmallTextInputStyleClass}
                        keyboardType="default"
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles[`2col`]}>
                    <Text style={styles.texts}> Description :</Text>
                </View>
                <View style={styles[`2col`]}>
                    <TextInput
                        onChangeText={onChangeTextDescription}
                        defaultValue={description}
                        underlineColorAndroid='transparent'
                        style={styles.SmallTextInputStyleClass}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles[`2col`]}>
                    <Text style={styles.texts}> Category :</Text>
                </View>
                <View style={styles[`2col`]}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        itemTextStyle={styles.itemTextStyle}
                        selectedTextStyle={styles.itemTextStyle}
                        data={dataa}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        value={category}
                        onChange={item => {
                            setCategory(item.value);
                        }}

                    />

                </View>
            </View>
            <View style={styles.row}>
                <View style={styles[`2col`]}>
                    <Text style={styles.texts}> Image Link :</Text>
                </View>
                <View style={styles[`2col`]}>
                    <TextInput
                        onChangeText={onChangeTextImage}
                        defaultValue={image}
                        underlineColorAndroid='transparent'
                        style={styles.SmallTextInputStyleClass}
                    />
                </View>
            </View>

            <View style={styles.fixToText}>
                <TouchableOpacity style={styles.CalBtn} onPress={insertData}>
                    <Text style={styles.CalBtnText}> Add </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = {
    itemTextStyle: {
        paddingLeft: 10
    },
    dropdown: {
        textAlign: 'center',
        height: 40,
        width: '85%',
        borderBottomEndRadius: 5,
        // marginLeft: 35,
        borderRadius: 10,
        margin: 5,
        backgroundColor: "#E4E4E4",
        color: "black"
    },
    placeholderStyle: {
        paddingLeft: 10
    },
    CalBtn: {
        backgroundColor: '#52B1E2',
        borderRadius: 10,
        marginTop: 30,
        // marginLeft: 10,
        height: 45,
        width: 300,
    },
    CalBtnText: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        fontWeight: "500"
    },
    fixToText: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    app: {
        flex: 4, // the number of columns you want to devide the screen into
        marginHorizontal: "auto",
        width: 350,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 30
    },
    row: {
        flexDirection: "row"
    },
    "2col": {
        borderColor: "#fff",
        // borderWidth: 1,
        flex: 2
    },
    SmallTextInputStyleClass: {
        textAlign: 'center',
        height: 40,
        width: '85%',
        borderBottomEndRadius: 5,
        // marginLeft: 35,
        borderRadius: 10,
        margin: 5,
        backgroundColor: "#E4E4E4",
        color: "black"
    },
    texts: {
        // textAlign: 'center',
        fontSize: 16,
        marginTop: 13,
        paddingLeft: 30,
        color: "Black",
        fontWeight: "600",
    },
    img: {
        width: 130,
        height: 130,
        marginBottom: 30,
    }
};

export default AddNewTip
