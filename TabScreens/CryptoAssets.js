import * as React from 'react';
import CryptoAssets from '../Screens/Main/MainCryptoAssets'
import ListCoinScreen from '../Screens/Detail/CoinDetail'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Discover = () => {
    return (
    <Stack.Navigator 
        screenOptions={() => ({
            headerShown: false,
        })}
      >
        <Stack.Screen name="Main" component={CryptoAssets} />
        <Stack.Screen name="Details" component={ListCoinScreen} />
    </Stack.Navigator>
  );
};
export default Discover;