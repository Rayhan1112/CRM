import React, { useState } from "react";
import Sidebar from "./Sidebar"; 
import ItemList from "./ItemList"; 
import OrdersPage from "./OrdersPage"; 
import AgentLead from "./AgentLead"; 
import "./MainAdminComponent.css"; 

function MainAdminComponent({ userType }) {
  const [activeSection, setActiveSection] = useState("itemList"); 

  
  const renderSection = () => {
    if (userType === "admin") {
      switch (activeSection) {
        case "itemList":
          return <ItemList />;
        case "orders":
          return <OrdersPage />;
        case "agentLead":
          return <OrdersPage />;
        default:
          return <h3>Welcome, Admin!</h3>;
      }
    } else {
      return <h3>Unauthorized access. Please log in as an admin.</h3>;
    }
  };

  return (
    <div className="main-admin-container" >
      <Sidebar setActiveSection={setActiveSection} />
      <div className="main-content">{renderSection()}</div>
    </div>
  );
}

export default MainAdminComponent;
