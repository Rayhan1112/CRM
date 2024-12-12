import React, { useState, useEffect } from "react";
import axios from "axios";
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

  // Fetch leads on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leads");
        if (Array.isArray(response.data)) {
          setItems(response.data);
          calculateLeadCounts(response.data);
        } else {
          console.error("Unexpected response data", response.data);
        }
      } catch (error) {
        console.error("Error fetching items: ", error.message);
      }
    };

    fetchItems();
  }, []);

  // Calculate lead counts based on statuses
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

  // Handle lead status change
  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm("Are you sure you want to change the status?")) return;

    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/leads/${id}`, {
        leadStatus: newStatus,
      });

      const updatedLead = response.data.updatedLead;

      // Update items and recalculate lead counts
      const updatedItems = items.map((item) =>
        item._id === id ? { ...item, leadStatus: updatedLead.leadStatus } : item
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

  return (
    <div className="container my-4">
      <h2 className="mb-4" style={{ fontFamily: "lucida sans" }}>
        ALL VISITED PERSONS & THEIR DETAILS
      </h2>

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
              <th>SR.No</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Vehicle Model</th>
              <th>Reg. Number</th>
              <th>Policy Start</th>
              <th>Policy Expiry</th>
              <th>Current Provider</th>
              <th>Premium</th>
              <th>Lead Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.vehicleModel}</td>
                <td>{item.regNumber}</td>
                <td>{item.policyStart}</td>
                <td>{item.policyExpiry}</td>
                <td>{item.currentProvider}</td>
                <td>{item.premium}</td>
                <td>
                  <select
                    value={item.leadStatus}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
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
