import React from 'react';
import { View, 
        Text, 
        StyleSheet, 
        TouchableOpacity, 
        Image} from 'react-native';
import Colors from '../../assets/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ListCoin = ({name, symbol, sparkLine, currentPrice, priceChangePersentage7d, logoUrl, navigation, marketCapRank, market_cap}) => {
    const priceChangeColor = priceChangePersentage7d > 0 ? Colors.green : Colors.red;
    const priceChangePersentage7dIcon = priceChangePersentage7d > 0 ? 'caretup' : 'caretdown';
    return (
    <TouchableOpacity 
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Details',{
            name,
            symbol,
            currentPrice,
            priceChangePersentage7d,
            logoUrl,
            marketCapRank,
            market_cap,
            sparkLine,
        })}
        >
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={{uri: logoUrl}} style={styles.image}></Image>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>{currentPrice.toLocaleString("en-US",{currency: "USD"})} US$</Text>
                <View style={styles.changePercent}>
                    <AntDesign name= {priceChangePersentage7dIcon} color={priceChangeColor} size={8} style={styles.priceChangePersentIcon}/>
                    <Text style={[styles.changPersentText, {color: priceChangeColor}]}>{Math.abs(priceChangePersentage7d.toFixed(2))} %</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginTop: 12,
        height: 130,
        width: 150,
        backgroundColor: Colors.indigo,
        borderRadius: 25,
        borderColor:Colors.white,
    },
    headerContainer: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 10,
    },
    bodyContainer: {
        fontSize: 20,
        marginTop: 6,
        marginLeft: 20,
    },
    name: {
        fontSize: 15,
        color: Colors.white,
    },
    price: {
        fontSize: 16,
        marginTop: 4,
        color: Colors.darkGray,
    },
    image: {
        height: 35,
        width: 35,
        borderRadius: 45,
    },
    changePercent: {
        flexDirection: "row",
    },
    changPersentText: {
        marginLeft: 4,
        fontSize: 14,
        marginTop: 4,
        color: Colors.white,
    },
    priceChangePersentIcon: {
        marginTop: 9,
    },
})

export default ListCoin;