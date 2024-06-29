// server/api/stocks.js
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const apiKey = 'yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh';
  const url = `https://financialmodelingprep.com/api/v3/symbol/SAU?apikey=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
});
