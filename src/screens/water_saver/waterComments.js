import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput, Alert, ScrollView } from "react-native";
import axios from 'react-native-axios';
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';

function WaterComments({ route }) {

    const navigation = useNavigation();
    const { id } = route.params;
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [cmntId, setcmntId] = useState('');
    const UId = '1234';

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const getComments = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:5050/WaterComments/` + id);
            setComments(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getComments();
    }, [])

    const deleteCmnt = async (did) => {
        Alert.alert(
            "Are you sure?",
            "Are you sure you want to remove this comment?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => onDeleteCmnt(did) }
            ]
        );
    }

    const onDeleteCmnt = async (did) => {
        await axios({
            method: 'DELETE',
            url: `http://10.0.2.2:5050/WaterComments/${did}`
        })
        getComments();
    }

    const onChangeTextComment = (value) => {
        setComment(value)
    }

    const updateData = (id) => {
        var data = {
            comment: comment
        }
        axios({
            url: `http://10.0.2.2:5050/WaterComments/updateWaterComment/${id}`,
            method: "POST",
            data: data
        }).then((response) => {
            Alert.alert(
                "Done",
                "Successfully Updated!",
                [
                    {
                        text: "OK",
                        // onPress: () => navigation.navigate("WaterSaverComments", { id: id })
                        onPress: confirm()
                    }
                ]
            );
        })
    }

    const confirm = () => {
        navigation.navigate("WaterSaverComments", { id: id });
        handleModal();
        getComments();
    }

    const openModal = async (id,cmt) => {
        handleModal();
        setComment(cmt);
        setcmntId(id);
    }

    return (
        <View>
            <View>
                <Text style={styles.cmnttxt}>
                    Comments
                </Text>
            </View>
            <ScrollView style={styles.cmntvw}>

                {comments.length === 0 ?
                    <Text style={{ width: "100%", marginTop: 25, marginLeft: 20, fontSize:16 }}>
                        This idea has no comments.
                    </Text>
                    :
                    comments.map(cmt => (
                        <View key={cmt._id} style={styles.cardButton}>

                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ marginLeft: 30 }}>
                                    {cmt.comment}
                                </Text>
                            </View>

                            {cmt.userId === UId ?
                                <View style={styles.fixToText}>

                                    {/* <TouchableOpacity onPress={handleModal}> */}
                                    <TouchableOpacity onPress={() => openModal(cmt._id,cmt.comment)}>
                                        <Image source={require('../../assets/fuel_saver/pensil.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => deleteCmnt(cmt._id)}>
                                        <Image source={require('../../assets/fuel_saver/cross.png')} style={{ marginTop: 8 }} />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={styles.fixToText}>

                                    <TouchableOpacity>
                                        <Image style={styles.icon} source={require('../../assets/fuel_saver/pensil.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Image style={styles.icon} source={require('../../assets/fuel_saver/cross.png')} />
                                    </TouchableOpacity>
                                </View>
                            }
                            <View style={styles.container}>
                                <View style={styles.separator} />
                                <Modal style={styles.modal} isVisible={isModalVisible}>
                                    <View style={styles.vw}>
                                        <Text style={styles.cmnttxt1}> EDIT COMMENT </Text>
                                        <View>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={onChangeTextComment}
                                                defaultValue={comment}
                                                underlineColorAndroid='transparent' />
                                        </View>
                                        <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                            <TouchableOpacity style={styles.btn} onPress={handleModal}>
                                                <Text style={styles.CalBtnText}> CANCEL </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.btn} onPress={() => updateData(cmntId)}>
                                                <Text style={styles.CalBtnText}> UPDATE </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        </View>
                    ))
                }

            </ScrollView>
        </View>
    )
}

export default WaterComments

const styles = StyleSheet.create({

    CalBtnText: {
        color: '#000',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: "500",
        marginTop: 10
    },
    btn: {
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
    cmnttxt1: {
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
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center'
    },
    icon: {
        opacity: 0.3
    },
    cmnttxt: {
        // textAlign:'center',
        marginLeft: 15,
        marginTop: 20,
        fontSize: 25,
        color: 'black',
        fontWeight: '600'
    },
    cardButton: {
        flexDirection: 'row',
        padding: 15,
        paddingLeft: 0,
        // width: 300,
        marginTop: 10,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    fixToText: {
        flex: 0.5,
        // marginTop: 20,
        // alignSelf: "flex-end",
        justifyContent: 'center',
    },
})
