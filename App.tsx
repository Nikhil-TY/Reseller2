import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from './SplashScreen';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import OrdersPage from './OrdersPage';
import ProfilePage from './Profile.js';
import PlaceOrders from './PlaceOrders.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AppRegistry, View, TouchableOpacity, Text, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyAe_Hxn3bW3tSYV2FUlOu24Oq_7WUQAldI",
  authDomain: "reseller-c6a78.firebaseapp.com",
  projectId: "reseller-c6a78",
  storageBucket: "reseller-c6a78.appspot.com",
  messagingSenderId: "753532863139",
  appId: "1:753532863139:web:c6a5e3e9cd37736d84f516",
  measurementId: "G-LMKGCX7VXC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Drawer = createDrawerNavigator();

const SidebarContainer = styled.ScrollView`
  background-color: #ffff;
  padding: 10px;
`;

const CloseButton = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 6px;
  background-color: white;
  margin-left: -5px;
`;

const StyledFontAwesome = styled(FontAwesome)`
  margin-left: 10px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  
`;

const MenuItemText = styled.Text`
  font-size: 18px;
  color: black;
  margin-left: 10px;
`;

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for the splash screen
    setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Adjust the duration as needed
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={({ navigation }) => (
          <View style={{ height: '100%' }}>
            <SidebarContainer>
              <CloseButton onPress={() => navigation.closeDrawer()}>
                <View style={{ flexDirection: 'row' }}>
                  <StyledFontAwesome name="arrow-left" size={24} color="#005DA9" />
                </View>
              </CloseButton>
              <MenuItem onPress={() => navigation.navigate('PlaceOrders')}>
                <StyledFontAwesome name="plus" size={24} color="#005DA9" />
                <MenuItemText>Place an Order</MenuItemText>
              </MenuItem>
           
              <MenuItem onPress={() => navigation.navigate('Home')}>
                <StyledFontAwesome name="home" size={24} color="#005DA9" />
                <MenuItemText>Home</MenuItemText>
              </MenuItem>

              <MenuItem onPress={() => navigation.navigate('Orders')}>
                <StyledFontAwesome name="shopping-cart" size={24} color="#005DA9" />
                <MenuItemText>Orders</MenuItemText>
              </MenuItem>

              <MenuItem onPress={() => navigation.navigate('Profile')}>
                <StyledFontAwesome name="user" size={24} color="#005DA9" />
                <MenuItemText>Profile</MenuItemText>
              </MenuItem>

             <MenuItem
                onPress={() => {
                  firebase
                    .auth()
                    .signOut()
                    .then(async () => {
                      await AsyncStorage.clear();
                      Alert.alert('Logout Successful', 'You have been logged out successfully.');
                      navigation.navigate('Login');
                    })
                    .catch((error) => {
                      Alert.alert('Logout Error', `An error occurred while logging out: ${error}`);
                    });
                }}
              >
                <StyledFontAwesome name="sign-out" size={24} color="#005DA9" />
                <MenuItemText>Logout</MenuItemText>
              </MenuItem>
            </SidebarContainer>
          </View>
        )}
      >
        <Drawer.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Signup"
          component={SignupPage}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            headerTitleStyle: {
              color: '#005DA9',
            },
            headerTintColor: '#005DA9',
          }}
        />
        <Drawer.Screen
          name="Home"
          component={HomePage}
          options={({ navigation }) => ({
            headerTitleStyle: {
              color: '#005DA9',
              fontWeight: 'bold',
              fontSize: 30,
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <StyledFontAwesome
                name="bars"
                size={24}
                color="#005DA9"
                onPress={() => navigation.openDrawer()}
              />
            ),
          })}
        />
        <Drawer.Screen
          name="Orders"
          component={OrdersPage}
          options={{
            headerTitleStyle: {
              color: '#005DA9',
            },
            headerTintColor: '#005DA9',
          }}
        />
        <Drawer.Screen
          name="PlaceOrders"
          component={PlaceOrders}
          options={{
            title: 'Place an Order',
            headerTitleStyle: {
              color: '#005DA9',
            },
            headerTintColor: '#005DA9',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;