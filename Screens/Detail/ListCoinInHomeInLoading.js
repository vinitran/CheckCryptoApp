import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Colors from '../../assets/Colors';


const ListCoinInHomeInLoading = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.image}/>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.name} />
                <View style={styles.price} />
            </View>
        </View>
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
        borderColor: Colors.white,
    },
    headerContainer: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 10,
    },
    bodyContainer: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20,
    },
    image: {
        height: 35,
        width: 35,
        borderRadius: 45,
        backgroundColor: Colors.darkSlateGray,
    },
    name: {
        width: 100,
        height: 17,
        backgroundColor: Colors.darkSlateGray,
        borderRadius: 5,
    },
    price: {
        marginTop: 10,
        width: 100,
        height: 17,
        backgroundColor: Colors.darkSlateGray,
        borderRadius: 5,
    },
})

export default ListCoinInHomeInLoading;