import * as React from 'react';
import { StyleSheet } from 'react-native';
import Home from '../TabScreens/Home';
import News from '../TabScreens/Discover';
import Profile from '../TabScreens/Profile';
import CryptoAssets from '../TabScreens/CryptoAssets';
import Colors from '../assets/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={(route) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.violet,
        unmountOnBlur: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="CryptoAssets"
        component={CryptoAssets}
        options={{
          tabBarLabel: 'CryptoAssets',
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="chart" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="message" color={color} size={23} />
          ),
        }} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 45,
    paddingHorizontal: 5,
    paddingTop: 0,
    position: 'absolute',
    borderTopWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})
export default TabNavigator;
