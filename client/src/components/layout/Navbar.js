import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import "./MenuItems";
import logo from './WASPClogo3.png';
import { button } from './button';
import Dropdown from './Dropdown';

function NavBar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  return (
    <>
      <nav className="navbar">
        <NavLink exact to="/" className="nav-logo" onClick={closeMobileMenu}>
            <img className="imgLogo" src ={logo} alt = "WASPC logo"/>
            <i className="fas fa-code"></i>
        </NavLink>
        <div className="nav-container" onClick={handleClick}>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                    Dashboard
              </NavLink>
            </li>
            <li className="nav-item" 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
              <NavLink
                exact
                to="/EnterNewInmate"
                activeClassName="active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Enter New Inmate
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Search"
                activeClassName="active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Search
              </NavLink>
              
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/TransportList"
                activeClassName="active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Transport List
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}> - </i>
          </div>
        </div>
       
      </nav>
    </>
  );
}

export default NavBar;