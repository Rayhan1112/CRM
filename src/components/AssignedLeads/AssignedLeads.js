import React, { useState, useEffect } from "react";
import { ref, get, getDatabase } from "firebase/database";

const AgentLeadList = ({ agentId }) => {
  const [assignedLeads, setAssignedLeads] = useState([]);
  const [leadCount, setLeadCount] = useState(0);

  useEffect(() => {
    const database = getDatabase();
    
    // Reference to the assigned leads for the agent
    const assignedLeadsRef = ref(database, `AgentList/${agentId}/assignedLeads`);

    // Fetch assigned leads
    get(assignedLeadsRef).then((snapshot) => {
      const assignedLeadsData = snapshot.val();
      
      if (assignedLeadsData) {
        // Get the count of assigned leads
        const leadIds = Object.keys(assignedLeadsData);
        setLeadCount(leadIds.length); // Update lead count
        
        // Fetch details for each assigned lead
        const fetchLeadDetails = async () => {
          // Use Promise.all to ensure all leads are fetched before setting the state
          const leads = await Promise.all(
            leadIds.map(async (leadId) => {
              const leadRef = ref(database, `LeadList/${leadId}`);
              const leadSnapshot = await get(leadRef);
              const leadData = leadSnapshot.val();
              if (leadData) {
                return { id: leadId, ...leadData };
              }
            })
          );
          // Filter out any undefined values in case some leads were not found
          setAssignedLeads(leads.filter(Boolean)); // Update state with the fetched leads
        };

        fetchLeadDetails();
      } else {
        setAssignedLeads([]); // No leads assigned
        setLeadCount(0);
      }
    });
  }, [agentId]);

  return (
    <div>
      <h2>Your Assigned Leads</h2>
      {leadCount > 0 ? (
        <>
          <p>You have {leadCount} lead{leadCount > 1 ? 's' : ''} assigned to you.</p>
          <ul>
            {assignedLeads.map((lead, index) => (
              <li key={lead.id}>
                <p>Lead {index + 1}:</p>
                <p>Name: {lead.name}</p>
                <p>Email: {lead.email}</p>
                <p>Phone: {lead.phone}</p>
                <p>Status: {lead.status}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No leads assigned to you.</p>
      )}
    </div>
  );
};

export default AgentLeadList;
