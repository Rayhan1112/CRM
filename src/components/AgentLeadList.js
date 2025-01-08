import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from "firebase/database";
import { Table } from 'react-bootstrap';
import database from '../firebaseConfig'; // Import Firebase configuration
import './AgentLeadList.css'; // Import the external CSS file

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
    <div className="agent-lead-list">
  <h2 className="agent-lead-list-title">Agent Lead List</h2>
  <div className="agent-lead-list-table-wrapper">
    <Table striped bordered hover className="agent-lead-list-table">
      <thead className="agent-lead-list-thead">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Agent Status</th>
          <th>Assigned Leads</th>
        </tr>
      </thead>
      <tbody className="agent-lead-list-tbody">
        {agents.length > 0 ? (
          agents.map((agent, index) => (
            <tr key={index} className="agent-lead-list-row">
              <td>{agent.id}</td>
              <td>{agent.name}</td>
              <td>{agent.email}</td>
              <td>{agent.password}</td>
              <td>{agent.agentLead || 'Not Available'}</td>
              <td>
                {Array.isArray(agent.assignedLeads)
                  ? agent.assignedLeads.join(', ')
                  : agent.assignedLeads || 'None'}
              </td>
            </tr>
          ))
        ) : (
          <tr className="agent-lead-list-empty">
            <td colSpan="6" style={{ textAlign: 'center' }}>
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
</div>

  );
}

export default AgentLeadList;
