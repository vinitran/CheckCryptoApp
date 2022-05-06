import React from 'react';
import { View, 
        Text, 
        StyleSheet, 
        TouchableOpacity, 
        Image,
        Dimensions} from 'react-native';
import Colors from '../../assets/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LineChart} from 'react-native-chart-kit';

const ListCoin = ({name, symbol, sparkLine, currentPrice, priceChangePersentage7d, logoUrl, navigation, route, marketCapRank, market_cap}) => {
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
            priceChangeColor,
            priceChangePersentage7dIcon,
            market_cap,
            sparkLine,
        })}
        >
        <View style={styles.itemWrapper}>
            <View style={styles.leftWrapper}>
                <Image source={{uri: logoUrl}} style={styles.image}></Image>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.rightDownWrapper}>
                        <View style={styles.marketCapRankWrapper}>
                            <Text style={styles.marketCapRank}>{marketCapRank}</Text>    
                        </View>
                        <Text style={[styles.subtitle, {marginRight: 7}]}>{symbol.toUpperCase()}</Text>
                        <View style={[{marginTop: 5}]}>
                            <AntDesign name= {priceChangePersentage7dIcon} color={priceChangeColor} size={10}/>
                        </View>
                        <Text style={[styles.subtitle, {color: priceChangeColor, marginLeft: 5}]}>{Math.abs(priceChangePersentage7d.toFixed(2))} %</Text>
                    </View>
                </View>
            </View>
            <View style={styles.rightWrapper}>
                <Text style={styles.title}>${currentPrice.toLocaleString("en-US",{currency: "USD"})}</Text>
                <Text style={styles.subtitle} >Market Cap ${market_cap.toLocaleString("en-US",{currency: "USD"})}</Text>
            </View>
        </View>
        <View style={styles.divider} />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    itemWrapper: {
        paddingHorizontal: 16,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#000000",
    },
    rightDownWrapper: {
        marginRight: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    leftWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    rightWrapper: {
        alignItems: "flex-end",
    },
    titleWrapper:{
        marginLeft: 8,
    },
    image: {
        height: 32,
        width: 32,
        borderRadius: 16,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 17,
        marginTop: 4,
        fontSize: 16,
        color: Colors.white,
    },

    subtitle: {
        marginTop: 4,
        fontSize: 11,
        color: Colors.darkGray,
    },
    marketCapRankWrapper: {  
        backgroundColor: Colors.slateGray,
        borderRadius: 5,
        marginRight: 5,
    },
    marketCapRank: {
        fontSize: 12,
        color: Colors.white,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.slateGray,
        paddingHorizontal: 30,
        marginTop: 10,
      },
})

export default ListCoin;