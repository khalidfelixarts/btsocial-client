import React from "react";
import "./header.scss";
// import logo from "../../../assets/images/logo.jpg";
import { FaRegBell, FaCaretDown, FaRegEnvelope } from "react-icons/fa";
import Avatar from "../../../components/avatar/Avatar";

const Header = () => {
  return (
    <div className="header-nav-wrapper">
      <div className="header-navbar">
        <div className="header-image">
          {/* <img src={logo} className="img-fluid" alt="" /> */}
          <div className="app-name">
            BTsocial
            <span className="environment">DEV</span>
          </div>
        </div>
        <div className="header-menu-toggle">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className="header-nav">
          <li className="header-nav-item active-item">
            <span className="header-list-name">
              <FaRegBell className="header-list-icon" />
              <span className="bg-danger-dots dots"></span>
            </span>
            <ul className="dropdown-ul">
              <li className="dropdown-li">{/* Notification Drop down */}</li>
            </ul>
            &nbsp;
          </li>
          <li className="header-nav-item active-item">
            <span className="header-list-name">
              <FaRegEnvelope className="header-list-icon" />
              <span className="bg-danger-dots dots"></span>
            </span>
            &nbsp;
          </li>
          <li className="header-nav-item">
            <span className="header-list-name profile-image">
              <Avatar
                name="Khalid"
                bgColor="#695CFE"
                textColor="#fff"
                size={40}
                avatarSrc=""
              />
            </span>
            <span className="header-list-name profile-name">
              Khalid
              <FaCaretDown className="header-list-icon caret" />
            </span>
            <ul className="dropdown-ul">
              <li className="dropdown-li"></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
