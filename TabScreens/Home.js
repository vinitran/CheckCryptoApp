import * as React from 'react';
import { Text, View } from 'react-native';
import MainHome from '../Screens/Main/MainHome';
import DetailCoin from '../Screens/Detail/CoinDetail';
import Search from '../Screens/Detail/Search';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Home = () => {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="MainHome" component={MainHome} />
            <Stack.Screen name="DetailCoin" component={DetailCoin} />
            <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
    );
};
export default Home;