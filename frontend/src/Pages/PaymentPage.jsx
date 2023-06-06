import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/payment.css';

const PaymentPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/cart')
      .then(response => response.json())
      .then(data => {
        // Calculate the total value from the cart data
        const cartTotal = data.reduce((acc, item) => acc +(item.quantity* item.price), 0);
        setTotal(cartTotal);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handlePlaceOrder = () => {
  // Check if any of the input fields are empty
  if (!name || !address || !mobile) {
    alert('Please fill in all the required fields');
    return;
  }

  const orderData = {
    name,
    address,
    mobile,
  };

  fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then(response => response.json())
    .then(data => {
      alert('Order placed');
          navigate('/products');
       
    })
    .catch(error => {
      console.error('Error placing order:', error);
    });
};

  

  return (
    <div className="payment-page">
      <h2 className="total-value">Total Value: Rs.{total}</h2>

      <div className="input-container">
        <label htmlFor="name">Name:</label>
        <input required type="text" id="name" value={name} onChange={handleNameChange} />
      </div>

      <div className="input-container">
        <label htmlFor="address">Address:</label>
        <input required type="text" id="address" value={address} onChange={handleAddressChange} />
      </div>

      <div className="input-container">
        <label htmlFor="mobile">Mobile:</label>
        <input required type="text" id="mobile" value={mobile} onChange={handleMobileChange} />
      </div>

      <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default PaymentPage;
