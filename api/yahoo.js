// api/yahoo.js
export async function getYahooData() {
    try {
      const response = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/2350.SR');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching Yahoo data:', error);
      return null;
    }
  }
  