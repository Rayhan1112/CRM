

import React, { useState } from 'react';
 import SampleOrderspage from './SampleOrderspage';  // Assuming this is your orders table or list component
import './OrdersPage.css';  // Styles for your OrdersPage
 //import SummaryOrders from './SummaryOrders';  // Summary component for order stats
 import "@fontsource/lexend-deca"; // Defaults to weight 400
 import "@fontsource/lexend-deca/400.css"; // Weight 400
 import "@fontsource/lexend-deca/700.css"; // Weight 700
 
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);  // Start with an empty array or fetch from an API

  // Function to handle status change
  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div>
      {/* <h2>Lead Count & Persion Visited</h2> */}
      {/* <SummaryOrders orders={orders} /> */}
      <SampleOrderspage orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default OrdersPage;

