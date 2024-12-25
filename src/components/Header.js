
import React from 'react';
import './Header.css';
import Logo from '../assets/CRMLOGO.png';
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { FaPlus, FaUserCircle, FaBell, FaCog, FaQuestionCircle, FaArrowUp } from 'react-icons/fa';
import "@fontsource/lexend-deca"; // Defaults to weight 400
import "@fontsource/lexend-deca/400.css"; // Weight 400
import "@fontsource/lexend-deca/700.css"; // Weight 700

const Header = ({ email, onAdd, onSignOut, onCopilotClick, onStaySignedIn, onUpgradeClick }) => {
  return (
    <Navbar  expand="lg" sticky="top" className="header-navbar">
      <Navbar.Brand href="#" className="d-flex align-items-center justify-content-center">
        <img src={Logo} height={40} alt="Logo" className="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-100 d-flex justify-content-between align-items-center">
          <Form className="search-form" >
            <FormControl
              type="text"
              placeholder="Search Here..."
              className="search-bar"
              style={{background:'#425B76'}}
            />
          </Form>
          <FaPlus className="icon plus-icon" onClick={onAdd} />
          <FaBell className="icon" title="Notifications" />
          <FaCog className="icon" title="Settings" />
          <FaQuestionCircle className="icon" title="Help" />
          <Button className="upgrade-btn" onClick={onUpgradeClick} variant='success'>
            Upgrade <FaArrowUp />
          </Button>
          <Button className="copilot-btn" onClick={onCopilotClick} variant='success'> 
            Copilot
          </Button>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="outline-light"
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
