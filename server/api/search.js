// server/api/stocksList.js
import axios from 'axios';

export default defineEventHandler(async (event) => {
  const apiKey = "yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh";

  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/symbol/SAU?apikey=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks list:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch stocks list. Please try again.',
    });
  }
});
