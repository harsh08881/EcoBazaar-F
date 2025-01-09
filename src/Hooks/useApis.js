import { useState, useEffect } from 'react';
import { URL } from '../utils/Constant';
import { getItem } from '../utils/auth';

const useApiCall = (apiEndpoint, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = getItem('token'); // Retrieve token from localStorage
        console.log(token);
        const response = await fetch(`${URL}${apiEndpoint}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: method !== 'GET' ? JSON.stringify(body) : null, // Include body for non-GET requests
        });

        // Check for HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          setData(result);
        } else {
          throw new Error('Response is not valid JSON');
        }
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
