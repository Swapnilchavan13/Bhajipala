import React, { useEffect, useState } from 'react';
import '../Styles/products.css';

export const Products = () => {
  const [vegetables, setVegetables] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/vegitables')
      .then(response => response.json())
      .then(data => setVegetables(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const increaseQuantity = (name) => {
    setVegetables(prevVegetables =>
      prevVegetables.map(vegetable => {
        if (vegetable.name === name) {
          return {
            ...vegetable,
            quantity: vegetable.quantity + 1
          };
        }
        return vegetable;
      })
    );
  };

  const decreaseQuantity = (name) => {
    setVegetables(prevVegetables =>
      prevVegetables.map(vegetable => {
        if (vegetable.name === name && vegetable.quantity > 0) {
          return {
            ...vegetable,
            quantity: vegetable.quantity - 1
          };
        }
        return vegetable;
      })
    );
  };

  const addToCart = (name) => {
    const selectedVegetable = vegetables.find(vegetable => vegetable.name === name);
    // Check if the selected vegetable is already in the cart
    const isAlreadyInCart = cart.some(item => item.name === selectedVegetable.name);
    if (isAlreadyInCart) {
      alert('Product is already added to the cart');
      return;
    }
    // Make an API request to add the selected vegetable to the cart
    fetch('http://localhost:3000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedVegetable)
    })
      .then(response => response.json())
      .then(data => {
        setCart(prevCart => [...prevCart, data]);
        console.log('Added to cart:', data);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="vegetable-list">
      {vegetables && vegetables.map(vegetable => (
        <div key={vegetable.name} className="vegetable-card">
          <img src={vegetable.img} alt={vegetable.name} />
          <h2>{vegetable.name}</h2>
          <p>Price: Rs.{vegetable.price}/Kg</p>
          <p>Quantity: {vegetable.quantity}</p>
          <div className="quantity-buttons">
            <button className="quantity-button" onClick={() => decreaseQuantity(vegetable.name)}>-</button>
            <button className="quantity-button" onClick={() => increaseQuantity(vegetable.name)}>+</button>
          </div>
          <button className="add-to-cart-button" onClick={() => addToCart(vegetable.name)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};
