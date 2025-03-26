const BASE_API_URL = 'https://api.exchangerate-api.com/v4/latest';

export const getExchangeRate = async (currency) => {
    try {
        const response = await fetch(`${BASE_API_URL}/${currency}`);
        const data = await response.json();
        const exchangeRate = data.rates.USD;

        return exchangeRate;
    } catch (error) {
        console.error(error);
    }
}