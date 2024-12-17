import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function AgentLeadList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agents');
        console.log('Fetched Agents:', response.data); // Debug log
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching agent leads:', error);
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
