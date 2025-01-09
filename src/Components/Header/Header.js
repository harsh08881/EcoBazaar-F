import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { checkToken } from "../../utils/auth";
import useAuthRedirect from "../../Hooks/useAuthRedirect";
const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? "" : "dark-mode";
  };
   const checkTokent = checkToken();


   const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    window.location.reload(); // Reload to reflect changes
  };

  useAuthRedirect();
  
  return (
    <header className="header">
      <div className="header-logo">
        <a href="/">MyLogo</a>
      </div>
      <nav className="header-nav">
        <Link to="/" className="header-link">
          Home
        </Link>
        <Link to="/about" className="header-link">
          About
        </Link>
        <Link to="/services" className="header-link">
          Services
        </Link>
        <Link to="/contact" className="header-link">
          Contact
        </Link>
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        {checkTokent ? (
        <button className="login-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      )}
      </div>
    </header>
  );
};

export default Header;
