import React, { useState, useEffect } from "react";
import { ref, get, getDatabase } from "firebase/database";

const AgentLeadList = ({ agentId, numberOfLeadsToShow }) => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      const database = getDatabase();
      const leadsRef = ref(database, "LeadList"); // Reference to the LeadList

      try {
        const snapshot = await get(leadsRef); // Fetch all leads
        const leadsData = snapshot.val();

        if (leadsData) {
          const allLeads = Object.keys(leadsData).map((leadId) => ({
            id: leadId,
            ...leadsData[leadId], // Combine lead ID with its data
          }));

          // Limit the number of leads to show based on numberOfLeadsToShow
          const limitedLeads = allLeads.slice(0, numberOfLeadsToShow);

          setLeads(limitedLeads); // Update the state with the fetched leads
        } else {
          setError("No leads available.");
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
        setError("Error fetching leads.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchLeads();
  }, [numberOfLeadsToShow]); // Dependency array includes numberOfLeadsToShow

  if (isLoading) {
    return <p>Loading leads...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Assigned Leads</h2>
      {leads.length > 0 ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Vehicle Model</th>
                <th style={styles.th}>Reg. Number</th>
                <th style={styles.th}>Policy Start</th>
                <th style={styles.th}>Policy Expiry</th>
                <th style={styles.th}>Current Provider</th>
                <th style={styles.th}>Premium</th>
                <th style={styles.statusTh}>Status</th> {/* Custom width for Status */}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={lead.id} style={styles.tr}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{lead.name}</td>
                  <td style={styles.td}>{lead.email}</td>
                  <td style={styles.td}>{lead.phone}</td>
                  <td style={styles.td}>{lead.vehicleModel}</td>
                  <td style={styles.td}>{lead.regNumber}</td>
                  <td style={styles.td}>{lead.policyStart}</td>
                  <td style={styles.td}>{lead.policyExpiry}</td>
                  <td style={styles.td}>{lead.currentProvider}</td>
                  <td style={styles.td}>{lead.premium}</td>
                  <td style={styles.statusTd}>
                    <select style={styles.select}>
                      <option
                        value="completed"
                        selected={lead.status === "completed"}
                      >
                        Completed
                      </option>
                      <option
                        value="onprocess"
                        selected={lead.status === "onprocess"}
                      >
                        On Process
                      </option>
                      <option
                        value="finished"
                        selected={lead.status === "finished"}
                      >
                        Finished
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={styles.noLeads}>No leads available.</p>
      )}
    </div>
  );
};

export default AgentLeadList;

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  tableWrapper: {
    overflowX: "auto", // Makes the table horizontally scrollable
    maxHeight: "500px", // Adjust the height as needed
    overflowY: "auto", // Makes the table vertically scrollable if content overflows
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  th: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
  },
  statusTh: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    textAlign: "left",
  },
  statusTd: {
    padding: "12px",
  },
  noLeads: {
    textAlign: "center",
    color: "#666",
  },
  select: {
    padding: "8px",
    width: "230px", // Set the width of the dropdown to 230px
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    fontSize: "14px",
  },
};
