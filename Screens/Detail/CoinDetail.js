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
} from 'react-native';
import Colors from '../../assets/Colors'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import { LineChart } from 'react-native-wagmi-charts';r
import { LineChart } from 'react-native-chart-kit'
import { getMarketData } from '../../services/cryptoService'
import { GetApi } from '../../services/GetApi';
import News from '../../components/News'

const ListHeader = ({ symbol, logoUrl, marketCapRank, navigation }) => (
  <>
    <SafeAreaView style={styles.headerWrapper}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.backButtonWrapper}
        onPress={() => { navigation.goBack() }}
      >
        <Ionicons name='chevron-back-outline' style={styles.backButton} color={Colors.white} size={30} />
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Image source={{ uri: logoUrl }} style={styles.image}></Image>
        <Text style={styles.largeTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.marketCapRankWrapper}>
          <Text style={styles.marketCapRank}>#{marketCapRank}</Text>
        </View>
      </View>
      <View style={styles.rightHeaderWrapper}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonHeader}
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
    </SafeAreaView>
    <View style={styles.divider} />
  </>
)
const ListNews = ({ isLoadingData, newsData, navigation }) => {
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
export default function DetailCoin({ route, navigation }) {
  const [data, setData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [priceChangeColor,setPriceChangeColor] = useState('');
  const [priceChangePersentage7dIcon,setPriceChangePersentage7dIcon] = useState('');
  const GetData = () => {
    const fetchData = async () => {
      const url = "https://api.coingecko.com/api/v3/coins/" + route.params.id + "?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true";
      const dataCoin = await getMarketData(url);
      const dataNews = await GetApi();
      setNewsData(dataNews);
      setData(dataCoin);
      setIsLoadingData(false);
      setPriceChangeColor(data.priceChangePersentage7d > 0 ? Colors.green : Colors.red);
      setPriceChangePersentage7dIcon(data.priceChangePersentage7d > 0 ? 'caretup' : 'caretdown');
    }
    fetchData();
  }
  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      {
        isLoadingData ? null :
          <SafeAreaView
            style={styles.container}
          >
            <ListHeader
              symbol={data.symbol}
              logoUrl={data.image.large}
              marketCapRank={data.market_cap_rank}
              navigation={navigation}
            />
            <ScrollView>

              <View style={styles.menuWrapper}>
                <Text style={styles.name}>{data.name.toUpperCase()}</Text>
                <View style={styles.priceAndPersentChangeWrapper}>
                  <Text style={styles.currentPrice}>${Number(data.market_data.current_price.usd).toLocaleString("en-US", { currency: "USD" })}</Text>
                  <View style={[styles.persentChangeWrapper, { backgroundColor: priceChangeColor }]}>
                    <View style={[{ flexDirection: "row", }]}>
                      <View style={[{ justifyContent: 'center', }]}>
                        <AntDesign name={priceChangePersentage7dIcon} style={[styles.changPersentIcon]} color={Colors.white} size={10} />
                      </View>
                      <Text style={styles.persentChange}>{Math.abs(Number(data.market_data.price_change_percentage_7d).toFixed(2))}%</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.marketCap} >Market Cap ${data.market_data.market_cap.usd.toLocaleString("en-US", { currency: "USD" })}</Text>
              </View>
              <View style={styles.chart}>
                <LineChart
                  data={
                    {
                      datasets: [
                        {
                          data: data.market_data.sparkline_7d.price,
                          strokeWidth: 2, // optional
                        },
                      ],
                    }
                  }
                  width={Dimensions.get('window').width - 32} // from react-native
                  height={300}
                  yAxisLabel={'$'}
                  chartConfig={{
                    backgroundColor: priceChangeColor,
                    backgroundGradientFrom: Colors.black,
                    backgroundGradientTo: Colors.black,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => priceChangeColor,
                    style: {
                      borderRadius: 16,
                    }
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    marginTop: 16,
                  }}
                  withVerticalLabels={false}
                  withHorizontalLabels={true}
                  withVerticalLines={false}
                  withDots={false}
                />
              </View>
              <ListNews
                isLoadingData={isLoadingData}
                newsData={newsData}
                navigation={navigation} />
            </ScrollView>
          </SafeAreaView>
      }
    </>
  );
}
const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  backButtonWrapper: {
    flex: 1,
  },
  backButton: {
    flexDirection: "row",
  },
  wrapper: {
    color: Colors.white,
  },
  menuWrapper: {
    paddingHorizontal: 16,
    marginTop: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.white,
  },
  currentPrice: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.white,
  },
  priceAndPersentChangeWrapper: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 4,
  },
  changPersentIcon: {
    marginLeft: 4,
  },
  marketCap: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  persentChangeWrapper: {
    borderRadius: 10,
    justifyContent: 'center',
    color: Colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  persentChange: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 5,


  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'center',
  },
  rightHeaderWrapper: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  largeTitle: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.darkSlateGray,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  buttonHeader: {
    marginRight: 10,
  },
  image: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: Colors.indigo,
  },
  marketCapRankWrapper: {
    backgroundColor: '#323232',
    borderRadius: 5,
    marginRight: 5,
  },
  marketCapRank: {
    fontSize: 15,
    color: Colors.white,
  },
  chart: {
    paddingHorizontal: 16,
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
});
