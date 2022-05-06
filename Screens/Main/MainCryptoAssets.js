import React, { useEffect, useState } from 'react';
import {  StyleSheet, 
          Text, 
          View, 
          FlatList, 
          SafeAreaView, 
          ActivityIndicator,
          RefreshControl,
          Dimensions } from 'react-native';
import ListCoin from '../Detail/ListCoinInCryptoAssets';
import Colors from '../../assets/Colors';
import { getMarketData } from '../../services/cryptoService'
import * as Progress from 'react-native-progress';
// import {SAMPLE_DATA} from '../../assets/data/sampleData'
const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle}>Markets</Text>        
    </View>
    <View style={styles.divider} />
  </>
)
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function CryptoAssets({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [data,setData] = useState([]);
  const [isLoadingData,setIsLoadingData] = useState(false);
  const getData = () => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d");
      setData(marketData);
    }
    fetchMarketData();
  }
  useEffect(() => {
    getData()
  }, []);

  const onLoading = () => {
    setIsLoadingData(true)    
    getData()
    wait(500).then(() => setIsLoadingData(false));
  }
  const ListCoinInLoading = () => (
    <View style={styles.itemWrapperInLoading}>
      <View style={styles.leftWrapperInLoading}>
        <View style={styles.logoInLoading}></View>
        <View style={styles.titleWrapperInLoading}>
          <View style={styles.titleInLoading}></View>
          <View style={styles.rightDownWrapperInLoading}></View>
        </View>
      </View>
      <View style={styles.rightWrapperInLoading}>
        <View style={styles.titleInLoading}></View>
        <View style={styles.rightDownWrapperInLoading}></View>
      </View>
    </View>
  )
  return (
      <SafeAreaView style={styles.container}>
        <ListHeader/>
        <ListCoinInLoading></ListCoinInLoading>

        {isLoadingData ? 
          <View>
            <Progress.CircleSnail
              color={Colors.white}
              duration={500} 
              style={styles.refreshing}
              />
            <ListCoinInLoading></ListCoinInLoading>
            <ListCoinInLoading></ListCoinInLoading>
            <ListCoinInLoading></ListCoinInLoading>
            <ListCoinInLoading></ListCoinInLoading>
            <ListCoinInLoading></ListCoinInLoading>
            <ListCoinInLoading></ListCoinInLoading>
            <ListCoinInLoading></ListCoinInLoading>
            <ListCoinInLoading></ListCoinInLoading>
            <ListCoinInLoading></ListCoinInLoading>

          </View> : 
          <View>
            <FlatList 
              keyExtractor={(item) => item.id}
              data={data}
              renderItem={({item}) => (
                <ListCoin
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
              refreshControl={
                <RefreshControl
                  refreshing={isLoadingData}
                  onRefresh={onLoading}
                />
              }
            >
            </FlatList>
          </View>}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemWrapperInLoading: {
    paddingHorizontal: 16,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  leftWrapperInLoading: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoInLoading: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: Colors.darkSlateGray,
  },
  titleWrapperInLoading:{
    marginLeft: 8,
  },
  titleInLoading: {
    width: 100,
    height: 17,
    marginTop:5,
    borderRadius:5,
    backgroundColor: Colors.darkSlateGray,
  },
  rightDownWrapperInLoading: {
    width: 100,
    height: 17,
    marginTop:5,
    borderRadius:5,
    backgroundColor: Colors.darkSlateGray,
  },
  rightWrapperInLoading: {
    alignItems: "flex-end",

  },
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    flexDirection: "column",

  },
  titleWrapper: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FEFEFE',
    textAlign: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.darkSlateGray,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  refreshing: {
    width:Dimensions.get('window').width, 
    height: 50,
    marginTop: 30,
    alignItems:'center', 
    justifyContent:'center'
  },
});
  