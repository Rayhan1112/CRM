import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Sidebar for navigation
import ItemList from "./ItemList"; // Existing component
import OrdersPage from "./OrdersPage"; // Existing component
import AgentLead from "./AgentLead"; // Include AgentLead component
import "./MainAdminComponent.css"; // Assuming a CSS file for styles

function MainAdminComponent({ userType }) {
  const [activeSection, setActiveSection] = useState("itemList"); // Default section for admin

  // Conditional rendering based on the active section
  const renderSection = () => {
    if (userType === "admin") {
      switch (activeSection) {
        case "itemList":
          return <ItemList />;
        case "orders":
          return <OrdersPage />;
        case "agentLead":
          return <AgentLead />;
        default:
          return <h3>Welcome, Admin!</h3>;
      }
    } else {
      return <h3>Unauthorized access. Please log in as an admin.</h3>;
    }
  };

  return (
    <div className="main-admin-container">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="main-content">{renderSection()}</div>
    </div>
  );
}

export default MainAdminComponent;
