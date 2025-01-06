import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Welcome to QuickOrder</h1>
        <p>Your one-stop solution for hassle-free bookings!</p>
        <a href="#booking" className="cta-button">Book Now</a>
      </header>

      {/* Booking Section */}
      <section id="booking" className="booking-section">
        <h2>Order Booking</h2>
        <form className="booking-form">
          <div className="form-group">
            <label htmlFor="service">Select Service:</label>
            <select id="service" required>
              <option value="">Choose a service</option>
              <option value="food-delivery">Food Delivery</option>
              <option value="ride-booking">Ride Booking</option>
              <option value="event-booking">Event Booking</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Booking Date:</label>
            <input type="date" id="date" required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Delivery Address:</label>
            <textarea id="address" rows="3" required></textarea>
          </div>
          <button type="submit" className="submit-button">Place Order</button>
        </form>
      </section>

      {/* Featured Services */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-container">
          <div className="service-card">
            <h3>Food Delivery</h3>
            <p>Delicious meals delivered to your doorstep.</p>
          </div>
          <div className="service-card">
            <h3>Ride Booking</h3>
            <p>Comfortable rides at the click of a button.</p>
          </div>
          <div className="service-card">
            <h3>Event Booking</h3>
            <p>Book tickets to your favorite events easily.</p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <footer className="cta-section">
        <h2>Ready to place your order?</h2>
        <a href="#booking" className="cta-button">Get Started</a>
      </footer>
    </div>
  );
};

export default Home;
