import { HTTP_METHODS } from "../config/constants";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const createInvestment = async (investment) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${BASE_API_URL}/investments`, {
            method: HTTP_METHODS.POST,
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

const fetchInvestments = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${BASE_API_URL}/investments/`, {
            method: HTTP_METHODS.GET,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

const deleteInvestment = async (investmentId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${BASE_API_URL}/investments/${investmentId}`, {
            method: HTTP_METHODS.DELETE,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

export { createInvestment, fetchInvestments, deleteInvestment };