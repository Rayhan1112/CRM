import React, { useState, useEffect } from 'react';
import './SignIn.css';
import { getDatabase, ref, get } from 'firebase/database'; // Import get along with other methods
import  database  from '../firebaseConfig'; // Firebase configuration

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('client');
  const [agents, setAgents] = useState([]); // State to hold agent data

  // Fetch agent data from Firebase
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const dbRef = ref(database, 'AgentList'); // Reference to AgentList in Firebase
        const snapshot = await get(dbRef); // Fetch the data
        if (snapshot.exists()) {
          const data = snapshot.val();
          const agentsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setAgents(agentsArray); // Set the agent data in state
        }
      } catch (error) {
        console.error('Error fetching agent data:', error);
        alert('Failed to fetch agent data.');
      }
    };

    fetchAgents();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (userType === 'agent') {
      // Check if the email and password match an agent's credentials from Firebase
      const agent = agents.find(
        (agent) => agent.email === trimmedEmail && agent.password === trimmedPassword
      );

      if (agent) {
        onSignIn('agent'); // Trigger sign-in for agent
        alert('Signed in as Agent!');
        setError('');
        setEmail('');
        setPassword('');
      } else {
        setError('Invalid agent credentials, please try again.');
      }
    } else {
      // Default credentials for admin
      if (trimmedEmail === 'admin@1.com' && trimmedPassword === '123') {
        onSignIn('admin');
        alert('Signed in as Admin!');
        setError('');
        setEmail('');
        setPassword('');
      } else {
        setError('Invalid admin credentials, please try again.');
      }
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2>Sign In</h2>
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="user-type-toggle">
            <button
              type="button"
              className={`toggle-btn ${userType === 'admin' ? 'active' : ''}`}
              onClick={() => {
                setUserType('admin');
                setError(''); // Reset error when switching user type
              }}
            >
              Admin
            </button>
            <button
              type="button"
              className={`toggle-btn $userType === 'agent' ? 'active' : ''}`}
              onClick={() => {
                setUserType('agent');
                setError(''); // Reset error when switching user type
              }}
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
    </div>
  );
};

export default SignIn;