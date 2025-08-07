import React, { useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const API_BASE_URL = 'https://ecommerce-f8oj.onrender.com';

const LoginPopUp1 = ({ setShowLogin }) => {
  const [currSate, setCurrState] = useState("Sign Up");
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = currSate === "Sign Up"
      ? `${API_BASE_URL}/api/users/signUp`
      : `${API_BASE_URL}/api/users/login`;

    try {
      const { data } = await axios.post(url, formData);

      if (currSate === "Sign Up" && data.success) {
        toast.success(data.message || "Registered successfully");
        setCurrState("Login");
      } else if (currSate === "Login" && data.token) {
        toast.success(data.message || "Login successful");
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        navigate('/');
      } else {
        toast.error(data.message || "Something went wrong");
      }

    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={handleSubmit}>
        <div className='login-popup-title'>
          <h1>{currSate}</h1>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>

        <div className='login-popup-inputs'>
          {currSate === "Sign Up" && (
            <input
              name='name'
              type='text'
              placeholder='Enter your name'
              required
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          )}
          <input
            name='email'
            type='email'
            placeholder='Enter your email'
            required
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            name='password'
            type='password'
            placeholder='Enter your password'
            required
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button type="submit">
          {currSate === "Login" ? "Login" : "Create account"}
        </button>

        <div className='login-popup-condition'>
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currSate === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
        }
      </form>
    </div>
  );
};

export default LoginPopUp1;
