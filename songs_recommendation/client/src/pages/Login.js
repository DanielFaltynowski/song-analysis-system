import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Correct import statement


const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/user/login/access', { email, password });
      console.log('Login Successful:', response.data);

      if (response.data.auth === 1) {
        //print 
        console.log("Login Successful");
        login(response.data.id);
        
        // Use the navigate function to redirect
        navigate('/');
      } else {
        console.log("Login Failed");
        setLoginError('Invalid credentials');
      }

      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login Failed:', error.message);
      setLoginError('Login failed. Please try again.');
    }
  };


  return (
    <div className="min-h-screen bg-emerald-900 flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <button type="submit" className="bg-green text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
