// import React, { useState } from 'react';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// function AgentLead() {
//   const [formData, setFormData] = useState({
//     id: '', // Field for ID
//     name: '',
//     email: '',
//     password: '', // Field for password
//     leadStatus: 'New Lead',
//     assignedLeads: '', // New field for assigned leads
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/agents', formData);
//       alert('Agent lead added successfully!');
//       console.log(response.data);
//       setFormData({ id: '', name: '', email: '', password: '', leadStatus: 'New Lead', assignedLeads: '' }); // Reset form
//     } catch (error) {
//       console.error('Error adding agent lead:', error);
//       alert('Failed to add agent lead.');
//     }
//   };

//   return (
//     <div>
//       <h2>Agent Lead Form</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="id">
//           <Form.Label>ID</Form.Label>
//           <Form.Control
//             type="text"
//             name="id"
//             value={formData.id}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="leadStatus">
//           <Form.Label>Lead Status</Form.Label>
//           <Form.Control
//             as="select"
//             name="leadStatus"
//             value={formData.leadStatus}
//             onChange={handleChange}
//             required
//           >
//             <option value="Interested">Interested</option>
//             <option value="On Hold">On Hold</option>
//             <option value="New Lead">New Lead</option>
//           </Form.Control>
//         </Form.Group>

//         <Form.Group controlId="assignedLeads">
//           <Form.Label>Assigned Leads</Form.Label>
//           <Form.Control
//             type="text"
//             name="assignedLeads"
//             value={formData.assignedLeads}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Button variant="danger" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default AgentLead;
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AgentLead() {
  const [formData, setFormData] = useState({
    id: '', // Field for ID
    name: '',
    email: '',
    password: '', 
    leadStatus: 'New Lead',
    assignedLeads: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Adjust the endpoint to match your new server setup
      const response = await axios.post('http://localhost:5000/api/agents', formData);
      alert('Agent lead added successfully!');
      console.log(response.data);
      setFormData({ id: '', name: '', email: '', password: '', leadStatus: 'New Lead', assignedLeads: '' }); // Reset form
    } catch (error) {
      console.error('Error adding agent lead:', error);
      alert('Failed to add agent lead.');
    }
  };

  return (
    <div>
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

        <Form.Group controlId="leadStatus">
          <Form.Label>Lead Status</Form.Label>
          <Form.Control
            as="select"
            name="leadStatus"
            value={formData.leadStatus}
            onChange={handleChange}
            required
          >
            <option value="Interested">Interested</option>
            <option value="On Hold">On Hold</option>
            <option value="New Lead">New Lead</option>
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
  );
}

export default AgentLead;
