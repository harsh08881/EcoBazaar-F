import React, { useState } from 'react';
import useApiCall from '../../Hooks/useApis';
import './Menu.css'; // Importing the CSS file

const Menu = () => {
  const [endpoint, setEndpoint] = useState('/user/menu'); // Assuming '/menu' is the endpoint
  const [cart, setCart] = useState([]); // Cart state to store added items
  const [filter, setFilter] = useState(''); // State to manage the search/filter query
  const { data, loading, error } = useApiCall(endpoint, 'GET');

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Assuming the structure is { data: { menu: [{ items: [...] }] } }
  const menuItems = data?.data?.menu || [];

  // Filtered items based on the filter state
  const filteredItems = menuItems.flatMap(menu => {
    return menu.items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      menu.category.toLowerCase().includes(filter.toLowerCase())
    ).map(item => ({ ...item, category: menu.category })); // Add category to item
  });

  // Add item to cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <div className="menu-container">
      <h1>Menu</h1>

      {/* Filter Input */}
      <input
        type="text"
        className="filter-input"
        placeholder="Search for items or categories..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => (
          <div key={index}>
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
            <strong>Total Items: </strong>{cart.length}
            <br />
            <strong>Total Price: </strong>${cart.reduce((total, item) => total + item.price, 0)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
