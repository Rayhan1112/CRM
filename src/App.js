

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
import WelcomePage from './components/WelcomePage'
import InternetConnectionError from './components/InternetConnectionError';
import Assigned from './components/AssignedLeads/AssignedLeads';

import './App.css';




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);  
  const [activeSection, setActiveSection] = useState("welcome"); 
  const [items, setItems] = useState([]);
  const [id,setId] = useState(null)
  const[assigned,setAssigned]=useState();

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const handleSignIn = (type,email,id,assignedLeads) => {
    setIsAuthenticated(true);
    setUserType(type);
    setId(id);
    setAssigned(assignedLeads)
    setActiveSection("welcome");   
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setActiveSection(""); 
  };
  if (!isAuthenticated) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  const renderSection = () => {
   

    switch (activeSection) {
      case "welcome":
        return (
          <WelcomePage
            userType={userType}
            onNavigate={(section) => setActiveSection(section)}
          />
        );
      case "addItem":
        return <ItemForm onAddItem={addItem} />;
      case "listItems":
        return <ItemList items={items} />;
      case "orders":
        return <OrdersPage />;
      case "agentlead":
        return <AgentLead />;
      case "agentleadlist":
        return <AgentLeadList />;
      case "assigned":
          return <Assigned agentId={id} numberOfLeadsToShow={assigned} />;
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
    <div>
    
      {/* Include the InternetConnectionError component */}
      <InternetConnectionError />
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
