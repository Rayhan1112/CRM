import React, { useState, useEffect } from "react";
import { ref, get, update, getDatabase } from "firebase/database"; // Import Firebase Realtime Database methods
import database from "../firebaseConfig"; // Import the Firebase config
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ItemList.css"; // Import CSS
import SummaryOrders from "./SummaryOrders";
import CryptoJS from 'crypto-js'
const ENCRYPTION_KEY = 'PTW2025'; // Encryption key


function ItemList() {
  const [items, setItems] = useState([]);
  const [leadCounts, setLeadCounts] = useState({
    interested: 0,
    onHold: 0,
    newLead: 0,
    totalLeads: 0,
  });
  const [loading, setLoading] = useState(false);

  // Function to decrypt data
  const decryptData = (encryptedData) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  
      if (!decryptedString) {
        throw new Error("Decryption failed: Invalid encrypted data or key.");
      }
  
      return JSON.parse(decryptedString);
    } catch (error) {
      console.error("Decryption error:", error.message);
      return null; // Return null if decryption fails
    }
  };
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const db = getDatabase();
        const dbRef = ref(db, "LeadList");
        const snapshot = await get(dbRef);
  
        if (snapshot.exists()) {
          const data = snapshot.val();
          const leadsArray = Object.keys(data).map((key) => {
            const encryptedData = data[key]; // Encrypted data from Firebase
            console.log("Encrypted Data:", encryptedData); // Log encrypted data
  
            const decryptedData = decryptData(encryptedData); // Decrypt the data
            console.log("Decrypted Data:", decryptedData); // Log decrypted data
  
            return {
              id: key,
              ...decryptedData, // Spread decrypted data into the object
            };
          });
          setItems(leadsArray); // Set the decrypted leads data in state
        } else {
          console.log("No leads available.");
        }
      } catch (error) {
        console.error("Error fetching leads: ", error.message);
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
      const leadRef = ref(database, `LeadList/${id}`);
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

  return (
    <div className="container my-4">
      <SummaryOrders
        interested={leadCounts.interested}
        onHold={leadCounts.onHold}
        newLead={leadCounts.newLead}
        totalLeads={leadCounts.totalLeads}
      />

      {items.length > 0 ? (
        <div className="table-container">
          <Table  responsive="sm" className="table table-bordered border-primary">
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
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td title={item.name}>{item.name}</td>
                  <td title={item.phone}>{item.phone}</td>
                  <td title={item.email}>{item.email}</td>
                  <td title={item.vehicleModel}>{item.vehicleModel}</td>
                  <td title={item.regNumber}>{item.regNumber}</td>
                  <td title={item.policyStart}>{item.policyStart}</td>
                  <td title={item.policyExpiry}>{item.policyExpiry}</td>
                  <td title={item.currentProvider}>{item.currentProvider}</td>
                  <td title={item.premium}>{item.premium}</td>
                  <td>
                    <select
                      value={item.leadStatus}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
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
        </div>
      ) : (
        <p className="text-center">No leads available for now</p>
      )}
    </div>
  );
}

export default ItemList;
