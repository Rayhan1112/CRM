import React, { useState, useEffect } from 'react';
import './SignIn.css';
import { getDatabase, ref, get } from 'firebase/database'; // Import get along with other methods
import database from '../firebaseConfig'; // Firebase configuration
import Swal from 'sweetalert2';
import AgentLeadList from './AssignedLeads/AssignedLeads';

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
        // Check if the agent's status is 'active'
        if (agent.agentLead === 'Active') {
          // If the agent is active, proceed to sign in
          onSignIn(userType, trimmedEmail, agent.id,agent.assignedLeads); // Pass userType, email, and agentId to onSignIn
          // Show agent's pushId and assigned Leads in the alert
          Swal.fire({
            title: 'Success!',
            text: `Signed in as Agent!\nPushId: ${agent.id}\nAssigned Leads: ${agent.assignedLeads ? agent.assignedLeads : 'No leads assigned'}`,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          // <AgentLeadList agentId={agent.assignedLeads} />

          setError('');
          setEmail('');
          setPassword('');
        } else {
          // If the agent is inactive, show an error message
          setError('Your account is inactive. Please contact support.');
        }
      } else {
        // If no agent found or invalid credentials
        setError('Invalid agent credentials, please try again.');
      }
    } else {
      // Default credentials for admin
      if (trimmedEmail === 'admin@1.com' && trimmedPassword === '123') {
        onSignIn('admin', trimmedEmail); // Pass userType and email to onSignIn
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
              className={`toggle-btn ${userType === 'agent' ? 'active' : ''}`}
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