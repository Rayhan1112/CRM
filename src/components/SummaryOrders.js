// // Summary.js
// import React from 'react';
// import { FaBoxOpen, FaShippingFast, FaCheckCircle, FaDollarSign } from 'react-icons/fa';
// import './OrdersPage.css';

// const SummaryOrders = ({ orders = [] }) => {
//   const totalOrders = orders.length;
//   const ordersOnProcess = orders.filter(order => order.status === "On Process").length;
//   const ordersDone = orders.filter(order => order.status === "Done").length;
//   const totalIncome = orders.reduce((acc, order) => acc + order.total, 0);

//   return (
//     <div className="summary-grid">
//       <div className="summary-item">
//         <FaBoxOpen size={30} className="summary-icon" />
//         <h4> Interested</h4>
//         <p>{totalOrders}</p>
//       </div>
//       <div className="summary-item">
//         <FaShippingFast size={30} className="summary-icon" />
//         <h4>On Hold </h4>
//         <p>{ordersOnProcess}</p>
//       </div>
//       <div className="summary-item">
//         <FaCheckCircle size={30} className="summary-icon" />
//         <h4>New Lead</h4>
//         <p>{ordersDone}</p>
//       </div>
//       <div className="summary-item">
//         <FaDollarSign size={30} className="summary-icon" />
//         <h4>Total </h4>
//         <p>${totalIncome.toFixed(2)}</p>
//       </div>
//     </div>
//   );
// };

// export default SummaryOrders;


import React from "react";
import { FaBoxOpen, FaShippingFast, FaCheckCircle, FaDollarSign } from "react-icons/fa";
import "./OrdersPage.css";

const SummaryOrders = ({ interested, onHold, newLead, totalLeads }) => {
  return (
    <div className="summary-grid">
      <div className="summary-item">
        <FaBoxOpen size={30} className="summary-icon" />
        <h4>Interested</h4>
        <p>{interested}</p>
      </div>
      <div className="summary-item">
        <FaShippingFast size={30} className="summary-icon" />
        <h4>On Hold</h4>
        <p>{onHold}</p>
      </div>
      <div className="summary-item">
        <FaCheckCircle size={30} className="summary-icon" />
        <h4>New Lead</h4>
        <p>{newLead}</p>
      </div>
      <div className="summary-item">
        <FaDollarSign size={30} className="summary-icon" />
        <h4>Total Leads</h4>
        <p>{totalLeads}</p>
      </div>
    </div>
  );
};

export default SummaryOrders;
