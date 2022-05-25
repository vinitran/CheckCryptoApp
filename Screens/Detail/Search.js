import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';
import Colors from '../../assets/Colors'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getMarketData } from '../../services/cryptoService'
import TrendingCoin from './TrendingCoins';
import ResultSearch from '../../components/ResultSearch';

export default function Search({ navigation }) {
    const [searchData, setSearchData] = useState([]);
    const [searchCoin, setSearchCoin] = useState('btc');
    const [isLoadingData, setIsLoadingData] = useState(true);
    const getData = () => {
        const fetchData = async () => {
            const url = "https://api.coingecko.com/api/v3/search?query=" + searchCoin;
            const search = await getMarketData(url);
            setSearchData(search.coins);
            setIsLoadingData(false);
        }
        fetchData();
    }
    var displaySearch = [];
    if (isLoadingData == false) {
        for (let i = 0; i < searchData.length; i++) {
            displaySearch.push(
                <ResultSearch
                    key={searchData[i].id}
                    data={searchData[i]}
                    navigation={navigation}
                />
            )
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.headerWrapper}>
                <TextInput
                    style={styles.inputButton}
                    placeholder="Search Coins ..."
                    placeholderTextColor={Colors.darkGray}
                    onChangeText={text => {
                        setSearchCoin(text);
                        if (text == '') {
                            setIsLoadingData(true);
                        } else {
                            getData();
                        }
                    }}
                />
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => { navigation.goBack() }}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            {isLoadingData ?
                <View style={styles.bodyWrapper}>
                    <Text style={styles.titleRightBody}>Trending</Text>
                    <TrendingCoin
                        navigation={navigation}
                    />
                </View> :
                <ScrollView>
                    {displaySearch}
                </ScrollView>
            }

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    headerWrapper: {
        paddingHorizontal: 16,
        color: Colors.white,
        flexDirection: "row",
        marginTop: 15,
    },
    inputButton: {
        paddingHorizontal: 30,
        backgroundColor: Colors.darkSlateGray,
        height: 45,
        borderRadius: 15,
        justifyContent: 'center',
        flex: 3,
        color: Colors.white,
    },
    inputText: {
        fontSize: 16,
        color: Colors.white,
    },
    cancelButton: {
        height: 45,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    cancelText: {
        fontSize: 16,
        color: Colors.violet,
        textDecorationLine: 'underline',
    },
    bodyWrapper: {
        marginTop: 15,
    },
    titleRightBody: {
        fontSize: 24,
        color: Colors.white,
        paddingHorizontal: 16,
    },

});
