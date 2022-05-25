import axios from "axios";

export const getMarketData= async (url) => {  
  try {
    const data = await axios.get(url).then(res => {return res.data});
    return data;
  } catch(error) {
    console.log(error.message)
  }
  
}
