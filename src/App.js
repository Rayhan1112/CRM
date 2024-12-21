

// import React, { useState } from 'react';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import ItemForm from './components/ItemForm';
// import ItemList from './components/ItemList';
// import SignIn from './components/Signin'; 
// import OrdersPage from './components/OrdersPage';
// import AgentLead from './components/AgentLead';

// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userType, setUserType] = useState(null);  // new state for userType
//   const [activeSection, setActiveSection] = useState('addItem');
//   const [items, setItems] = useState([]);

//   // Function to handle item addition
//   const addItem = (item) => {
//     setItems([...items, item]);
//   };

//   // Handle user sign-in and set the user type
//   const handleSignIn = (type) => {
//     setIsAuthenticated(true);
//     setUserType(type);  // set userType when sign in as either 'admin' or 'agent'
//   };

//   // Handle sign-out and reset the user type
//   const handleSignOut = () => {
//     setIsAuthenticated(false);
//     setUserType(null);  // reset userType when signed out
//   };

//   // Render content based on the active section
//   const renderSection = () => {
//     if (!isAuthenticated) {
//       return <SignIn onSignIn={handleSignIn} />;  // pass handleSignIn to SignIn component
//     }

//     switch (activeSection) {
//       case 'addItem':
//         return <ItemForm onAddItem={addItem} />;
//       case 'listItems':
//         return <ItemList items={items} />;
//       case 'orders':
//         return <OrdersPage />;
//         case 'agentlead':
//           return <AgentLead/>
//       default:
//         return <div>Select an option from the sidebar.</div>;
//     }
//   };

//   return (
//     <div className="App">
//       {/* Render header only when authenticated */}
//       {isAuthenticated && <Header userType={userType} onSignOut={handleSignOut} />}
//       <div className="main-content">
//         {/* Render sidebar only when authenticated */}
//         {isAuthenticated && <Sidebar setActiveSection={setActiveSection} />}
//         <div className="content">
//           {renderSection()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
// ............................................


import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import SignIn from './components/Signin'; 
import OrdersPage from './components/OrdersPage';
import AgentLead from './components/AgentLead';
import AgentLeadList from './components/AgentLeadList';

import './App.css';
import LogoSlider from './components/OurClient/LogoSlider';
import AboutUs from './components/AboutUs/Aboutus';
import Testimonials from './components/Testomonials/Testomonials';
import Contact from './components/Contact/Contact';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);  
  const [activeSection, setActiveSection] = useState('orders');
  const [items, setItems] = useState([]);


  const addItem = (item) => {
    setItems([...items, item]);
  };


  const handleSignIn = (type) => {
    setIsAuthenticated(true);
    setUserType(type);  
  };

  
  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserType(null);  
  };

 
  const renderSection = () => {
    if (!isAuthenticated) {
      return <SignIn onSignIn={handleSignIn} />; 
    }
  
    switch (activeSection) {
      case 'addItem':
        return <ItemForm onAddItem={addItem} />; 
      case 'listItems':
        return <ItemList items={items} />; 
      case 'orders':
        return <OrdersPage />; 
      case 'agentlead':
        return <AgentLead />; 
      case 'agentleadlist':
        return <AgentLeadList/>
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
    <div className="App">
    
      {isAuthenticated && <Header userType={userType} onSignOut={handleSignOut} />}
      <div className="main-content">
      
        {isAuthenticated && (
          <Sidebar setActiveSection={setActiveSection} userType={userType} />
        )}
        <div className="content">{renderSection()}</div>
      </div>
    
    </div>
  );
}

export default App;

// ............................................


// import React, { useState } from 'react';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import ItemForm from './components/ItemForm';
// import ItemList from './components/ItemList';
// import SignIn from './components/Signin'; 
// import OrdersPage from './components/OrdersPage';
// import AgentLeadList from './components/AgentLeadList'; // Imported AgentLeadList from the first code
// import AgentLead from './components/AgentLead'; // Retained AgentLead from the second code

// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userType, setUserType] = useState(null);  // Track the type of user ('admin' or 'agent')
//   const [activeSection, setActiveSection] = useState('orders');
//   const [items, setItems] = useState([]);

//   // Function to handle item addition
//   const addItem = (item) => {
//     setItems([...items, item]);
//   };

//   // Handle user sign-in and set the user type
//   const handleSignIn = (type) => {
//     setIsAuthenticated(true);
//     setUserType(type);  // Set userType as 'admin' or 'agent'
//   };

//   // Handle sign-out and reset the user type
//   const handleSignOut = () => {
//     setIsAuthenticated(false);
//     setUserType(null);  // Reset userType on sign-out
//   };

//   const renderSection = () => {
//     if (!isAuthenticated) {
//       return <SignIn onSignIn={handleSignIn} />; // Show sign-in if not authenticated
//     }

//     switch (activeSection) {
//       case 'addItem':
//         return userType === 'admin' ? <ItemForm onAddItem={addItem} /> : <div>Access Denied</div>;
//       case 'listItems':
//         return userType === 'admin' ? <ItemList items={items} /> : <div>Access Denied</div>;
//       case 'orders':
//         return <OrdersPage />; // Available for both admin and agent
//       case 'agentlead':
//         return userType === 'admin' ? <AgentLeadList /> : <AgentLead />; // Admin sees AgentLeadList, others see AgentLead
//       default:
//         return <div>Select an option from the sidebar.</div>;
//     }
//   };

//   return (
//     <div className="App">
//       {/* Render header only when authenticated */}
//       {isAuthenticated && <Header userType={userType} onSignOut={handleSignOut} />}
//       <div className="main-content">
//         {/* Render sidebar only when authenticated */}
//         {isAuthenticated && (
//           <Sidebar setActiveSection={setActiveSection} userType={userType} />
//         )}
//         <div className="content">{renderSection()}</div>
//       </div>
//     </div>
//   );
// }

// export default App;

