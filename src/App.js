import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import SignIn from "./components/Signin";
import OrdersPage from "./components/OrdersPage";
import AgentLead from "./components/AgentLead";
import AgentLeadList from "./components/AgentLeadList";
import WelcomePage from "./components/WelcomePage"; 
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);  
  const [activeSection, setActiveSection] = useState("welcome"); 
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const handleSignIn = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
    setActiveSection("welcome");
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setActiveSection(""); 
  };

  const renderSection = () => {
    if (!isAuthenticated) {
      return <SignIn onSignIn={handleSignIn} />;
    }

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
