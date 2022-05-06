import { StyleSheet, 
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
import {LineChart} from 'react-native-chart-kit'

const ListHeader = ({symbol,logoUrl,marketCapRank,navigation}) => (
  <>
  <SafeAreaView style={styles.headerWrapper}>
    <TouchableOpacity 
      activeOpacity={0.5}
      style={styles.backButtonWrapper} 
      onPress={() => {navigation.goBack()}}
      >
      <Ionicons name='chevron-back-outline' style={styles.backButton} color={Colors.white} size={30}/>
    </TouchableOpacity>
    <View style={styles.titleWrapper}>
      <Image source={{uri: logoUrl}} style={styles.image}></Image>
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
        <Feather name= 'search' color={Colors.darkGray} size={25}/>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonHeader}
        >
        <Feather name= 'bell' color={Colors.darkGray} size={25}/>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  <View style={styles.divider} />
  </>
)
export default function DetailCoin({route,navigation}) {
  const priceChangeColor = route.params.priceChangePersentage7d > 0 ? Colors.green : Colors.red;
  const priceChangePersentage7dIcon = route.params.priceChangePersentage7d > 0 ? 'caretup' : 'caretdown';
  return (
      <View 
        style={styles.container}
        >
    
        <ScrollView>
          <SafeAreaView>
            <ListHeader
              symbol={route.params.symbol}
              logoUrl={route.params.logoUrl}
              marketCapRank={route.params.marketCapRank}
              navigation={navigation}
              />
            <View style={styles.menuWrapper}>
              <Text style={styles.name}>{route.params.name}</Text>
              <View style={styles.priceAndPersentChangeWrapper}>
                <Text style={styles.currentPrice}>{route.params.currentPrice.toLocaleString("en-US",{currency: "USD"})}</Text>
                <View style={[styles.persentChangeWrapper,{backgroundColor: priceChangeColor}]}>
                  <View style={[{flexDirection: "row",}]}>
                    <View style={[{justifyContent: 'center', }]}>
                      <AntDesign name= {priceChangePersentage7dIcon} style={[styles.changPersentIcon]} color={Colors.white} size={10}/>
                    </View>
                    <Text style={styles.persentChange}>{Math.abs(route.params.priceChangePersentage7d.toFixed(2))}%</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.marketCap} >Market Cap ${route.params.market_cap.toLocaleString("en-US",{currency: "USD"})}</Text>
            </View>
            <View style={styles.chart}>
              <LineChart
                data={
                  {datasets: [
                    {
                      data: route.params.sparkLine.price,
                      strokeWidth: 2, // optional
                    },
                  ],}
                }
                width={Dimensions.get('window').width -32} // from react-native
                height={300}
                yAxisLabel={'$'}
                chartConfig={{
                  backgroundColor: Colors.green,
                  backgroundGradientFrom: Colors.black,
                  backgroundGradientTo: Colors.black,
                  decimalPlaces:0, // optional, defaults to 2dp
                  color: (opacity = 1) => Colors.green,
                  style: {
                    borderRadius: 16,
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  marginTop:16,
                }}
                withVerticalLabels={false}
                withHorizontalLabels={true}
                withVerticalLines={false}
                withDots={false}
              />
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
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
    justifyContent:'space-between',
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
    paddingHorizontal:5,
    

  },
  titleWrapper: {
    flex: 1,
    alignItems:'center', 
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
  marketCapRankWrapper: {  
        backgroundColor: '#323232',
        borderRadius: 5,
        marginRight: 5,
  },
  image: {
    height: 25,
    width: 25,
    borderRadius: 25/2,
    backgroundColor: Colors.indigo,
  },
  marketCapRank: {
    fontSize: 15,
    color: Colors.white,
  },
  chart: {
    paddingHorizontal: 16,
  },
});
  