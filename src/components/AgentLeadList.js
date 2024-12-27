import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from "firebase/database";
import { Table } from 'react-bootstrap';
import database from '../firebaseConfig'; // Import Firebase configuration

function AgentLeadList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const dbRef = ref(database, 'AgentList'); // Reference to the 'AgentList' in Firebase
        const snapshot = await get(dbRef); // Fetch the data
        if (snapshot.exists()) {
          const data = snapshot.val(); // Get the data from snapshot
          const agentsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setAgents(agentsArray); // Set the agents data in state
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error('Error fetching agent leads from Firebase:', error);
        alert('Failed to fetch agent leads.');
      }
    };

    fetchAgents();
  }, []);

  return (
    <div>
      <h2>Agent Lead List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Lead Status</th>
            <th>Assigned Leads</th>
          </tr>
        </thead>
        <tbody>
          {agents.length > 0 ? (
            agents.map((agent, index) => (
              <tr key={index}>
                <td>{agent.id}</td>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>{agent.password}</td>
                <td>{agent.leadStatus}</td>
                <td>{agent.assignedLeads}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default AgentLeadList;