import { useState } from "react";
import { URL } from "../utils/Constant"; // Base URL

const useApi = (endpoint, method = "POST") => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = async (payload = {}, customHeaders = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${URL}${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...customHeaders,
                },
                body: method !== "GET" ? JSON.stringify(payload) : null,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "API call failed");
            }

            // Save token to localStorage if the API returns a token
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            return data;
        } catch (err) {
            setError(err.message || "Something went wrong");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { callApi, loading, error };
};

export default useApi;