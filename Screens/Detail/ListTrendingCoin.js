import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Colors from '../../assets/Colors';
import ListCoinInHomeInLoading from './ListCoinInHomeInLoading';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getMarketData } from '../../services/cryptoService'


const ListTrendingCoin = ({ id, name, logoUrl, navigation, symbol, rank }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('DetailCoin', { id })}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Image source={{ uri: logoUrl }} style={styles.image}></Image>
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.nameWrapper}>
                        <Text style={styles.name}>{name}</Text>
                    </View>
                    <View style={styles.symbolRankWrapper}>
                        <Text style={styles.symbol}>{symbol}</Text>
                        <View style={styles.rankWrapper}>
                            <Text style={styles.rank}>#{rank}</Text>
                        </View>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        marginLeft: 16,
        marginTop: 12,
        height: 120,
        width: 140,
        backgroundColor: Colors.indigo,
        borderRadius: 15,
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
    },
    footerContainer: {
        marginTop: 10,
        alignItems: 'center',

    },
    name: {
        fontSize: 20,
        color: Colors.white,
        textAlign: 'center',
    },
    image: {
        height: 35,
        width: 35,
        borderRadius: 45,
    },
    symbolRankWrapper: {
        marginTop: 3,
        flexDirection: "row",
    },
    symbol: {
        fontWeight: 'bold',
        color: Colors.darkGray,
        marginRight: 5,
        fontSize: 12,
    },
    rankWrapper: {
        backgroundColor: Colors.darkSlateGray,
        borderRadius: 5,
        alignItems: 'center',
    },
    rank: {
        marginHorizontal: 5,
        color: Colors.darkGray,
        fontSize: 12,
    },
    nameWrapper: {
        alignItems: 'center',
    },
})

export default ListTrendingCoin;