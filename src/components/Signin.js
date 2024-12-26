// import React, { useState } from 'react';
// import './SignIn.css';

// const SignIn = ({ onSignIn }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [userType, setUserType] = useState('client');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const trimmedEmail = email.trim();
//     const trimmedPassword = password.trim();

//     if (userType === 'agent') {
//       try {
//         const response = await fetch('http://localhost:5000/api/leads', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           alert('Login successful!');
//           onSignIn('agent');
//           setError('');
//         } else {
//           setError(data.message || 'Invalid credentials. Please try again.');
//         }
//       } catch (error) {
//         setError('An error occurred. Please try again later.');
//         console.error('Error during login:', error);
//       }
//     } else {
//       if (trimmedEmail === 'admin@1.com' && trimmedPassword === '123') {
//         onSignIn('admin');
//         alert('Signed in as Admin!');
//         setError('');
//       } else {
//         setError('Invalid admin credentials, please try again.');
//       }
//     }
//   };

//   return (
//     <div className="signin-page">
//       <div className="signin-container">
//         <h2>Sign In</h2>
//         {error && <div className="error">{error}</div>}

//         <form onSubmit={handleLogin}>
//           <div className="user-type-toggle">
//             <button
//               type="button"
//               className={`toggle-btn ${userType === 'admin' ? 'active' : ''}`}
//               onClick={() => setUserType('admin')}
//             >
//               Admin
//             </button>
//             <button
//               type="button"
//               className={`toggle-btn ${userType === 'agent' ? 'active' : ''}`}
//               onClick={() => setUserType('agent')}
//             >
//               Agent
//             </button>
//           </div>
//           <div>
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Sign In</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import React, { useState, useEffect } from 'react';
import './SignIn.css';
import axios from 'axios';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('client');
  const [agents, setAgents] = useState([]);

  // Fetch agent data
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agents');
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching agent data:', error);
        alert('Failed to fetch agent data. Please try again later.');
      }
    };

    fetchAgents();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (userType === 'agent') {
      // Check if the email and password match an agent's credentials
      const agent = agents.find(
        (agent) => agent.email === trimmedEmail && agent.password === trimmedPassword
      );

      if (agent) {
        onSignIn('agent');
        alert('Signed in as Agent!');
        setError('');
      } else {
        setError('Invalid agent credentials, please try again.');
      }
    } else {
      // Default credentials for admin
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
