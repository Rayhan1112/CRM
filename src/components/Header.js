// import {React} from 'react';
// import './Header.css';
// import Logo from '../assets/CRMLOGO.png'
// import { Dropdown } from 'react-bootstrap';
// import { FaPlus, FaUserCircle, FaBell, FaCog, FaQuestionCircle, FaArrowUp } from 'react-icons/fa'; 

// const Header = ({ email, onAdd, onSignOut, onCopilotClick, onStaySignedIn, onUpgradeClick }) => {
//   return (
//     <div className="header">
//       <img className="logo" src={Logo} height={60} alt="Logo" style={{opacity:'revert'}}/>

//       <div className="header-actions">
//         <input
//           type="text"
//           placeholder="Search Here..."
//           className="search-bar"
//         />
//         <FaPlus className="plus-icon" onClick={onAdd} />
        
        
//         <FaBell className="icon" title="Notifications" />
        
    
//         <FaCog className="icon" title="Settings" />
        
        
//         <FaQuestionCircle className="icon" title="Help" />
        
      
//         <button className="upgrade-btn" onClick={onUpgradeClick}>
//           Upgrade <FaArrowUp />
//         </button>

        
//         <button className="copilot-btn" onClick={onCopilotClick}>
//           Copilot
//         </button>

//         <Dropdown align="end">
//           <Dropdown.Toggle
//             variant="outline-primary"
//             id="dropdown-profile"
//             className="profile-icon"
//           >
//             <FaUserCircle size={24} />
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item disabled>{email}</Dropdown.Item> 
//             <Dropdown.Divider />
//             <Dropdown.Item onClick={onStaySignedIn}>Stay Signed In</Dropdown.Item> 
//             <Dropdown.Item onClick={onSignOut}>Signout</Dropdown.Item>
 
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </div>
//   );
// };

// export default Header;
import React from 'react';
import './Header.css';
import Logo from '../assets/CRMLOGO.png';
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { FaPlus, FaUserCircle, FaBell, FaCog, FaQuestionCircle, FaArrowUp } from 'react-icons/fa';

const Header = ({ email, onAdd, onSignOut, onCopilotClick, onStaySignedIn, onUpgradeClick }) => {
  return (
    <Navbar  expand="lg" sticky="top" className="header-navbar">
      <Navbar.Brand href="#" className="d-flex align-items-center justify-content-center">
        <img src={Logo} height={60} alt="Logo" className="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-100 d-flex justify-content-between align-items-center">
          <Form className="search-form">
            <FormControl
              type="text"
              placeholder="Search Here..."
              className="search-bar"
            />
          </Form>
          <FaPlus className="icon plus-icon" onClick={onAdd} />
          <FaBell className="icon" title="Notifications" />
          <FaCog className="icon" title="Settings" />
          <FaQuestionCircle className="icon" title="Help" />
          <Button className="upgrade-btn" onClick={onUpgradeClick}>
            Upgrade <FaArrowUp />
          </Button>
          <Button className="copilot-btn" onClick={onCopilotClick}>
            Copilot
          </Button>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="outline-dark"
              id="dropdown-profile"
              className="profile-icon"
              style={{marginRight:'3px'}}
            >
              <FaUserCircle size={24} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item disabled>{email}</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onStaySignedIn}>Stay Signed In</Dropdown.Item>
              <Dropdown.Item onClick={onSignOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
