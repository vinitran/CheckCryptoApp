import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Colors from '../assets/Colors';
import { Linking } from "react-native";
const News = ({ data }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.wrapper}
            onPress={() => Linking.openURL(data.url)}
        >
            <View style={styles.itemWrapper}>
                <Text style={styles.title}>{data.title}</Text>
                <View style={styles.dateWrapper}>
                    <Text style={styles.date}>{data.date}</Text>
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
        marginHorizontal:16,
        marginTop:10
    },
    itemWrapper: {
        paddingHorizontal: 16,
        marginTop: 10,
        height: 80,
        justifyContent: 'space-around',
    },
    title: {
        marginTop: 4,
        fontSize: 16,
        color: Colors.white,
    },
    date: {
        marginTop: 4,
        fontSize: 13,
        color: Colors.darkGray,


    },
    dateWrapper: {
        alignItems: 'center',
    },

    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.slateGray,
        paddingHorizontal: 30,
        marginTop: 10,
    },
})

export default News;