import React, { useState } from "react";
import "./Header.css";

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.className = darkMode ? "" : "dark-mode";
    };

    return (
        <header className="header">
            <div className="header-logo">
                <a href="/">MyLogo</a>
            </div>
            <nav className="header-nav">
                <a href="#home" className="header-link">Home</a>
                <a href="#about" className="header-link">About</a>
                <a href="#services" className="header-link">Services</a>
                <a href="#contact" className="header-link">Contact</a>
            </nav>
            <div className="header-actions">
                <button className="theme-toggle" onClick={toggleTheme}>
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </div>
        </header>
    );
};

export default Header;
