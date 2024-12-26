
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import "@fontsource/lexend-deca"; // Defaults to weight 400
import "@fontsource/lexend-deca/400.css"; // Weight 400
import "@fontsource/lexend-deca/700.css"; // Weight 700





const formStyle = {
  fontFamily: 'Lexend Deca ',
  fontWeight:900,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  maxWidth: "700px",
  padding: "20px",
   backgroundColor: "white",
 

  borderRadius: "12px",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  width: "100%",
};
const formContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '20px',
};
const previewStyle = {
  fontFamily: 'Lexend Deca ',
  flex: 1,
  background: 'white',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
};

const cardStyle = {
  marginTop: '20px',
  background: '#F8FAFC',
  borderRadius: '8px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
  padding: '10px',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'black',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
};

const animatedTextStyle = {
  fontSize: '16px',
  color: 'black',
  fontWeight: 'bold',
  animation: 'fadeIn 1s ease-in-out',
  textShadow: '0 1px 3px rgba(0, 123, 255, 0.5)',
};

const formRowDoubleStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  width: "100%",
  flexWrap: "wrap",
};

const inputWrapperStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "900",
  textAlign: "left",
  color: "black",
 
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #9AA6B2",
  borderRadius: "0px",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  backgroundColor:'#F5F8FA'
};

const selectStyle = { ...inputStyle };

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  width: "100%",
};


function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [policyStart, setPolicyStart] = useState("");
  const [policyExpiry, setPolicyExpiry] = useState("");
  const [currentProvider, setCurrentProvider] = useState("");
  const [premium, setPremium] = useState("");
  const [leadStatus, setLeadStatus] = useState("New Lead");
  const [importedData, setImportedData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const wb = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        let data = XLSX.utils.sheet_to_json(sheet);
  
        // Filter out rows with entirely empty values
        data = data.filter((row) =>
          Object.values(row).some(
            (value) => value !== null && value !== undefined && value.toString().trim() !== ""
          )
        );
  
        if (data.length > 0) {
          setImportedData(data);
          setShowPopup(true);
        } else {
          alert("The uploaded file does not contain valid data. Please check the file and try again.");
        }
      };
      reader.readAsBinaryString(file);
    }
  };
  
  const handleBulkSubmit = async () => {
    setLoading(true);
  
    if (importedData.length === 0) {
      alert("No data to submit. Please upload a valid file first.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(importedData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit leads");
      }
  
      setImportedData([]);
      setShowPopup(false);
      alert("Data submitted successfully!");
      console.log(importedData);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
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
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      alert("Lead submitted successfully!");
      setName("");
      setPhone("");
      setEmail("");
      setVehicleModel("");
      setRegNumber("");
      setPolicyStart("");
      setPolicyExpiry("");
      setCurrentProvider("");
      setPremium("");
      setLeadStatus("New Lead");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "12px",
    padding: "20px",
    zIndex: 1000,
    maxWidth: "80%",
    overflowY: "auto",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  };

  return (
    <div>
      <div>
        <div style={formContainerStyle}>
          <div style={formStyle}>
            <h2 style={{ textAlign: "center", fontSize: "22px", fontWeight: "bolder" }}>Lead Form</h2>
            <form onSubmit={handleFormSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label style={labelStyle} htmlFor="excel-upload">Upload Excel File:</label>
                <input
                  type="file"
                  id="excel-upload"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  style={inputStyle}
                />
              </div>

              {/* Form fields */}
              <div style={formRowDoubleStyle}>
                <div style={inputWrapperStyle}>
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
                <div style={inputWrapperStyle}>
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
              </div>
              <div style={formRowDoubleStyle}>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="email">Email ID:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          </div>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="vehicle-model">Vehicle Model:</label>
            <input type="text" id="vehicle-model" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} required style={inputStyle} />
          </div>
        </div>

        <div style={formRowDoubleStyle}>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="reg-number">Registration No:</label>
            <input type="text" id="reg-number" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} required style={inputStyle} />
          </div>
          <div style={inputWrapperStyle}>
            <label            style={labelStyle} htmlFor="policy-start">Policy Start Date:</label>
            <input
              type="date"
              id="policy-start"
              value={policyStart}
              onChange={(e) => setPolicyStart(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
        </div>

        <div style={formRowDoubleStyle}>
          <div style={inputWrapperStyle}>
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
          <div style={inputWrapperStyle}>
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
        </div>

        <div style={formRowDoubleStyle}>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="premium">Premium:</label>
            <input
              type="number"
              id="premium"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="lead-status">Lead Status:</label>
            <select
              id="lead-status"
              value={leadStatus}
              onChange={(e) => setLeadStatus(e.target.value)}
              style={selectStyle}
              required
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
        </div>

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
          
        </button>
      </form>
        {/* Preview Section */}
        
        </div>
    <div className="col-md-5" style={previewStyle}>
    <div className="card" style={cardStyle}>
      <div className="card-body">
        <h5 className="card-title" style={titleStyle}>Lead Preview</h5>
        <p>
          <strong>Name:</strong>{' '}
          <span style={animatedTextStyle}>{name || 'Type Name...'}</span>
        </p>
        <p>
          <strong>Phone:</strong>{' '}
          <span style={animatedTextStyle}>{phone || 'Type Phone...'}</span>
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <span style={animatedTextStyle}>{email || 'Type Email...'}</span>
        </p>
        <p>
          <strong>Vehicle Model:</strong>{' '}
          <span style={animatedTextStyle}>{vehicleModel || 'Type Vehicle Model...'}</span>
        </p>
        <p>
          <strong>Registration No:</strong>{' '}
          <span style={animatedTextStyle}>{regNumber || 'Type Registration No...'}</span>
        </p>
        <p>
          <strong>Policy Start Date:</strong>{' '}
          <span style={animatedTextStyle}>{policyStart || 'Select Policy Start Date...'}</span>
        </p>
        <p>
          <strong>Policy Expiry Date:</strong>{' '}
          <span style={animatedTextStyle}>{policyExpiry || 'Select Policy Expiry Date...'}</span>
        </p>
        <p>
          <strong>Current Provider:</strong>{' '}
          <span style={animatedTextStyle}>{currentProvider || 'Type Current Provider...'}</span>
        </p>
        <p>
          <strong>Premium:</strong>{' '}
          <span style={animatedTextStyle}>{premium || 'Enter Premium...'}</span>
        </p>
        <p>
          <strong>Lead Status:</strong>{' '}
          <span style={animatedTextStyle}>{leadStatus || 'Set Lead Status...'}</span>
        </p>
      </div>
    </div>
  </div>
        </div>
        
      </div>

      {/* Excel Data Popup */}
      {
  showPopup && importedData.length > 0 && (
    <>
      <div style={overlayStyle} onClick={closePopup}></div>
      <div style={popupStyle}>
        <h3 style={{ textAlign: "center" }}>Imported Excel Data</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {Object.keys(importedData[0]).map((key) => (
                <th
                  key={key}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {importedData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td
                    key={idx}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={handleBulkSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Excel Data"}
        </button>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          onClick={closePopup}
        >
          Cancel
        </button>
      </div>
    </>
      )}
    </div>
  );
}

export default ItemForm;
