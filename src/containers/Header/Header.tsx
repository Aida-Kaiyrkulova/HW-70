import { Link } from 'react-router-dom';
import React from 'react';
import '..//..//App.css'

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/" className="logo">Contacts</Link>
          </li>
          <li>
            <Link to="/new" className="add-contact-btn">Add new contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;