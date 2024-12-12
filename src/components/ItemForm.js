import React, { useState } from 'react';
import * as XLSX from 'xlsx';

// Function to convert Excel serial date to yyyy-mm-dd format
const excelSerialToDate = (serial) => {
  const startDate = new Date(1900, 0, 1); // Excel's epoch is January 1, 1900
  const date = new Date(startDate.getTime() + (serial - 2) * 86400000); // Subtract 2 to correct for Excel's leap year bug
  return date.toISOString().split('T')[0]; // Format as yyyy-mm-dd
};

function ItemForm({ onAddItem }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [policyStart, setPolicyStart] = useState('');
  const [policyExpiry, setPolicyExpiry] = useState('');
  const [currentProvider, setCurrentProvider] = useState('');
  const [premium, setPremium] = useState('');
  const [leadStatus, setLeadStatus] = useState('New Lead');
  
  const [importedData, setImportedData] = useState([]); // Store imported data for table
  const [loading, setLoading] = useState(false); // Loading state for submit

  // Handle Excel file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const wb = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = wb.SheetNames[0]; // Get the first sheet
            const sheet = wb.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);

            console.log(data); // Log the data for debugging

            // Set the imported data from the Excel sheet
            setImportedData(data);
        };
        reader.readAsBinaryString(file);
    }
  };

  const excelSerialToDate = (serial) => {
    const startDate = new Date(1900, 0, 1); // Excel's epoch is January 1, 1900
    const date = new Date(startDate.getTime() + (serial - 2) * 86400000); // Subtract 2 to correct for Excel's leap year bug
    return date.toISOString().split('T')[0]; // Format as yyyy-mm-dd
  };
  // Validate imported data
  const validateImportedData = (data) => {
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    return data.every(item => {
      // Convert serial numbers to date format if necessary
      if (item.policyStart && !dateRegex.test(item.policyStart)) {
        item.policyStart = excelSerialToDate(Number(item.policyStart));
      }
      if (item.policyExpiry && !dateRegex.test(item.policyExpiry)) {
        item.policyExpiry = excelSerialToDate(Number(item.policyExpiry));
      }


    // Ensure all required fields are valid
    return (
      item.name &&
      item.phone && phoneRegex.test(item.phone) &&
      item.email && emailRegex.test(item.email) &&
      item.vehicleModel &&
      item.regNumber &&
      item.policyStart && dateRegex.test(item.policyStart) &&
      item.policyExpiry && dateRegex.test(item.policyExpiry) &&
      item.currentProvider &&
      item.premium && !isNaN(item.premium) &&
      item.leadStatus && ['New Lead', 'Contacted', 'Interested', 'Quoted', 'Awaiting Response', 'Negotiation', 'Follow-up', 'Converted', 'Closed-Lost', 'On Hold', 'Policy Issued', 'Renewal'].includes(item.leadStatus)
    );
  });
};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newLead = {
      name,
      phone,
      email,
      vehicleModel,
      regNumber,
      policyStart,
      policyExpiry,
      currentProvider,
      premium,
      leadStatus,
    };

    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLead),
      });

      if (!response.ok) {
        throw new Error('Failed to submit lead');
      }

      const savedLead = await response.json();
      onAddItem(savedLead);
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle bulk submission
  const handleBulkSubmit = async () => {
    setLoading(true);
  
    // Check if there's data to submit
    if (importedData.length === 0) {
      alert('No data to submit. Please upload a valid file first.');
      setLoading(false);
      return;
    }
  
    // Validate imported data
    if (!validateImportedData(importedData)) {
      alert('Some of the imported data is missing required fields.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(importedData), // Submit the parsed data
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit leads');
      }
  
      const result = await response.json();
      console.log(result); // Check the result after submitting
  
      setImportedData([]); // Reset imported data after bulk submission
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  // Reset form fields after submission
  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setVehicleModel('');
    setRegNumber('');
    setPolicyStart('');
    setPolicyExpiry('');
    setCurrentProvider('');
    setPremium('');
    setLeadStatus('New Lead');
  };

  // Form styles (unchanged)
  // const formStyle = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   gap: '20px',
  //   maxWidth: '600px',
  //  // margin: '50px auto', // Center the form on the page
  //   padding: '30px',
  //   backgroundColor: '#f9f9f9',
  //   borderRadius: '8px',
  //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  // };
  
  // const formRowStyle = {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   width: '100%',
  //   gap: '10px',
  //   marginBottom: '15px',
  // };
  
  // const labelStyle = {
  //   flex: '1',
  //   fontSize: '16px', // Consistent font size
  //   fontWeight: '500',
  //   textAlign: 'right',
  //   paddingRight: '10px',
  // };
  
  // const inputStyle = {
  //   flex: '2',
  //   padding: '10px',
  //   border: '1px solid #ddd',
  //   borderRadius: '4px',
  //   fontSize: '16px', // Match label font size
  //   outline: 'none',
  //   width: '100%',
  // };
  
  // const selectStyle = {
  //   ...inputStyle,
  // };
  
  // const buttonStyle = {
  //   padding: '12px 20px',
  //   backgroundColor: '#007bff',
  //   color: 'white',
  //   border: 'none',
  //   borderRadius: '4px',
  //   fontSize: '16px',
  //   cursor: 'pointer',
  //   transition: 'background-color 0.3s ease',
  // };
  
  // const buttonHoverStyle = {
  //   backgroundColor: '#0056b3',
  // };
  
  const formStyle = {
    fontFamily:"Times New Roman",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch', // Align all child elements to stretch to full width
    gap: '20px',
    maxWidth: '600px',
    padding: '10px',
    backgroundColor: '#f9f9f1',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
   // margin: '0 auto', // Center the form horizontally
  };
  
  const formRowStyle = {
    fontFamily:"Times New Roman",
    display: 'flex',
    flexDirection: 'column', // Stack label and input vertically
    width: '100%',
    gap: '10px',
  };
  
  const labelStyle = {
    fontFamily:"Times New Roman",
    // marginTop:"10px",
    fontSize: '13px', // Consistent font size
    fontWeight: '500',
    textAlign: 'left', // Align text to the left
    width: '100%',
   
    
  };
  
  const inputStyle = {
    fontFamily:"Times New Roman",
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    fontSize: '13px', // Match label font size
    outline: 'none',
    width: '100%', // Ensure full width
  };
  
  const selectStyle = {
    ...inputStyle, // Inherit the same style as input
  };
  
  const buttonStyle = {
    fontFamily:"Times New Roman",
   // marginTop:"10px",
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%', // Full width button
  };
  
  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };
  

  return (
   <div style={formStyle}>
  <h2 style={{ textAlign: 'center',fontSize:'22px', fontWeight:'bolder',fontFamily:'sans-serif' }}>Lead Form</h2>

  <form onSubmit={handleSubmit}>
    {/* File Upload */}
    <div style={formRowStyle}>
      <label style={labelStyle} htmlFor="excel-upload">Upload File:</label>
      <input
        type="file"
        id="excel-upload"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        style={inputStyle} />
    </div>

    {/* Name */}
    <div style={formRowStyle}>
      <label style={labelStyle} htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={inputStyle}
      />
    </div>

    {/* Phone Number */}
    <div style={formRowStyle}>
      <label style={labelStyle} htmlFor="phone">Phone Number:</label>
      <input
        type="tel"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        style={inputStyle}
      />
    </div>

    {/* Email */}
    <div style={formRowStyle}>
      <label style={labelStyle} htmlFor="email">Email ID:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
    </div>

    {/* Remaining Fields */}
    <div style={formRowStyle}>
      <label style={labelStyle} htmlFor="vehicle-model">Vehicle Model:</label>
      <input
        type="text"
        id="vehicle-model"
        value={vehicleModel}
        onChange={(e) => setVehicleModel(e.target.value)}
        required
        style={inputStyle}
      />
    </div>

    <div style={formRowStyle}>
      <label style={labelStyle} htmlFor="reg-number">Registration No:</label>
      <input
        type="text"
        id="reg-number"
        value={regNumber}
        onChange={(e) => setRegNumber(e.target.value)}
        required
        style={inputStyle}
      />
    </div>

    <div style={formRowStyle}>
      <label style={labelStyle} htmlFor="policy-start">Policy Start Date:</label>
      <input
        type="date"
        id="policy-start"
        value={policyStart}
        onChange={(e) => setPolicyStart(e.target.value)}
        required
        style={inputStyle}
      />
    </div>

    <div style={formRowStyle}>
      <label style={labelStyle} htmlFor="policy-expiry">Policy Expiry Date:</label>
      <input
        type="date"
        id="policy-expiry"
        value={policyExpiry}
        onChange={(e) => setPolicyExpiry(e.target.value)}
        required
        style={inputStyle}
      />
    </div>

    <div style={formRowStyle}>
      <label style={labelStyle} htmlFor="current-provider">Current Provider:</label>
      <input
        type="text"
        id="current-provider"
        value={currentProvider}
        onChange={(e) => setCurrentProvider(e.target.value)}
        required
        style={inputStyle}
      />
    </div>

    <div style={formRowStyle}>
      <label style={labelStyle} htmlFor="premium">Total Premium:</label>
      <input
        type="number"
        id="premium"
        value={premium}
        onChange={(e) => setPremium(e.target.value)}
        required
        style={inputStyle}
      />
    </div>

    <div style={formRowStyle}>
      <label style={labelStyle} htmlFor="lead-status">Lead Status:</label>
      <select
        id="lead-status"
        value={leadStatus}
        onChange={(e) => setLeadStatus(e.target.value)}
        required
        style={selectStyle}
      >
        <option value="New Lead">New Lead</option>
        <option value="Contacted">Contacted</option>
        <option value="Interested">Interested</option>
        <option value="Quoted">Quoted</option>
        <option value="Awaiting Response">Awaiting Response</option>
        <option value="Negotiation">Negotiation</option>
        <option value="Follow-up">Follow-up</option>
        <option value="Converted">Converted</option>
        <option value="Closed-Lost">Closed-Lost</option>
        <option value="On Hold">On Hold</option>
        <option value="Policy Issued">Policy Issued</option>
        <option value="Renewal">Renewal</option>
      </select>
    </div>

    {/* Submit Button */}
    <div>
      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  </form>
</div>

  );
}

export default ItemForm;
