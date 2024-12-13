import React, { useState } from 'react';
import './App.css';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('client');

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (userType === 'agent') {
      try {
        const response = await fetch('http://localhost:5000/api/agents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Login successful!');
          onSignIn('agent'); 
          setError('');
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
        console.error('Error during login:', error);
      }
    } else {
      
      if (trimmedEmail === 'admin@1.com' && trimmedPassword === '123') {
        onSignIn('admin');
        alert('Signed in as Admin!');
        setError('');
      } else {
        setError('Invalid admin credentials, please try again.');
      }
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleLogin}>
    
        <div className="user-type-toggle">
          <button
            type="button"
            className={`toggle-btn ${userType === 'admin' ? 'active' : ''}`}
            onClick={() => setUserType('admin')}
          >
            Admin
          </button>
          <button
            type="button"
            className={`toggle-btn ${userType === 'agent' ? 'active' : ''}`}
            onClick={() => setUserType('agent')}
          >
            Agent
          </button>
        </div>

        
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
