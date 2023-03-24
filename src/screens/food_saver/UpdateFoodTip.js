import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'react-native-axios';
import {Dropdown} from 'react-native-element-dropdown';
import {ScrollView} from 'react-native-gesture-handler';

function UpdateFoodTip({route}) {
  const navigation = useNavigation();

  const {id} = route.params;

  const [tipId, setTipId] = useState(id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [userId, setUserId] = useState('');

  const onChangeTextTitle = value => {
    setTitle(value);
  };
  const onChangeTextDescription = value => {
    setDescription(value);
  };

  const onChangeTextImage = value => {
    setImage(value);
  };
  const onChangeTextCategory = value => {
    setCategory(value);
  };
  const onChangeTextVideo = value => {
    setVideo(value);
  };

  const data = [
    {label: 'Ways to Reduce Food Waste', value: 'Ways to Reduce Food Waste'},
    {label: 'Food Preservation Methods', value: 'Food Preservation Methods'},
    {
      label: 'Replanting Using Food Waste Plant',
      value: 'Replanting Using Food Waste Plant',
    },
  ];

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

  const updateData = () => {
    if (title == '') {
      alert('Please Enter Title');
      return false;
    } else if (category == null) {
      alert('Please Select the Category');
      return false;
    } else if (description == '') {
      alert('Please Enter Description');
      return false;
    } else if (video == '') {
      alert('Please Enter Video URL');
      return false;
    } else if (image == '') {
      alert('Please enter Image URL');
      return false;
    } else {
      var data = {
        title: title,
        category: category,
        description: description,
        image: image,
        video: video,
      };
      axios({
        url: 'http://10.0.2.2:5050/FoodSaver/updateFoodTip/' + tipId,
        method: 'POST',
        data: data,
      }).then(res => {
        // setList(response.data)
        // setVisible(false)

        Alert.alert('Done', 'Successfully Updated!', [
          {text: 'OK', onPress: () => navigation.navigate('FoodSavingTips')},
        ]);
      });
    }
  };

  return (
    <View style={styles.app}>
      {/* <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
                marginBottom: 30
            }}>
                Add New Tip
            </Text>

            <Image
                source={require('../../assets/food_waste_saver/food3.png')}
                style={styles.img}
            />

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
                        numberOfLines={6}
                        multiline={true}
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
                        data={data}
                        search
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
                    <Text style={styles.texts}> Video Link :</Text>
                </View>
                <View style={styles[`2col`]}>
                    <TextInput
                        onChangeText={onChangeTextVideo}
                        defaultValue={video}
                        underlineColorAndroid='transparent'
                        style={styles.SmallTextInputStyleClass}
                        keyboardType="numeric"
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
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <View style={styles.fixToText}>
                <TouchableOpacity style={styles.CalBtn} onPress={updateData}>
                    <Text style={styles.CalBtnText}> Update </Text>
                </TouchableOpacity>
            </View> */}

      <ScrollView
        contentContainerStyle={{
          // justifyContent: 'center',
          marginLeft: -40,
          // marginRight: -20,
        }}>
        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
              marginLeft: 40,
            }}>
            Update Details
          </Text>

          <Image
            source={require('../../assets/food_waste_saver/food3.png')}
            style={styles.img}
          />
          <View style={styles.container}>
            <Text style={styles.lableClass}>Title : </Text>
            <TextInput
              onChangeText={onChangeTextTitle}
              value={title}
              name="title"
              underlineColorAndroid="transparent"
              style={styles.SmallTextInputStyleClass}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.lableClass2}>category :</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={category}
              onChange={item => {
                setCategory(item.value);
              }}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.lableClass3}>description : </Text>
            <TextInput
              onChangeText={onChangeTextDescription}
              underlineColorAndroid="transparent"
              style={styles.SmallTextInputStyleClass3}
              name="description"
              value={description}
              numberOfLines={6}
              multiline={true}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.lableClass4}> Video URL :</Text>
            <TextInput
              onChangeText={onChangeTextVideo}
              underlineColorAndroid="transparent"
              style={styles.SmallTextInputStyleClass4}
              name="video"
              value={video}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.lableClass5}> Image URL :</Text>
            <TextInput
              onChangeText={onChangeTextImage}
              underlineColorAndroid="transparent"
              style={styles.SmallTextInputStyleClass5}
              name="image"
              value={image}
            />
          </View>
        </View>
        <View style={styles.fixToText}>
          <TouchableOpacity style={styles.CalBtn} onPress={updateData}>
            <Text style={styles.CalBtnText}>UPDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.CalBtn1}
            onPress={() => navigation.navigate('FoodSavingTips')}>
            <Text style={styles.CalBtnText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  lableClass: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    marginTop: 0,
    marginLeft: 80,
    color: '#ffc107',
    fontWeight: '600',
  },
  SmallTextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    width: '55%',
    borderBottomEndRadius: 5,
    marginTop: -5,
    marginLeft: 37,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#E4E4E4',
    color: 'black',
  },
  lableClass2: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    marginTop: 20,
    borderRadius: 20,
    marginLeft: 55,
    color: '#ffc107',
    fontWeight: '600',
  },
  SmallTextInputStyleClass2: {
    textAlign: 'center',
    height: 40,
    width: '55%',
    borderBottomEndRadius: 5,
    marginTop: 20,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#E4E4E4',
    color: 'black',
    marginLeft: 40,
  },
  lableClass3: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    marginTop: 26,
    borderRadius: 20,
    marginLeft: 40,
    color: '#ffc107',
    fontWeight: '600',
  },
  SmallTextInputStyleClass3: {
    height: 40,
    width: '55%',
    borderBottomEndRadius: 5,
    marginTop: 25,
    borderRadius: 10,
    margin: 5,
    marginLeft: 33,
    backgroundColor: '#E4E4E4',
    color: 'black',
    height: 150,
    justifyContent: 'flex-start',
  },
  lableClass4: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    marginTop: 20,
    borderRadius: 20,
    marginLeft: 45,
    color: '#ffc107',
    fontWeight: '600',
  },
  SmallTextInputStyleClass4: {
    textAlign: 'center',
    height: 40,
    width: '55%',
    borderBottomEndRadius: 5,
    marginTop: 16,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#E4E4E4',
    color: 'black',
    marginLeft: 33,
  },
  lableClass5: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    marginTop: 30,
    borderRadius: 20,
    marginLeft: 41,
    color: '#ffc107',
    fontWeight: '600',
  },
  SmallTextInputStyleClass5: {
    textAlign: 'center',
    height: 40,
    width: '55%',
    borderBottomEndRadius: 5,
    marginTop: 24,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#E4E4E4',
    color: 'black',
    marginLeft: 33,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  img: {
    width: 220,
    height: 220,
    marginBottom: 0,
    marginTop: -10,
    marginLeft: 100,
  },
  // drop down
  // drop dow styles
  dropdown: {
    height: 50,
    width: '55%',
    // borderColor: 'gray',
    backgroundColor: '#E4E4E4',
    color: 'black',
    marginTop: 17,
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: 38,
  },

  itemTextStyle: {
    paddingLeft: 10,
  },
  // dropdown: {
  //     textAlign: 'center',
  //     height: 40,
  //     width: '85%',
  //     borderBottomEndRadius: 5,
  //     // marginLeft: 35,
  //     borderRadius: 10,
  //     margin: 5,
  //     backgroundColor: "#E4E4E4",
  //     color: "black"
  // },
  placeholderStyle: {
    paddingLeft: 10,
  },
  CalBtn: {
    width: '45%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#ffc107',
    borderRadius: 10,
    marginTop: 120,
    marginLeft: 10,
    height: 45,
  },
  CalBtn1: {
    width: '45%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#C3A037',
    borderRadius: 10,
    marginTop: 120,
    marginLeft: 10,
    height: 45,
  },
  CalBtnText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    fontWeight: '500',
  },
  fixToText: {
    marginTop: -80,
    flexDirection: 'row',
    marginLeft: 39,
    marginBottom: 20,
  },
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: 'auto',
    width: 350,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    marginLeft: 20,
  },
  row: {
    flexDirection: 'row',
  },
  '2col': {
    borderColor: '#fff',
    borderWidth: 1,
    flex: 2,
  },
  // SmallTextInputStyleClass: {
  //     textAlign: 'center',
  //     height: 40,
  //     width: '85%',
  //     borderBottomEndRadius: 5,
  //     // marginLeft: 35,
  //     borderRadius: 10,
  //     margin: 5,
  //     backgroundColor: "#E4E4E4",
  //     color: "black"
  // },
  texts: {
    // textAlign: 'center',
    fontSize: 16,
    marginTop: 13,
    paddingLeft: 30,
    color: 'Black',
    fontWeight: '600',
  },
};

export default UpdateFoodTip;
