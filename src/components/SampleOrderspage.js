import React, { useState, useEffect } from "react";
import { ref, get, update } from "firebase/database"; // Import Firebase Realtime Database methods
import database from "../firebaseConfig"; // Import the Firebase config
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import SummaryOrders from "./SummaryOrders";

function ItemList() {
  const [items, setItems] = useState([]);
  const [leadCounts, setLeadCounts] = useState({
    interested: 0,
    onHold: 0,
    newLead: 0,
    totalLeads: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const dbRef = ref(database, "LeadList");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const leadsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setItems(leadsArray);
          calculateLeadCounts(leadsArray);
        } else {
          console.log("No leads available.");
        }
      } catch (error) {
        console.error("Error fetching items: ", error.message);
      }
    };

    fetchItems();
  }, []);

  const calculateLeadCounts = (leads) => {
    const counts = {
      interested: 0,
      onHold: 0,
      newLead: 0,
      totalLeads: leads.length,
    };

    leads.forEach((lead) => {
      if (lead.leadStatus === "Interested") counts.interested++;
      else if (lead.leadStatus === "On Hold") counts.onHold++;
      else if (lead.leadStatus === "New Lead") counts.newLead++;
    });

    setLeadCounts(counts);
  };

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm("Are you sure you want to change the status?")) return;

    setLoading(true);
    try {
      const leadRef = ref(database, `LeadList/${id}`);  // Corrected this line
      await update(leadRef, { leadStatus: newStatus });

      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, leadStatus: newStatus } : item
      );
      setItems(updatedItems);
      calculateLeadCounts(updatedItems);

      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating lead status:", error.message);
      alert("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Inline styles for table cells
  const cellStyle = {
    whiteSpace: "nowrap", // Prevent text wrapping
    overflow: "hidden", // Hide overflowing content
    textOverflow: "ellipsis", // Add ellipsis for truncated text
    maxWidth: "150px", // Limit cell width
  };

  return (
    <div className="container my-4">
      <SummaryOrders
        interested={leadCounts.interested}
        onHold={leadCounts.onHold}
        newLead={leadCounts.newLead}
        totalLeads={leadCounts.totalLeads}
      />

      {items.length > 0 ? (
        <Table className="table table-bordered border-primary">
          <thead>
            <tr>
              <th style={cellStyle}>SR.No</th>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Phone</th>
              <th style={cellStyle}>Email</th>
              <th style={cellStyle}>Vehicle Model</th>
              <th style={cellStyle}>Reg. Number</th>
              <th style={cellStyle}>Policy Start</th>
              <th style={cellStyle}>Policy Expiry</th>
              <th style={cellStyle}>Current Provider</th>
              <th style={cellStyle}>Premium</th>
              <th style={cellStyle}>Lead Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle} title={item.name}>{item.name}</td>
                <td style={cellStyle} title={item.phone}>{item.phone}</td>
                <td style={cellStyle} title={item.email}>{item.email}</td>
                <td style={cellStyle} title={item.vehicleModel}>{item.vehicleModel}</td>
                <td style={cellStyle} title={item.regNumber}>{item.regNumber}</td>
                <td style={cellStyle} title={item.policyStart}>{item.policyStart}</td>
                <td style={cellStyle} title={item.policyExpiry}>{item.policyExpiry}</td>
                <td style={cellStyle} title={item.currentProvider}>{item.currentProvider}</td>
                <td style={cellStyle} title={item.premium}>{item.premium}</td>
                <td>
                  <select
                    value={item.leadStatus}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    disabled={loading}
                  >
                    <option value="Interested">Interested</option>
                    <option value="On Hold">On Hold</option>
                    <option value="New Lead">New Lead</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center">No leads available for now</p>
      )}
    </div>
  );
}

export default ItemList;
