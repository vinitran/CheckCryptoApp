import * as React from 'react';
import { Text, View } from 'react-native';
import MainNews from '../Screens/Main/MainNews';
import MainHome from '../Screens/Main/MainHome';

import DetailCoin from '../Screens/Detail/CoinDetail';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const News = () => {
    return (
        <View>
            <MainNews></MainNews>
        </View>
    );
};
export default News;