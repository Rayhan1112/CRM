import React, { useState } from 'react';
import { getDatabase, ref,set, push } from "firebase/database";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import database from '../firebaseConfig'; // Adjust the path if necessary
import './AgentLead.css';

function AgentLead() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    agentLead: 'Active', // Ensure this is 'agentLead' and not 'agentlead'
    assignedLeads: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const dbRef = ref(database, 'AgentList'); // Reference to 'AgentList' root
      const newAgentRef = push(dbRef); // Generate a new reference with a unique push ID
      const pushId = newAgentRef.key; // Get the push ID
  
      // Add the push ID to the form data
      const agentData = {
        ...formData,
        id: pushId, // Store the push ID in the data
      };
  
      // Push data to Firebase
      await set(newAgentRef, agentData); // Use `set` instead of `push` to explicitly set the data
  
      alert('Agent lead added successfully!');
      setFormData({ id: '', name: '', email: '', password: '', agentLead: 'Active', assignedLeads: '' }); // Reset form
    } catch (error) {
      console.error('Error adding agent lead:', error);
      alert('Failed to add agent lead.');
    }
  };

  return (
    <div className="agent-lead-container">
      <div className="form-container">
        <h2>Agent Lead Form</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="id">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="agentLead">
            <Form.Label>Agent Lead Status</Form.Label>
            <Form.Control
              as="select"
              name="agentLead" // Ensure this matches the state key 'agentLead'
              value={formData.agentLead} // Ensure this matches the state key 'agentLead'
              onChange={handleChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="assignedLeads">
            <Form.Label>Assigned Leads</Form.Label>
            <Form.Control
              type="text"
              name="assignedLeads"
              value={formData.assignedLeads}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="danger" type="submit">
            Submit
          </Button>
        </Form>
      </div>

      <div className="preview-container">
        <h3>Agent Preview</h3>
        <div>
          <p><strong>ID:</strong> {formData.id}</p>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Password:</strong> {formData.password}</p>
          <p><strong>Lead Status:</strong> {formData.agentLead}</p> {/* Corrected the field to agentLead */}
          <p><strong>Assigned Leads:</strong> {formData.assignedLeads}</p>
        </div>
      </div>
    </div>
  );
}

export default AgentLead;

