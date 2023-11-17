import React, { useState, useRef } from "react";
import "./header.scss";
// import logo from "../../../assets/images/logo.jpg";
import {
  FaRegBell,
  FaCaretDown,
  FaRegEnvelope,
  FaCaretUp,
} from "react-icons/fa";
import Avatar from "../../../components/avatar/Avatar";
import useDetectOutsideClick from "../../../hooks/useDetectOutsideClick";
import MessageSidebar from "../../../components/messageSidebar/MessageSidebar";
import Dropdown from "../../../components/dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../../../services/utils/utils.service";
import useEffectOnce from "../../../hooks/useEffectOnce";
import { ProfileUtils } from "../../../services/utils/utils.profile.service";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import useSessionStorage from "../../../hooks/useSessionStorage";
import { user_logoutUser } from "../../../services/api/user/user.service";
import HeaderSkeleton from "./HeaderSkeleton";

const Header = () => {
  const { profile } = useSelector((state) => state.user);
  const [settings, setSettings] = useState([]);
  const navigate = useNavigate();
  const messageRef = useRef(null);
  const notificationRef = useRef(null);
  const settingsRef = useRef(null);
  const dispatch = useDispatch();
  const [deleteStoredUsername] = useLocalStorage("username", "delete");
  const [setLoggedIn] = useLocalStorage("keepLoggedIn", "set");
  const [deleteSessionPageReload] = useSessionStorage("pageReload", "delete");

  const [isMessageActive, setIsMessageActive] = useDetectOutsideClick(
    messageRef,
    false
  );
  const [isNotificationActive, setIsNotificationActive] = useDetectOutsideClick(
    notificationRef,
    false
  );
  const [isSettingsActive, setIsSettingsActive] = useDetectOutsideClick(
    settingsRef,
    false
  );

  const openChatPage = () => {};
  const onMarkAsRead = () => {};
  const onDeleteNotification = () => {};
  const onLogout = async () => {
    try {
      setLoggedIn(false);
      Utils.clearStore({
        dispatch,
        deleteStoredUsername,
        deleteSessionPageReload,
        setLoggedIn,
      });
      localStorage.removeItem("username");
      await user_logoutUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffectOnce(() => {
    Utils.mapSettingsDropDownItems(setSettings);
  });

  return (
    <>
      {!profile ? (
        <HeaderSkeleton />
      ) : (
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
            <div
              className="header-image"
              onClick={() => {
                navigate("/app/home/feeds");
              }}
            >
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
                  setIsNotificationActive(true);
                  setIsSettingsActive(false);
                }}
              >
                <span className="header-list-name">
                  <FaRegBell className="header-list-icon" />
                  <span className="bg-danger-dots dots"></span>
                </span>
                {isNotificationActive && (
                  <ul className="dropdown-ul" ref={notificationRef}>
                    <li className="dropdown-li">
                      {/* Notification Drop down */}
                      <Dropdown
                        height={300}
                        style={{ right: "250px", top: "20px" }}
                        data={[]}
                        notificationCount={0}
                        title="Notifications"
                        onMarkAsRead={onMarkAsRead}
                        onDeleteNotification={onDeleteNotification}
                      />
                    </li>
                  </ul>
                )}
                &nbsp;
              </li>
              <li
                className="header-nav-item active-item"
                onClick={() => {
                  setIsMessageActive(true);
                  setIsNotificationActive(false);
                  setIsSettingsActive(false);
                }}
              >
                <span className="header-list-name">
                  <FaRegEnvelope className="header-list-icon" />
                  <span className="bg-danger-dots dots"></span>
                </span>
                &nbsp;
              </li>
              <li
                className="header-nav-item"
                onClick={() => {
                  setIsSettingsActive(!isSettingsActive);
                  setIsMessageActive(false);
                  setIsNotificationActive(false);
                }}
              >
                <span className="header-list-name profile-image">
                  <Avatar
                    name={profile?.username}
                    bgColor={profile?.avatarColor}
                    textColor="#ffffff"
                    size={40}
                    avatarSrc={profile?.profilePicture}
                  />
                </span>
                <span className="header-list-name profile-name">
                  {profile?.username}
                  {!isSettingsActive ? (
                    <FaCaretDown className="header-list-icon caret" />
                  ) : (
                    <FaCaretUp className="header-list-icon caret" />
                  )}
                </span>
                {isSettingsActive && (
                  <>
                    <ul className="dropdown-ul" ref={settingsRef}>
                      <li className="dropdown-li">
                        <Dropdown
                          height={300}
                          style={{
                            position: "absolute",
                            right: "-60px",
                            top: "40px",
                          }}
                          data={settings}
                          notificationCount={0}
                          title="Settings"
                          onLogout={() => {
                            onLogout();
                          }}
                          onNavigate={() => {
                            ProfileUtils.navigateToProfile(profile, navigate);
                          }}
                        />
                      </li>
                    </ul>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
