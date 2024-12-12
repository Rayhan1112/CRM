
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap'; // Bootstrap table for displaying data

function AgentLeadList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agents');
        setAgents(response.data); // Store the fetched data
      } catch (error) {
        console.error('Error fetching agent leads:', error);
        alert('Failed to fetch agent leads.');
      }
    };

    fetchAgents();
  }, []); // Empty dependency array means this effect runs once when the component mounts

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
          {agents.map((agent, index) => (
            <tr key={index}>
              <td>{agent.id}</td> {/* Display agent ID */}
              <td>{agent.name}</td>
              <td>{agent.email}</td>
              <td>{agent.password || 'N/A'}</td> {/* Display agent password */}
              <td>{agent.leadStatus}</td>
              <td>{agent.assignedLeads || 'N/A'}</td> {/* Display assigned leads or default to 'N/A' */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AgentLeadList;




