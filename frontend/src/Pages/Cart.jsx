import React from 'react';

export const Cart = ({ cartProducts }) => {
  return (
    <div>
      <h2>Cart</h2>
      {cartProducts.length > 0 ? (
        <div className="cart-container">
          {cartProducts.map((product, index) => (
            <div className="cart-product" key={index}>
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Quantity: {product.quantity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};
