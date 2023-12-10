const axios = require('axios');



const OPEN_EXCHANGE_RATES_API_KEY = '7efe54bb4acd2be340d6a7f5';
const getHistoricalExchangeRates = async (base) => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${OPEN_EXCHANGE_RATES_API_KEY}/latest/${base || "EUR"}`,
    );

    return response.data;
  } catch (error) {
    console.error("ERR: ", error)
    throw error;
  }
};

module.exports = {
  getHistoricalExchangeRates,
};