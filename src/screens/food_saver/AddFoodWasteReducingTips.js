import {useNavigation} from '@react-navigation/native'
import React, {useState} from 'react'
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import axios from 'react-native-axios'
import {Dropdown} from 'react-native-element-dropdown'
import {ScrollView} from 'react-native-gesture-handler'

function AddFoodWasteReducingTips () {
  // const [wallets, setWallets] = useState([]);
  const navigation = useNavigation()

  const data = [
    {label: 'Ways to Reduce Food Waste', value: 'Ways to Reduce Food Waste'},
    {label: 'Food Preservation Methods', value: 'Food Preservation Methods'},
    {
      label: 'Replanting Using Food Waste Plant',
      value: 'Replanting Using Food Waste Plant',
    },
  ]
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [video, setVideo] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState(null)
  const [userId, setUserId] = useState('003')

  const onChangeTextTitle = value => {
    setTitle(value)
  }
  const onChangeTextDescription = value => {
    setDescription(value)
  }
  const onChangeTextVideo = value => {
    setVideo(value)
  }
  const onChangeTextImage = value => {
    setImage(value)
  }
  const onChangeTextCategory = value => {
    setCategory(value)
  }

  const insertData = () => {
    if (title == '') {
      alert('Please Enter Title')
      return false
    } else if (category == null) {
      alert('Please Select the Category')
      return false
    } else if (description == '') {
      alert('Please Enter Description')
      return false
    } else if (video == '') {
      alert('Please Enter Video URL')
      return false
    } else if (image == '') {
      alert('Please enter Image URL')
      return false
    } else {
      var data = {
        title: title,
        category: category,
        description: description,
        image: image,
        video: video,
        userId: userId,
      }
      axios({
        url: 'http://10.0.2.2:5050/FoodSaver/add',
        method: 'POST',
        data: data,
      }).then(response => {
        // setList(response.data)
        Alert.alert('Done', 'Successfully Inserted!', [
          {text: 'OK', onPress: () => navigation.navigate('FoodSavingTips')},
        ])
      })
    }
  }

  return (
    <View style={styles.MainContainer}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: 'black',
          marginTop: -20,
        }}
      >
        Add Food Waste Reducing Tips
      </Text>

      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <Image
          source={require('../../assets/food_waste_saver/food2.png')}
          style={styles.img}
        />

        <View style={styles.container}>
          <Text style={styles.lableClass}>Title : </Text>
          <TextInput
            onChangeText={onChangeTextTitle}
            value={title}
            name='title'
            underlineColorAndroid='transparent'
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
            labelField='label'
            valueField='value'
            searchPlaceholder='Search...'
            value={category}
            onChange={item => {
              setCategory(item.value)
            }}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.lableClass3}>description : </Text>
          <TextInput
            onChangeText={onChangeTextDescription}
            underlineColorAndroid='transparent'
            style={styles.SmallTextInputStyleClass3}
            name='description'
            value={description}
            numberOfLines={6}
            multiline={true}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.lableClass4}> Video URL :</Text>
          <TextInput
            onChangeText={onChangeTextVideo}
            underlineColorAndroid='transparent'
            style={styles.SmallTextInputStyleClass4}
            name='video'
            value={video}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.lableClass5}> Image URL :</Text>
          <TextInput
            onChangeText={onChangeTextImage}
            underlineColorAndroid='transparent'
            style={styles.SmallTextInputStyleClass5}
            name='image'
            value={image}
          />
        </View>

        <View
          style={{
            width: 450,
            alignItems: 'center',
            // borderBottomColor: '#ffc107',
            // borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop: 260,
          }}
        ></View>

        <View style={styles.fixToText}>
          <TouchableOpacity style={styles.CalBtn} onPress={insertData}>
            <Text style={styles.CalBtnText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.CalBtn1}
            onPress={() => navigation.navigate('FoodSaverDashboard')}
          >
            <Text style={styles.CalBtnText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
export default AddFoodWasteReducingTips

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
  },
  CalBtn: {
    width: '25%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#ffc107',
    borderRadius: 10,
    marginTop: 120,
    marginLeft: 10,
    height: 45,
  },
  CalBtn1: {
    width: '25%',
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
    marginTop: -370,
    flexDirection: 'row',
    marginLeft: 76,
    marginBottom: 20,
  },
  text: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    padding: 30,
    fontWeight: '500',
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
    marginTop: 0,
    marginLeft: 40,
    color: '#ffc107',
    fontWeight: '600',
  },
  SmallTextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    width: '50%',
    borderBottomEndRadius: 5,
    marginTop: -5,
    marginLeft: 30,
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
    marginLeft: 10,
    color: '#ffc107',
    fontWeight: '600',
  },
  SmallTextInputStyleClass2: {
    textAlign: 'center',
    height: 40,
    width: '50%',
    borderBottomEndRadius: 5,
    marginTop: 10,
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
    marginTop: 30,
    borderRadius: 20,
    marginLeft: 1,
    color: '#ffc107',
    fontWeight: '600',
  },
  SmallTextInputStyleClass3: {
    width: '50%',
    borderBottomEndRadius: 5,
    marginTop: 26,
    borderRadius: 10,
    margin: 5,
    marginLeft: 30,
    backgroundColor: '#E4E4E4',
    color: 'black',
    height: 90,
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  lableClass4: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    marginTop: 25,
    borderRadius: 20,
    marginLeft: 6,
    color: '#ffc107',
    fontWeight: '600',
  },
  SmallTextInputStyleClass4: {
    textAlign: 'center',
    height: 40,
    width: '50%',
    borderBottomEndRadius: 5,
    marginTop: 17,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#E4E4E4',
    color: 'black',
    marginLeft: 30,
  },
  lableClass5: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    marginTop: 28,
    borderRadius: 20,
    marginLeft: 4,
    color: '#ffc107',
    fontWeight: '600',
  },
  SmallTextInputStyleClass5: {
    textAlign: 'center',
    height: 40,
    width: '50%',
    borderBottomEndRadius: 5,
    marginTop: 20,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#E4E4E4',
    color: 'black',
    marginLeft: 28,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  img: {
    width: 200,
    height: 200,
    marginBottom: -20,
    marginTop: -30,
    marginLeft: 76,
  },
  // drop dow styles
  dropdown: {
    height: 50,
    width: '50%',
    // borderColor: 'gray',
    backgroundColor: '#E4E4E4',
    color: 'black',
    marginTop: 11,
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
})
