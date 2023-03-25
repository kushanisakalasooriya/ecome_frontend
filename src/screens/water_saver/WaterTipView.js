import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, TouchableOpacity, Text, Image, ScrollView, SafeAreaView, TextInput, Alert } from "react-native";
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";

function WaterTipView({ route }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ_jpm2wH9uiyelCXdOx_V3l-vRMzrsQqSzKKaCpg&s');
    const [comment, setComment] = useState('');
    const navigation = useNavigation();
    const { id } = route.params;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const getTips = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:5050/WaterTips/` + id);
            setTitle(response.data.tipTitle);
            setDescription(response.data.tipDescription);
            setImage(response.data.image);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTips();
    }, [])

    const onChangeTextComment = (value) => {
        setComment(value)
    }

    const insertData = () => {

        var data = {
            userId: '1234',
            ideaId: id,
            comment: comment
        }
        axios({
            url: "http://10.0.2.2:5050/WaterComments/add",
            method: "POST",
            data: data
        }).then((response) => {
            Alert.alert(
                "Done",
                "Successfully Inserted!",
                [
                    { text: "OK", onPress: () => nav(id) }
                ]
            );
        })
    }

    nav = (idd) => {
        navigation.navigate("WaterTipView", { id: idd });
        handleModal();
        setComment('');
    }

    return (

        <SafeAreaView style={styles.view}>
            <ScrollView >
                <View style={styles.infoContainer}>
                    <Text style={styles.name}> {title}</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Image
                        style={styles.image}
                        source={{ uri: image }}
                    />
                </View>
                <View style={styles.infoContainer}>

                    <Text style={styles.description}> {description}</Text>

                    <View style={styles.fixToText}>
                        <TouchableOpacity style={styles.CalBtn} onPress={handleModal}>
                            <Text style={styles.CalBtnText}>ADD COMMENT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.CalBtn} onPress={() => navigation.navigate("WaterSaverComments", { id: id })}>
                            <Text style={styles.CalBtnText}>VIEW COMMENTS</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.separator} />
                    <Modal style={styles.modal} isVisible={isModalVisible}>
                        <View style={styles.vw}>
                            <Text style={styles.cmnttxt}> ADD COMMENT </Text>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeTextComment}
                                    defaultValue={comment}
                                    underlineColorAndroid='transparent' />
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <TouchableOpacity style={styles.btn} onPress={insertData}>
                                    <Text style={styles.CalBtnText}> ADD</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={handleModal}>
                                    <Text style={styles.CalBtnText}> CANCEL</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}
export default WaterTipView

const styles = StyleSheet.create({

    btn: {
        // width: '35%',
        paddingBottom: 5,
        paddingBottom: 5,
        backgroundColor: '#52B1E2',
        borderRadius: 10,
        marginLeft: 10,
        height: 40,
        flex: 2
    },
    input: {
        textAlign: 'center',
        height: 120,
        width: '75%',
        borderBottomEndRadius: 5,
        borderRadius: 10,
        backgroundColor: "#E4E4E4",
        marginHorizontal: 26,
        marginVertical: 20
    },
    cmnttxt: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        borderBottomWidth: 1,
    },
    vw: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: 'black',
        borderBottomWidth: 1,
    },
    modal: {
        marginVertical: 150,
        marginHorizontal: 75,
        width: 250,
        maxHeight: 250,
        borderRadius: 10,
        borderColor: 'red'
    },
    container: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
    },
    view: {
        marginHorizontal: 25
    },
    fixToText: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    CalBtn: {
        width: '50%',
        paddingBottom: 5,
        paddingBottom: 5,
        backgroundColor: '#52B1E2',
        borderRadius: 10,
        marginLeft: 10,
        height: 45
    },
    CalBtnText: {
        color: '#000',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: "500",
        marginTop: 10
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1,
        marginVertical: 20,
    },
    image: {
        height: 280,
        width: '92%',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,

    },
    infoContainer: {
        padding: 16,
        //   justifyContent:'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#787878',
        marginBottom: 16,
        textAlign: 'justify',
    },
});