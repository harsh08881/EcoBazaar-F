import React, { useState } from 'react';
import useApiCall from '../../Hooks/useApis';
import './Menu.css'; // Importing the CSS file
import Loader from '../Loader/Loader';

const Menu = () => {
  const [endpoint, setEndpoint] = useState('/user/menu'); // Assuming '/menu' is the endpoint
  const [cart, setCart] = useState([]); // Cart state to store added items
  const [filter, setFilter] = useState(''); // State to manage the search/filter query
  const [suggestions, setSuggestions] = useState([]); // State for search suggestions
  const { data, loading, error } = useApiCall(endpoint, 'GET');

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Assuming the structure is { data: { menu: [{ items: [...] }] } }
  const menuItems = data?.data?.menu || [];

  // Handle suggestions when typing
  const handleInputChange = (value) => {
    setFilter(value);
    if (value) {
      const matches = menuItems.flatMap(menu =>
        menu.items
          .filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            menu.category.toLowerCase().includes(value.toLowerCase())
          )
          .map(item => ({ ...item, category: menu.category }))
      );
      setSuggestions(matches.slice(0, 5)); // Limit suggestions to 5 items
    } else {
      setSuggestions([]);
    }
  };

  // Filtered items based on the filter state
  const filteredItems = menuItems.flatMap(menu =>
    menu.items
      .filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        menu.category.toLowerCase().includes(filter.toLowerCase())
      )
      .map(item => ({ ...item, category: menu.category }))
  );

  // Add item to cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <div className="menu-container">
      <h1>Menu</h1>

      {/* Filter Input */}
      <div className="filter-container">
        <input
          type="text"
          className="filter-input"
          placeholder="Search for items or categories..."
          value={filter}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="suggestion-item"
                onClick={() => {
                  setFilter(suggestion.name); // Set filter to the selected suggestion
                  setSuggestions([]); // Clear suggestions
                }}
              >
                {suggestion.name} ({suggestion.category})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Menu Items */}
      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => (
          <div className="box" key={index}>
            <h2>{item.category}</h2>
            <div>
              <strong>{item.name}</strong>: {item.description}
            </div>
            <div className="brand">Brand: {item.brand}</div>
            <div className="price">Price: ${item.price}</div>
            <div className="quantity">Quantity: {item.quantity}</div>

            {/* Add to Cart Button */}
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p>No items match your filter criteria.</p>
      )}

      {/* Cart Details */}
      {cart.length > 0 && (
        <div>
          <h3>Cart</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <div>
                  <strong>{item.name}</strong>: ${item.price}
                </div>
              </li>
            ))}
          </ul>
          <div>
            <strong>Total Items: </strong>
            {cart.length}
            <br />
            <strong>Total Price: </strong>$
            {cart.reduce((total, item) => total + item.price, 0)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
