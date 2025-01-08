import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import * as XLSX from "xlsx";
import database from "../firebaseConfig"; // Assuming you have exported the Firebase instance in this file
import Swal from 'sweetalert2';

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

  const formStyle = {
    fontFamily: 'Lexend Deca ',
    fontWeight: 900,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "700px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    marginLeft:"-40px"
  };

  const formContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
    flexWrap: 'wrap',
  };

  const previewStyle = {
    fontFamily: 'Lexend Deca ',
    flex: 1,
    background: 'white',
    borderRadius: '8px',
    padding: '20px',
    backdropFilter: 'blur(5px)',
    maxWidth: '100%',
    width: '100%',
    boxSizing: 'border-box',
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
    backgroundColor: '#F5F8FA',
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

  const sanitizeKeys = (data) => {
    const keyMapping = {
      "Name": "name",                 // Mapping for name
      "Phone": "phone",               // Mapping for phone
      "Email": "email",               // Mapping for email
      "Reg_ Number": "regNumber",     // Mapping for regNumber
      "Vehicle Model": "vehicleModel", // Mapping for vehicleModel
      "Policy Start": "policyStart",  // Mapping for policyStart
      "Policy Expiry": "policyExpiry", // Mapping for policyExpiry
      "Current Provider": "currentProvider",
      "Premium": "premium",
       // Mapping for currentProvider
      "Lead Status": "leadStatus",    // Mapping for leadStatus
      // Add more mappings as necessary
    };
  
    const sanitizedData = {};
    Object.keys(data).forEach((key) => {
      const sanitizedKey = keyMapping[key] || key.replace(/[.#$/[\]]/g, "_").trim();
      sanitizedData[sanitizedKey] = data[key];
    });
    return sanitizedData;
  };
  
  

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
          // Sanitize all rows
          const sanitizedData = data.map(sanitizeKeys);
          setImportedData(sanitizedData);
          setShowPopup(true);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'The uploaded file does not contain valid data. Please check the file and try again.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleBulkSubmit = async () => {
    setLoading(true);

    if (importedData.length === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'No data to submit. Please upload a valid file first.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      setLoading(false);
      return;
    }

    try {
      const db = getDatabase();
      const leadsRef = ref(db, "LeadList");

      importedData.forEach((lead) => {
        const sanitizedLead = sanitizeKeys(lead);
        const newLeadRef = push(leadsRef);
        set(newLeadRef, sanitizedLead);
      });

      setImportedData([]);
      setShowPopup(false);
      Swal.fire({
        title: 'Success!',
        text: 'Data Submitted Successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      console.error("Error submitting data: ", error);
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
      const db = getDatabase();
      const leadsRef = ref(db, "LeadList");
      const newLeadRef = push(leadsRef);
      await set(newLeadRef, sanitizeKeys(leadData)); // Sanitize keys before submission

      Swal.fire({
        title: 'Success!',
        text: 'Lead Added',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
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
      console.error("Error submitting lead: ", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
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
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={inputWrapperStyle}>
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
              </div>

              <div style={formRowDoubleStyle}>
                <div style={inputWrapperStyle}>
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
                <div style={inputWrapperStyle}>
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
                  <label style={labelStyle} htmlFor="current-provider">Current Insurance Provider:</label>
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
                    type="text"
                    id="premium"
                    value={premium}
                    onChange={(e) => setPremium(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={inputWrapperStyle}>
                  <label style={labelStyle} htmlFor="leadStatus">Lead Status:</label>
                  <select
                    id="leadStatus"
                    value={leadStatus}
                    onChange={(e) => setLeadStatus(e.target.value)}
                    required
                    style={selectStyle}
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Interested">Interested</option>
                    <option value="On-Hold">On Hold</option>
                  </select>
                </div>
            

              <button type="submit" style={buttonStyle} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Lead'}
              </button>
            </form>
          </div>
          

          <div style={previewStyle}>
            <h2 style={titleStyle}>Lead Preview</h2>
            <div style={cardStyle}>
              <p style={animatedTextStyle}><strong>Name:</strong> {name}</p>
              <p style={animatedTextStyle}><strong>Phone:</strong> {phone}</p>
              <p style={animatedTextStyle}><strong>Email:</strong> {email}</p>
              <p style={animatedTextStyle}><strong>Vehicle Model:</strong> {vehicleModel}</p>
              <p style={animatedTextStyle}><strong>Registration No:</strong> {regNumber}</p>
              <p style={animatedTextStyle}><strong>Policy Start Date:</strong> {policyStart}</p>
              <p style={animatedTextStyle}><strong>Policy Expiry Date:</strong> {policyExpiry}</p>
              <p style={animatedTextStyle}><strong>Current Provider:</strong> {currentProvider}</p>
              <p style={animatedTextStyle}><strong>Premium:</strong> {premium}</p>
              <p style={animatedTextStyle}><strong>Lead Status:</strong> {leadStatus}</p>
            </div>
          </div>
        </div>
      </div>
      

      {showPopup && importedData.length > 0 && (
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

export default ItemForm;