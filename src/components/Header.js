import {React} from 'react';
import './Header.css';
import Logo from '../assets/crm.png'
import { Dropdown } from 'react-bootstrap';
import { FaPlus, FaUserCircle, FaBell, FaCog, FaQuestionCircle, FaArrowUp } from 'react-icons/fa'; 

const Header = ({ email, onAdd, onSignOut, onCopilotClick, onStaySignedIn, onUpgradeClick }) => {
  return (
    <div className="header">
      <img className="logo" src={Logo} height={60} alt="Logo"/>

      <div className="header-actions">
        <input
          type="text"
          placeholder="Search Here..."
          className="search-bar"
        />
        <FaPlus className="plus-icon" onClick={onAdd} />
        
        
        <FaBell className="icon" title="Notifications" />
        
    
        <FaCog className="icon" title="Settings" />
        
        
        <FaQuestionCircle className="icon" title="Help" />
        
      
        <button className="upgrade-btn" onClick={onUpgradeClick}>
          Upgrade <FaArrowUp />
        </button>

        
        <button className="copilot-btn" onClick={onCopilotClick}>
          Copilot
        </button>

        <Dropdown align="end">
          <Dropdown.Toggle
            variant="outline-primary"
            id="dropdown-profile"
            className="profile-icon"
          >
            <FaUserCircle size={24} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item disabled>{email}</Dropdown.Item> 
            <Dropdown.Divider />
            <Dropdown.Item onClick={onStaySignedIn}>Stay Signed In</Dropdown.Item> 
            <Dropdown.Item onClick={onSignOut}>Signout</Dropdown.Item>
 
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
