import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'react-native-axios';
import Modal from 'react-native-modal';

function FoodTipViewOneByOne({route}) {
  const {id} = route.params;

  const [tipId, setTipId] = useState(id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ_jpm2wH9uiyelCXdOx_V3l-vRMzrsQqSzKKaCpg&s',
  );
  const [category, setCategory] = useState('');
  const [video, setVideo] = useState('');
  const [userId, setUserId] = useState('');
  const [userNo, setUserNo] = useState('003');
  const [comment, setComment] = useState('');
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const getTips = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5050/FoodSaver/` + tipId,
      );
      setTitle(response.data.title);
      setDescription(response.data.description);
      setImage(response.data.image);
      setVideo(response.data.video);
      setCategory(response.data.category);
      setUserId(response.data.userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTips();
  }, []);

  const onChangeTextComment = value => {
    setComment(value);
  };

  const insertData = () => {
    var data = {
      tipId: tipId,
      userId: userNo,
      comment: comment,
    };
    axios({
      url: 'http://10.0.2.2:5050/FoodSaver-comment/add',
      method: 'POST',
      data: data,
    }).then(response => {
      // setList(response.data)
      Alert.alert('Done', 'Successfully Inserted!', [
        {text: 'OK', onPress: () => nav(tipId)},
      ]);
    });
  };

  nav = idd => {
    navigation.navigate('ViewReviewsInFoodSavingTips', {id: idd});
  };

  const deleteData = () => {
    Alert.alert(
      'Delete Technique',
      'Are you sure you want to permanently delete this technique? ',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            axios({
              url: 'http://10.0.2.2:5050/FoodSaver/' + tipId,
              method: 'DELETE',
            }).then(res => {
              Alert.alert('Done', 'Successfully Deleted!', [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('FoodSavingTips'),
                },
              ]);
            }),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.view}>
      <ScrollView>
        <View style={styles.infoContainer}>
          <Text style={styles.name}> {title}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.image} source={{uri: image}} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.description}> {category}</Text>
          </View>
          <Text style={styles.description}> {description}</Text>

          {userId === userNo ? (
            <View style={styles.fixToText}>
              <TouchableOpacity
                style={styles.CalBtn}
                onPress={() =>
                  navigation.navigate('ViewReviewsInFoodSavingTips', {
                    id: tipId,
                  })
                }>
                <Text style={styles.CalBtnText}>VIEW COMMENTS</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.fixToText}>
              <TouchableOpacity style={styles.CalBtn} onPress={handleModal}>
                <Text style={styles.CalBtnText}>ADD COMMENT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CalBtn}
                onPress={() =>
                  navigation.navigate('ViewReviewsInFoodSavingTips', {
                    id: tipId,
                  })
                }>
                <Text style={styles.CalBtnText}>VIEW COMMENTS</Text>
              </TouchableOpacity>
            </View>
          )}

          {userId === userNo ? (
            <View>
              <View
                style={{
                  width: 350,
                  height: 30,
                  alignItems: 'center',
                  borderBottomColor: '#ffc107',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginTop: 30,
                  marginBottom: 70,
                }}></View>

              <View style={styles.fixToText2}>
                <View style={{flex: 3, justifyContent: 'center'}}>
                  <Text>If you want to modify this?</Text>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UpdateFoodTip', {id: tipId})
                    }>
                    <Image
                      source={require('../../assets/food_waste_saver/edit1.jpeg')}
                      style={{width: 40, height: 40}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, marginLeft: -10}}>
                  <TouchableOpacity onPress={deleteData}>
                    <Image
                      source={require('../../assets/food_waste_saver/delete1.png')}
                      style={{width: 40, height: 40}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null}

          {/* <View style={styles.fixToText}>
                        <TouchableOpacity style={styles.CalBtn} onPress={handleModal}>
                            <Text style={styles.CalBtnText}>ADD COMMENT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.CalBtn} onPress={() => navigation.navigate("ViewReviewsInFoodSavingTips", { id: tipId })}>
                            <Text style={styles.CalBtnText}>VIEW COMMENTS</Text>
                        </TouchableOpacity>
                    </View> */}
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
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={{flexDirection: 'row', marginRight: 10}}>
                <TouchableOpacity style={styles.btn} onPress={insertData}>
                  <Text style={styles.CalBtnText}> ADD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn1} onPress={handleModal}>
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
export default FoodTipViewOneByOne;

const styles = StyleSheet.create({
  fixToText2: {
    marginTop: -50,
    flexDirection: 'row',
    marginLeft: 25,
    marginHorizontal: 10,
  },

  btn: {
    // width: '35%',
    paddingBottom: 5,
    paddingBottom: 5,
    backgroundColor: '#ffc107',
    borderRadius: 10,
    marginLeft: 10,
    height: 40,
    flex: 2,
  },
  btn1: {
    // width: '35%',
    paddingBottom: 5,
    paddingBottom: 5,
    backgroundColor: '#C3A037',
    borderRadius: 10,
    marginLeft: 10,
    height: 40,
    flex: 2,
  },
  input: {
    textAlign: 'center',
    height: 120,
    width: '75%',
    borderBottomEndRadius: 5,
    borderRadius: 10,
    backgroundColor: '#E4E4E4',
    marginHorizontal: 26,
    marginVertical: 20,
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
    borderColor: 'red',
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  view: {
    marginHorizontal: 25,
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
    backgroundColor: '#ffc107',
    borderRadius: 10,
    marginLeft: 10,
    height: 45,
  },
  CalBtnText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 10,
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
    textAlign: 'center',
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
