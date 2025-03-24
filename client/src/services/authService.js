const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const login = async (email, password) => {
    try {
        const response = await fetch(`${BASE_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.data.token);
        }

        return data;
    } catch (error) {
        console.error(error);
    }
}

const verify = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_API_URL}/auth/verify`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await response.json();
        const isValid = data.success;

        return isValid;
    } catch (error) {
        console.error(error);
    }
}

export { login, verify };