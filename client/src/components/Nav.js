import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {

  render() {
    return (
      <header className="header menu_fixed">
        <div id="logo">
          <NavLink to="/">
            <h2>RECEPT & NUTRITION</h2>
          </NavLink>
        </div>
        <ul id="top_menu">
          <li><NavLink className="login" title="Sign In" style={{color: "#ffffff"}} to="/login">Sign In</NavLink></li>
        </ul>
        <a href="menu" className="btn_mobile">
          <div className="hamburger hamburger--spin" id="hamburger">
            <div className="hamburger-box">
              <div className="hamburger-inner"></div>
            </div>
          </div>
        </a>
        <nav id="menu" className="main-menu">
          <ul>
            <li><NavLink style={{color: "#ffffff"}} to="/admin">Write a recipe</NavLink></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Nav;
