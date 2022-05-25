import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Colors from '../../assets/Colors';

const ListCoinInLoading = () => {
    return (
        <View style={styles.itemWrapper}>
            <View style={styles.leftWrapper}>
                <View style={styles.logo}></View>
                <View style={styles.titleWrapper}>
                    <View style={styles.title}></View>
                    <View style={styles.rightDownWrapper}></View>
                </View>
            </View>
            <View style={styles.rightWrapper}>
                <View style={styles.title}></View>
                <View style={styles.rightDownWrapper}></View>
            </View>
        </View>
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
    leftWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        height: 32,
        width: 32,
        borderRadius: 16,
        backgroundColor: Colors.darkSlateGray,
    },
    titleWrapper: {
        marginLeft: 8,
    },
    title: {
        width: 100,
        height: 17,
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: Colors.darkSlateGray,
    },
    rightDownWrapper: {
        width: 100,
        height: 17,
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: Colors.darkSlateGray,
    },
    rightWrapper: {
        alignItems: "flex-end",

    },
    titleWrapper: {
        marginTop: 10,
        paddingHorizontal: 16,
    },
})

export default ListCoinInLoading;