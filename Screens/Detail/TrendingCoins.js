import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    ScrollView
} from 'react-native';
import Colors from '../../assets/Colors'
import { getMarketData } from '../../services/cryptoService'
import ListTrendingCoin from './ListTrendingCoin';
const TrendingCoin = ({navigation}) => {
    const [data, setData] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const GetData = () => {
        const fetchData = async () => {
            const trending = await getMarketData('https://api.coingecko.com/api/v3/search/trending');
            setData(trending.coins);
            setIsLoadingData(false);
        }
        fetchData();
    }
    useEffect(() => {
        GetData();
    }, []);
    var trending = [];
    if (isLoadingData == false) {
        for (let i = 0; i < data.length; i++) {
            trending.push(
                <ListTrendingCoin
                    key={data[i].item.id}
                    id={data[i].item.id}
                    logoUrl={data[i].item.large}
                    name={data[i].item.name}
                    symbol={data[i].item.symbol}
                    rank={data[i].item.market_cap_rank}
                    navigation={navigation}
                />
            )
        }
    }
    return (
        <>
            <ScrollView
                style={styles.trendingCoin}
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {trending}
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: "row",
        paddingHorizontal: 10,
        marginTop: 10,
    },
    trendingCoin: {
        flexDirection: "row",
    },
});
export default TrendingCoin;