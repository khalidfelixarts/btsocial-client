import React, { useState, useRef } from "react";
import "./header.scss";
// import logo from "../../../assets/images/logo.jpg";
import { FaRegBell, FaCaretDown, FaRegEnvelope } from "react-icons/fa";
import Avatar from "../../../components/avatar/Avatar";
import useDetectOutsideClick from "../../../hooks/useDetectOutsideClick";
import MessageSidebar from "../../../components/messageSidebar/MessageSidebar";
import { useSelector } from "react-redux";

const Header = () => {
  const { profile } = useSelector((state) => state.user);
  const messageRef = useRef(null);
  const [isMessageActive, setIsMessageActive] = useDetectOutsideClick(
    messageRef,
    false
  );

  const openChatPage = () => {};

  return (
    <>
      <div className="header-nav-wrapper">
        {isMessageActive && (
          <div ref={messageRef}>
            <MessageSidebar
              profile={profile}
              messageCount={0}
              messageNotifications={[]}
              openChatPage={openChatPage}
            />
          </div>
        )}
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
            <li
              className="header-nav-item active-item"
              onClick={() => {
                setIsMessageActive(false);
              }}
            >
              <span className="header-list-name">
                <FaRegBell className="header-list-icon" />
                <span className="bg-danger-dots dots"></span>
              </span>
              <ul className="dropdown-ul">
                <li className="dropdown-li">{/* Notification Drop down */}</li>
              </ul>
              &nbsp;
            </li>
            <li
              className="header-nav-item active-item"
              onClick={() => {
                setIsMessageActive(true);
              }}
            >
              <span className="header-list-name">
                <FaRegEnvelope className="header-list-icon" />
                <span className="bg-danger-dots dots"></span>
              </span>
              &nbsp;
            </li>
            <li className="header-nav-item">
              <span className="header-list-name profile-image">
                <Avatar
                  name={profile?.username}
                  bgColor={profile?.avatarColor}
                  textColor="#fff"
                  size={40}
                  avatarSrc={profile?.profilePicture}
                />
              </span>
              <span className="header-list-name profile-name">
                {profile?.username}
                <FaCaretDown className="header-list-icon caret" />
              </span>
              <ul className="dropdown-ul">
                <li className="dropdown-li"></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
