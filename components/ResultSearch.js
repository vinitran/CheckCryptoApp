import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Colors from '../assets/Colors';
import { Linking } from "react-native";
const ResultSearch = ({ data, navigation }) => {
    const id = data.id;
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.wrapper}
            onPress={() => navigation.navigate('DetailCoin', { id })}
        >
            <View style={styles.itemWrapper}>
                <Image source={{ uri: data.large }} style={styles.image}></Image>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{data.name}</Text>
                    <View style={styles.marketCapRankWrapper}>
                        <Text style={styles.marketCapRank}>#{data.market_cap_rank}</Text>
                    </View>
                </View>
                <View style={styles.symbolWrapper}>
                    <Text style={styles.symbol}>{data.symbol}</Text>
                </View>
            </View>
            <View style={styles.divider} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.indigo,
        borderRadius: 15,
        marginHorizontal: 16,
        marginTop: 10
    },
    itemWrapper: {
        paddingHorizontal: 16,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleWrapper: {
        alignItems: "center",
    },
    title: {
        marginTop: 4,
        fontSize: 16,
        color: Colors.white,
    },
    symbol: {
        marginTop: 4,
        fontSize: 15,
        color: Colors.darkGray,
    },
    symbolWrapper: {
        alignItems: 'center',
    },
    image: {
        height: 25,
        width: 25,
        borderRadius: 25 / 2,
        backgroundColor: Colors.indigo,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.slateGray,
        paddingHorizontal: 30,
        marginTop: 10,
    },
    marketCapRankWrapper: {
        backgroundColor: '#323232',
        borderRadius: 5,
        marginRight: 5,
        alignItems: 'center',
        marginLeft:5
    },
    marketCapRank: {
        fontSize: 16,
        color: Colors.darkGray,
    },
})

export default ResultSearch;