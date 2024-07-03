// server/api/stocksList.js

import axios from 'axios';

export default defineEventHandler(async (event) => {
  const apiKey = "yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh"; // تأكد من تخزين API key في متغيرات البيئة

  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/symbol/SAU?apikey=${apiKey}`);
    const stocksList = response.data.map(stock => ({
      name: stock.name,
      symbol: stock.symbol.replace('.sr', '')  // إزالة .sr من الرموز
    }));

    return stocksList;
  } catch (error) {
    console.error('Error fetching stocks list:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch stocks list. Please try again.',
    });
  }
});
