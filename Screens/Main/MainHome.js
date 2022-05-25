import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, FlatList, SafeAreaView } from 'react-native';
import Colors from '../../assets/Colors'
import Feather from 'react-native-vector-icons/Feather';
import ListCoinInHome from '../Detail/ListCoinInHome';
import ListCoinInHomeInLoading from '../Detail/ListCoinInHomeInLoading';
import { getMarketData } from '../../services/cryptoService';
import TrendingCoin from '../Detail/TrendingCoins';
import { GetApi } from '../../services/GetApi';
import News from '../../components/News'
const win = Dimensions.get('window');

export default function MainHome({ navigation }) {
    const [marketData, setMarketData] = useState([]);
    const [trendingData, setTrendingData] = useState([]);
    const [globalData, setGlobalData] = useState([]);
    const [newsData, setNewsData] = useState([]);

    const [isLoadingData, setIsLoadingData] = useState(true);


    const GetData = () => {
        const fetchData = async () => {
            const market = await getMarketData('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d');
            const trending = await getMarketData('https://api.coingecko.com/api/v3/search/trending');
            const global = await getMarketData('https://api.coingecko.com/api/v3/global');
            const dataNews = await GetApi();
            setMarketData(market);
            setTrendingData(trending.coins);
            setGlobalData(global.data);
            setNewsData(dataNews);
            setIsLoadingData(false);
        }
        fetchData();
    }
    useEffect(() => {
        GetData();
    }, []);
    const Header = () => (
        <>
            <SafeAreaView>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>CoinMarketCap</Text>
                    <View style={styles.leftHeaderWrapper}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.buttonHeader}
                            onPress={() => navigation.navigate('Search')}

                        >
                            <Feather name='search' color={Colors.darkGray} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.buttonHeader}
                        >
                            <Feather name='bell' color={Colors.darkGray} size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomHeaderWrapper}>
                    {isLoadingData ?
                        null :
                        <Text style={styles.textBottomHeader}>Coins Active: {globalData.active_cryptocurrencies.toLocaleString("en-US", { currency: "USD" })}</Text>

                    }
                </View>
            </SafeAreaView>
        </>
    )
    const ListCoinInLoading = ({ title }) => (
        <>
            <View style={styles.headerBodyWrapper}>
                <Text style={styles.titleLeftBody}>{title}</Text>
                <View style={styles.buttonRightBody}>
                    <Text style={styles.titleRightBody}>See all</Text>
                </View>
            </View>
            <View style={styles.listCoinLoading}>
                <ListCoinInHomeInLoading />
                <ListCoinInHomeInLoading />
                <ListCoinInHomeInLoading />
            </View>
        </>
    )
    const ListCoin = ({ data, title }) => (
        <>
            <View style={styles.bodyContainer}>
                <View style={styles.headerBodyWrapper}>
                    <Text style={styles.titleLeftBody}>{title}</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonRightBody}
                        onPress={() => navigation.jumpTo('CryptoAssets')}
                    >
                        <Text style={styles.titleRightBody}>See all</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={data}
                    renderItem={({ item }) => (
                        <ListCoinInHome
                            id={item.id}
                            name={item.name}
                            currentPrice={item.current_price}
                            priceChangePersentage7d={item.price_change_percentage_7d_in_currency}
                            logoUrl={item.image}
                            navigation={navigation}
                            route={item}
                        />
                    )}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </>
    )

    const ListCoinWrapper = ({ title, data }) => {
        return (
            <>
                {isLoadingData ?
                    <ListCoinInLoading
                        title={title}
                    /> :
                    <ListCoin
                        data={data}
                        title={title}
                    />
                }
            </>
        )
    }

    const ListTrendingCoin = () => {
        return (
            <>
                {
                    isLoadingData ?
                        null :
                        <View style={styles.bodyContainer}>
                            <View style={styles.headerBodyWrapper}>
                                <Text style={styles.titleLeftBody}>Trending</Text>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={styles.buttonRightBody}
                                    onPress={() => navigation.jumpTo('CryptoAssets')}
                                >
                                    <Text style={styles.titleRightBody}>See all</Text>
                                </TouchableOpacity>
                            </View>
                            <TrendingCoin
                                navigation={navigation}
                            />
                        </View>}

            </>
        )
    }
    const ListNews = () => {
        var news = [];
        if (isLoadingData == false) {
            for (let i = 0; i < newsData.length; i++) {
                news.push(
                    <News
                        key={i}
                        data={newsData[i]}
                    />
                )
            }
        }
        return (
            <>
                <View style={styles.headerBodyWrapper}>
                    <Text style={styles.titleLeftBody}>News</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonRightBody}
                        onPress={() => navigation.jumpTo('News')}
                    >
                        <Text style={styles.titleRightBody}>See all</Text>
                    </TouchableOpacity>
                </View>
                {news}
            </>
        )
    }
    return (
        <>
            <Header
                globalData={globalData}
                isLoading={isLoadingData}
            />
            <ScrollView>
                <ListCoinWrapper
                    title='Top Coins'
                    data={marketData}
                />
                <ListTrendingCoin />
                <ListNews />
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
    bottomHeaderWrapper: {
        width: win.width,
        height: 45,
        marginTop: 10,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: Colors.violet,
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: "row",

    },
    bottomHeader: {

    },
    textBottomHeader: {
        fontSize: 15,
        color: Colors.white,
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
    listCoinLoading: {
        flexDirection: "row",
    },
})