const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const token = localStorage.getItem('token');

const createInvestment = async (investment) => {
    try {
        const response = await fetch(`${BASE_API_URL}/investments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(investment),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

export { createInvestment };