import React from 'react';
import './ContactUs.css'; // Import custom styles

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Have any questions or feedback? We'd love to hear from you!</p>
      
      <div className="contact-content">
        {/* Contact Form */}
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" name="message" placeholder="Enter your message" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn-submit">Send Message</button>
        </form>

        {/* Contact Details */}
        <div className="contact-details">
          <h2>Our Office</h2>
          <p>1234 Example Street</p>
          <p>City, State, ZIP</p>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>

          {/* Optional: Google Map Embed */}
          <div className="map">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509839!2d144.95373531531843!3d-37.81627944202114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xb8d8fbc99bbf493d!2sExample%20Location!5e0!3m2!1sen!2sus!4v1617784470045!5m2!1sen!2sus"
              width="100%"
              height="200"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
