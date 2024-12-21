import React from "react";
import "./WelcomePage.css";

const WelcomePage = ({ userType, onNavigate }) => {
  return (
    <div className="welcome-page">
      <div className="welcome-main">
        <h1>Welcome to the Lead Management System</h1>
        <p>
          {userType === "admin"
            ? "Manage orders and leads efficiently."
            : "View and manage your assigned leads."}
        </p>
        <button
          className="btn-primary"
          onClick={() => onNavigate(userType === "admin" ? "orders" : "agentleadlist")}
        >
          {userType === "admin" ? "Go to Orders" : "Go to Agent Leads"}
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
