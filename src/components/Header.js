import React from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
const Header = ({ userType, onSignOut }) => {
  return (
    <div className="header">
      <div className="logo">My Logo</div>
      <h1 style={{color:"black"}}>{userType === 'admin' ? 'Admin Dashboard' : 'Agent Dashboard'}</h1>
      {/* <Button onClick={onSignOut}>Sign Out</Button> */}
      <Button variant="outline-primary" onClick={onSignOut}>Signout</Button>
    </div>
  );
}

export default Header;