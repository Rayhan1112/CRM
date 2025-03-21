import React from 'react';
import './Sidebar.css';
import { FaPlusCircle, FaBox, FaListAlt, FaUserTie } from 'react-icons/fa'; // Importing icons from react-icons
import Button from 'react-bootstrap/Button';

function Sidebar({ setActiveSection, userType }) {
  return (
    <div className="sidebar">
      {/* Admin-specific buttons with icons */}
      {userType === 'admin' && (
        <>
          <Button
            onClick={() => setActiveSection('addItem')}
            className="sidebar-button"
            title="Add Item" // Tooltip text
             variant='outline-success'
          >
            <FaPlusCircle size={20} /> {/* Icon for "Add Item" */}
          </Button>
          <Button
            onClick={() => setActiveSection('orders')}
            className="sidebar-button"
            title="Orders" // Tooltip text 
            variant='outline-success'
          >
            <FaBox  size={20} /> {/* Icon for "Orders" */}
          </Button>
          <Button
            onClick={() => setActiveSection('listItems')}
            className="sidebar-button"
            title="List Items" // Tooltip text
             variant='outline-success'
          >
            <FaListAlt  size={20} /> {/* Icon for "List Items" */}
          </Button>
          <Button
            onClick={() => setActiveSection('agentlead')}
            className="sidebar-button"
            title="Agent Lead" // Tooltip text
             variant='outline-success'
          >
            <FaUserTie  size={20} /> {/* Icon for "Agent Lead" */}
          </Button>
          <Button
            onClick={() => setActiveSection('agentleadlist')}
            className="sidebar-button"
            title="Agent Lead List" // Tooltip text
             variant='outline-success'
          >
            <FaListAlt  size={20} /> {/* Icon for "Agent Lead List" */}
          </Button>
        </>
      )}

      {/* Agent-specific button for Orders */}
      {userType === 'agent' && (
        <Button
          onClick={() => setActiveSection('assigned')}
          className="sidebar-button"
          title="Orders" // Tooltip text
        >
          <FaBox /> {/* Icon for "Orders" */}
        </Button>
       
      )}
    </div>
  );
}

export default Sidebar;
