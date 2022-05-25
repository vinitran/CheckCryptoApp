import * as React from 'react';
import { Text, View } from 'react-native';
import MainProfile from '../Screens/Main/MainProfile';
import DetailCoin from '../Screens/Detail/CoinDetail';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const Profile = () => {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="MainProfile" component={MainProfile} />
            <Stack.Screen name="DetailCoin" component={DetailCoin} />
        </Stack.Navigator>
    );
};
export default Profile;