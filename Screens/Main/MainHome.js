import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, FlatList, SafeAreaView  } from 'react-native';
import Colors from '../../assets/Colors'
import Feather from 'react-native-vector-icons/Feather';
import ListCoinInHome from '../Detail/ListCoinInHome';
import { getMarketData } from '../../services/cryptoService'
const win = Dimensions.get('window');    

const Header = () => (
    <>
        <SafeAreaView>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>CoinMarketCap</Text>
                    <View style={styles.leftHeaderWrapper}>
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            style={styles.buttonHeader}
                            >
                            <Feather name= 'search' color={Colors.darkGray} size={25}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.buttonHeader}
                            >
                                <Feather name= 'bell' color={Colors.darkGray} size={25}/>
                        </TouchableOpacity>
                    </View>
                </View> 
                <View style={styles.bottomHeader}>
                    <Text style={styles.textBottomHeader}></Text>
                </View>
            </SafeAreaView>
    </>
)

export default function MainHome({navigation}) {
    const [data,setData] = useState([]);
    const [trendingData,setTrendingData] = useState([]);
    useEffect(() => {
      const fetchMarketData = async () => {
        const marketData = await getMarketData('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d');
        const dataTrending = await getMarketData('https://api.coingecko.com/api/v3/search/trending');
        setData(marketData);
        setTrendingData(dataTrending.coins);
      }
      fetchMarketData();
    }, []);
    return (
        <>
        <Header/>
        <ScrollView>
            {/* /////// */}
            <View style={styles.bodyContainer}>
                <View style={styles.headerBodyWrapper}>
                    <Text style={styles.titleLeftBody}>Top Coins</Text>
                    <TouchableOpacity 
                        activeOpacity={0.5}
                        style={styles.buttonRightBody}
                        >
                        <Text style={styles.titleRightBody}>See all</Text>
                    </TouchableOpacity>
                </View>
                <FlatList 
                    keyExtractor={(item) => item.id}
                    data={data}
                    renderItem={({item}) => (
                        <ListCoinInHome
                            name={item.name}
                            symbol={item.symbol}  
                            currentPrice={item.current_price}
                            priceChangePersentage7d={item.price_change_percentage_7d_in_currency}
                            logoUrl={item.image}
                            market_cap = {item.market_cap}
                            marketCapRank = {item.market_cap_rank}
                            navigation = {navigation}
                            sparkLine = {item.sparkline_in_7d}
                            route = {item}
                        />
                      )}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    />
                </View>
        </ScrollView> 
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    bodyContainer: {
        marginTop: 5,
    },
    headerText: {
        fontSize: 24,
        color: Colors.white,
    },
    leftHeaderWrapper: {
        flexDirection: "row",
    },
    buttonHeader: {
        marginRight: 10,
    },
    bottomHeader: {
        width: win.width,
        height: 45,
        marginTop: 10,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: Colors.violet,
        alignItems: "center",
    },
    textBottomHeader: {
        fontSize: 15,
        marginTop: 15,
    },
    headerBodyWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 25,
        marginTop: 15,
    },
    titleLeftBody: {
        fontSize: 24,
        color: Colors.white,
    },
    titleRightBody: {
        fontSize: 20,
        color: Colors.indigo,
    },
})