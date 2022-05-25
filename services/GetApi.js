import React from 'react';

export const GetApi = () => {
    const axios = require("axios");

    const options = {
        method: 'GET',
        url: 'https://crypto-news16.p.rapidapi.com/news/top/30',
        headers: {
            'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com',
            'X-RapidAPI-Key': '44c781cc70mshd4a7d43f5d919fdp119697jsnbee098df7552'
        }
    };

    const data = axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
    return data;
}
