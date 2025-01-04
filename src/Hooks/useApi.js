import { useState } from "react";
import { URL } from "../utils/Constant"; // Import the base URL

const useApi = (endpoint) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = async (payload) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${URL}${endpoint}`, { // Use the base URL with endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "API call failed");
            }

            return data;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { callApi, loading, error };
};

export default useApi;
