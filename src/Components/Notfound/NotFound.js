import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './NotFound.css'

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); // Redirect after 5 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
    <Header/>
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <p>Redirecting to the homepage...</p>
    </div>
    <Footer/>
    </>
  );
};

export default NotFound;
