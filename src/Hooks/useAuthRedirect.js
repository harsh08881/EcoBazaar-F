import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Replace 'token' with your actual key name
    if (!token) {
      navigate('/'); // Redirect to homepage if no token is found
    }
  }, [navigate]);
};

export default useAuthRedirect;
