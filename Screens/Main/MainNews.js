import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions
} from 'react-native';
import Colors from '../../assets/Colors';
import News from '../../components/News';
import {GetApi} from '../../services/GetApi'
const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle}>News</Text>
    </View>
    <View style={styles.divider} />
  </>
)
const ListNewsInLoading = () => (
  <>
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
  </>

)
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function MainNews() {
  const [data, setData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const GetData = async () => {
    const fetchData = async () => {
      const dataNews = await GetApi();
      setData(dataNews);
      setIsLoadingData(false);
    }
    fetchData();
  }
  useEffect(() => {
    GetData()
  }, []);

  var news = [];
  if (isLoadingData == false) {
    for (let i = 0; i < data.length; i++) {
      news.push(
        <News
          key={i}
          data={data[i]}
        />
      )
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ListHeader />
      {isLoadingData ?
        <View>
          <ListNewsInLoading />
          <ListNewsInLoading />
          <ListNewsInLoading />
          <ListNewsInLoading />
          <ListNewsInLoading />
          <ListNewsInLoading />
        </View>
         :
        <ScrollView
          style={styles.scrollWrapper}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {news}
        </ScrollView>
      }
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
  scrollWrapper: {
    flexGrow: 1,
  },
  logoInLoading: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: Colors.darkSlateGray,
  },
  titleWrapperInLoading: {
    marginLeft: 8,
  },
  titleInLoading: {
    width: 150,
    height: 50,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: Colors.darkSlateGray,
  },
  rightDownWrapperInLoading: {
    width: 100,
    height: 17,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: Colors.darkSlateGray,
  },
  rightWrapperInLoading: {
    alignItems: "flex-end",

  },
  container: {
    flexDirection: "column",
  },
  title: {
    color: Colors.white,
    fontSize: 15,
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
    width: Dimensions.get('window').width,
    height: 50,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
