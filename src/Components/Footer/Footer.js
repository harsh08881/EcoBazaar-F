import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>
                        We are committed to providing the best services to our
                        customers. Our goal is to create value and inspire trust.
                    </p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="footer-social">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 MyWebsite. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
