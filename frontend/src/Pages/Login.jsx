import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/login.css';

export const Login = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleMobileNumberSubmit = (e) => {
    e.preventDefault();
    // Send mobile number to the server to request OTP
    // For demonstration purpose, we're showing the OTP input directly
    setShowOtpInput(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Send mobile number and OTP to the server for verification
    // For demonstration purpose, we're considering it as a successful login
    setIsLoggedIn(true);
    navigate('/products');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h2>{isLoggedIn ? 'Logout' : 'Login'}</h2>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : !showOtpInput ? (
        <form onSubmit={handleMobileNumberSubmit}>
          <label htmlFor="mobileNumberInput">Mobile Number</label>
          <br />
          <input
            type="tel"
            id="mobileNumberInput"
            value={mobileNumber}
            placeholder="Enter Mobile Number"
            onChange={handleMobileNumberChange}
            required
          />
          <br />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <label htmlFor="otpInput">Enter OTP</label>
          <br />
          <input
            type="text"
            id="otpInput"
            value={otp}
            onChange={handleOtpChange}
            required
          />
          <br />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};
