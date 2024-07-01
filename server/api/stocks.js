// server/api/stocks.js

import axios from 'axios';

export default defineEventHandler(async (event) => {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY; // قم بتخزين API key في متغيرات البيئة

  const query = getQuery(event);
  const { symbol } = query;

  if (!symbol) {
    return {
      statusCode: 400,
      body: {
        message: 'Stock symbol is required',
      },
    };
  }

  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`);
    return {
      statusCode: 200,
      body: response.data[0],
    };
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return {
      statusCode: 500,
      body: {
        message: 'Failed to fetch stock data. Please try again.',
      },
    };
  }
});
