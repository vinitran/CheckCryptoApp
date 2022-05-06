import axios from "axios";

const formatMarketData = (data) => {
    let formattedData = [];

    data.forEach(item => {
        const formattedItem = {
            ...item,
        }
        formattedData.push(formattedItem);
    });
    return formattedData;
};
export const getMarketData= async (url) => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        return formatMarketData(data);
    } catch(error) {
        console.log(error.message)
    }
}
