import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/cart.css";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cart')
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const removeFromCart = (itemId) => {
    fetch(`http://localhost:3000/cart/${itemId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          const updatedCartItems = cartItems.filter(item => item.id !== itemId);
          setCartItems(updatedCartItems);
        } else {
          console.error('Error:', response.status);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
              <td>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total Amount:</td>
            <td>{calculateTotalAmount()}</td>
          </tr>
        </tfoot>
      </table>
      <Link to="payment">
      <button>Confirm Order</button>
      </Link>
    </div>
  );
};
