import { useState, useEffect } from 'react';
import { URL } from '../utils/Constant';

const useApiCall = (apiEndpoint, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${URL}${apiEndpoint}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
            // Include any authorization headers here if needed
          },
          body: method !== 'GET' ? JSON.stringify(body) : null, // Send body if method is not GET
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, method, body]);

  return { data, loading, error };
};

export default useApiCall;
