import React, { useEffect, useState } from 'react';
import {  StyleSheet, 
          Text, 
          View, 
          FlatList, 
          SafeAreaView, 
          RefreshControl,
          Dimensions } from 'react-native';
import ListCoin from '../Detail/ListCoinInCryptoAssets';
import Colors from '../../assets/Colors';
import { getMarketData } from '../../services/cryptoService'
import * as Progress from 'react-native-progress';
const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle}>News</Text>        
    </View>
    <View style={styles.divider} />
  </>
)
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function MainNews() {
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
  const ListNewsInLoading = () => (
    <View style={styles.itemWrapperInLoading}>
      <View style={styles.leftWrapperInLoading}>
        <View style={styles.titleWrapperInLoading}>
          <View style={styles.titleInLoading}></View>
          <View style={styles.rightDownWrapperInLoading}></View>
        </View>
      </View>
      <View style={styles.rightWrapperInLoading}>
        <View style={styles.rightDownWrapperInLoading}></View>
      </View>
    </View>
  )
  return (
      <SafeAreaView style={styles.container}>
        <ListHeader/>
        <ListNewsInLoading/>
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
    width: 150,
    height: 50,
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
  