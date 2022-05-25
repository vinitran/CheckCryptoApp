import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigators/TabNavigator'
import Colors from './assets/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
const Stack = createStackNavigator();

const MyTheme = {
  dark: true,
  colors: {
    primary: Colors.white,
    background: Colors.black,
    card: Colors.darkSlateGray,
    text: Colors.white,
    border: Colors.white,
    notification: Colors.white,
  },
};
export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({

})