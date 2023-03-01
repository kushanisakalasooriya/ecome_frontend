import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image } from "react-native";

import Home from './src/screens/Home';

import FuelSaverDashBoard from './src/screens/fuel_saver/FuelSaverDashBoard';
import FuelSavingTips from './src/screens/fuel_saver/FuelSavingTips';
import FuelCostCalculator from './src/screens/fuel_saver/FuelCostCalculator';
import FuelEfficiencyCalculator from './src/screens/fuel_saver/FuelEfficiencyCalculator';
import FuelTipView from './src/screens/fuel_saver/FuelTipView';
import UpdateFuelComent from './src/screens/fuel_saver/updateComment';

import FoodSaverDashboard from './src/screens/food_saver/FoodSaverDashboard';
import AddFoodWasteReducingTips from './src/screens/food_saver/AddFoodWasteReducingTips';
import FoodSavingTipsView from './src/screens/food_saver/FoodTipsView';
// import AddCommentForFoodTips from './src/screens/food_saver/food_comments/AddCommentsFoeFoodTips';
import ViewReviewForFoodTips from './src/screens/food_saver/food_comments/ViewCommentsForFoodTips';
import UpdateFoodTip from './src/screens/food_saver/UpdateFoodTip';
import FoodTipViewOneByOne from './src/screens/food_saver/FoodTipViewOneByOne';

import WaterSaverDashBoard from './src/screens/water_saver/WaterSaverDashboard';
import WaterSavingTips from './src/screens/water_saver/WaterSavingTips';
import WaterTipView from './src/screens/water_saver/WaterTipView';
import AddNewTip from './src/screens/water_saver/AddNewTip';
import WaterSaverCategories from './src/screens/water_saver/WaterSaverCategories';
import WaterComments from './src/screens/water_saver/waterComments';

import ElectricitySaverDashBoard from './src/screens/electricity_saver/ElectricitySaverDashBoard';
import ElectricityCostCalculator from './src/screens/electricity_saver/ElectricityCostCalculator';
import AddBillInformation from './src/screens/electricity_saver/AddBillInformation';
import ElectricitySaverTips from './src/screens/electricity_saver/ElectricitySaverTips';
import ElectricitySaverBillHistory from './src/screens/electricity_saver/ElectricitySaverBillHistory';
import ElectricitySaverReport from './src/screens/electricity_saver/ElectricitySaverReport';
import UpdateBillInformation from './src/screens/electricity_saver/UpdateBillInformation';

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

//Electricity Saver
const Electricity = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="ElectricitySaverDashBoard"
        component={ElectricitySaverDashBoard}
        options={{ title: '' }}
      />

      <Stack.Screen
        name="ElectricityCostCalculator"
        component={ElectricityCostCalculator}
        options={{ title: '' }}
      />

      <Stack.Screen
        name="AddBillInformation"
        component={AddBillInformation}
        options={{ title: '' }}
      />

      <Stack.Screen
        name="ElectricitySaverTips"
        component={ElectricitySaverTips}
        options={{ title: '' }}
      />

      <Stack.Screen
        name="ElectricitySaverBillHistory"
        component={ElectricitySaverBillHistory}
        options={{ title: '' }}
      />

      <Stack.Screen
        name="ElectricitySaverReport"
        component={ElectricitySaverReport}
        options={{ title: '' }}
      />
      <Stack.Screen name="UpdateBillInformation" component={UpdateBillInformation} options={{ title: '' }} />

    </Stack.Navigator>
  );
}

//Water Saver
const Water = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="WaterSaverDashBoard" component={WaterSaverDashBoard} options={{ title: '' }} />
      <Stack.Screen name="WaterSavingTips" component={WaterSavingTips} options={{ title: '' }} />
      <Stack.Screen name="WaterTipView" component={WaterTipView} options={{ title: '' }} />
      <Stack.Screen name="AddNewTip" component={AddNewTip} options={{ title: '' }} />
      <Stack.Screen name="WaterSaverCategories" component={WaterSaverCategories} options={{ title: '' }} />
      <Stack.Screen name="WaterSaverComments" component={WaterComments} options={{ title: '' }} />
    </Stack.Navigator>

  );
}

// fuel saver
const Fuel = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="FuelSaverDashBoard" component={FuelSaverDashBoard} options={{ title: '' }} />
      <Stack.Screen name="FuelSavingTips" component={FuelSavingTips} options={{ title: '' }} />
      <Stack.Screen name="FuelCostCalculator" component={FuelCostCalculator} options={{ title: '' }} />
      <Stack.Screen name="FuelEfficiencyCalculator" component={FuelEfficiencyCalculator} options={{ title: '' }} />
      <Stack.Screen name="FuelTipView" component={FuelTipView} options={{ title: '' }} />
      <Stack.Screen name="UpdateFuelComent" component={UpdateFuelComent} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

//food saver
const Food = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="FoodSaverDashboard" component={FoodSaverDashboard} options={{ title: '' }} />
      <Stack.Screen name="AddFoodSavingTips" component={AddFoodWasteReducingTips} options={{ title: '' }} />
      <Stack.Screen name="FoodSavingTips" component={FoodSavingTipsView} options={{ title: '' }} />
      {/* <Stack.Screen name="AddCommentForFoodSavingTips" component={AddCommentForFoodTips} options={{ title: '' }} /> */}
      <Stack.Screen name="ViewReviewsInFoodSavingTips" component={ViewReviewForFoodTips} options={{ title: '' }} />
      <Stack.Screen name="UpdateFoodTip" component={UpdateFoodTip} options={{ title: '' }} />
      <Stack.Screen name="ViewTipsOneByOne" component={FoodTipViewOneByOne} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

//Home
const MainHome = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <>
      <NavigationContainer>

        <Bottom.Navigator>

          <Bottom.Screen
            name="Electricity"
            component={Electricity}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => (
                <View>
                  <Image source={require('./src/navigation/electricIcon.png')}
                    style={{ tintColor: focused ? '#FA8072' : 'black' }}
                  />
                </View>
              ),
              headerTitleAlign: "center",

              //headr title
              // headerTitle: "",
              headerTintColor: "black",
              headerShown: false,
              tabBarStyle: { height: 60 },
              tabBarHideOnKeyboard: true
            }}
          />

          <Bottom.Screen
            name="Water"
            component={Water}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => (
                <View>
                  <Image source={require('./src/navigation/waterIcon.png')}
                    style={{ tintColor: focused ? '#52B1E2' : 'black' }}
                  />
                </View>
              ),
              headerTitleAlign: "center",
              //headr title
              // headerTitle: "",
              headerTintColor: "black",
              headerShown: false,
              tabBarStyle: { height: 60 },
              tabBarHideOnKeyboard: true
            }}
          />
          <Bottom.Screen

            name="MainHome"
            initialRouteName="MainHome"
            component={MainHome}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => (
                <View>
                  <Image source={require('./src/navigation/homeIcon.png')}
                    style={{ tintColor: focused ? '#CF8D2A' : 'black' }}
                  />
                </View>
              ),
              headerTitleAlign: "center",
              //headr title
              // headerTitle: "",
              headerTintColor: "black",
              headerShown: false,
              tabBarStyle: { height: 60 },
              tabBarHideOnKeyboard: true
            }}

          />
          <Bottom.Screen
            name="Fuel"
            component={Fuel}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => (
                <View>
                  <Image source={require('./src/navigation/fuelIcon.png')}
                    style={{ tintColor: focused ? '#26B787' : 'black' }}
                  />
                </View>
              ),
              headerTitleAlign: "center",
              //headr title
              // headerTitle: "",
              headerTintColor: "black",
              headerShown: false,
              tabBarStyle: { height: 60 },
              tabBarHideOnKeyboard: true
            }}
          />

          <Bottom.Screen

            name="Food"
            component={Food}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => (
                <View>
                  <Image source={require('./src/navigation/foodIcon.png')}
                    style={{ tintColor: focused ? '#FFC107' : 'black' }}
                  />
                </View>
              ),
              headerTitleAlign: "center",
              //headr title
              // headerTitle: "",
              headerTintColor: "black",
              headerShown: false,
              tabBarStyle: { height: 60 },
              tabBarHideOnKeyboard: true
            }}
          />

        </Bottom.Navigator>

      </NavigationContainer>
    </>
  );
};

export default App;
