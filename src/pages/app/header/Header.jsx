import React, { useState, useRef, useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import useSessionStorage from "../../../hooks/useSessionStorage";
import { user_logoutUser } from "../../../services/api/user/user.service";
import HeaderSkeleton from "./HeaderSkeleton";
import { notificationService } from "../../../services/api/notifications/notification.service";
import { NotificationUtils } from "../../../services/utils/utils.notification.service";
import { socketService } from "../../../services/socket/socket.service";
import NotificationPreview from "../../../components/dialog/NotificationPreview";
import { sumBy } from "lodash";

const Header = () => {
  const { profile } = useSelector((state) => state.user);
  const [settings, setSettings] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const messageRef = useRef(null);
  const notificationRef = useRef(null);
  const settingsRef = useRef(null);
  const dispatch = useDispatch();
  const [deleteStoredUsername] = useLocalStorage("username", "delete");
  const storedUsername = useLocalStorage("username", "get");
  const [setLoggedIn] = useLocalStorage("keepLoggedIn", "set");
  const [deleteSessionPageReload] = useSessionStorage("pageReload", "delete");
  const [messageCount, setMessageCount] = useState(0);
  const [messageNotifications, setMessageNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const [notificationDialogContent, setNotificationDialogContent] = useState({
    post: "",
    imgUrl: "",
    comment: "",
    reaction: "",
    senderName: "",
  });
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

  ////////////// FETCH NOTIFICATIONS ////////////

  const getUserNotifications = async () => {
    try {
      const response = await notificationService.getUserNotifications();
      const mappedNotifications =
        NotificationUtils.mapNotificationDropdownItems(
          response.data.notifications,
          setNotificationCount
        );
      setNotifications(mappedNotifications);
      socketService?.socket.emit("setup", { userId: storedUsername });
    } catch (error) {
      Utils.dispatchNotification(
        error.response.data.message,
        "error",
        dispatch
      );
    }
  };

  const onMarkAsRead = async (notification) => {
    try {
      NotificationUtils.markMessageAsRead(
        notification?._id,
        notification,
        setNotificationDialogContent
      );
    } catch (error) {
      Utils.dispatchNotification(
        error.response.data.message,
        "error",
        dispatch
      );
    }
  };

  const onDeleteNotification = async (messageId) => {
    try {
      const response = await notificationService.deleteNotification(messageId);
      Utils.dispatchNotification(response.data.message, "success", dispatch);
    } catch (error) {
      Utils.dispatchNotification(
        error.response.data.message,
        "error",
        dispatch
      );
    }
  };

  ///////////////////////////////////////////////

  const openChatPage = () => {};

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
      Utils.dispatchNotification(
        error.response.data.message,
        "error",
        dispatch
      );
    }
  };

  useEffectOnce(() => {
    Utils.mapSettingsDropDownItems(setSettings);
    getUserNotifications();
  });

  // useEffect(() => {
  //   const count = sumBy(chatList, (notification) => {
  //     return !notification.isRead &&
  //       notification.receiverUsername === profile?.username
  //       ? 1
  //       : 0;
  //   });
  //   setMessageCount(count);
  //   setMessageNotifications(chatList);
  // }, [chatList, profile]);

  useEffect(() => {
    NotificationUtils.socketIONotification(
      profile,
      notifications,
      setNotifications,
      "header",
      setNotificationCount
    );
    NotificationUtils.socketIOMessageNotification(
      profile,
      messageNotifications,
      setMessageNotifications,
      setMessageCount,
      dispatch,
      location
    );
  }, [profile, notifications, dispatch, location, messageNotifications]);

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
                messageCount={messageCount}
                messageNotifications={messageNotifications}
                openChatPage={openChatPage}
              />
            </div>
          )}

          {notificationDialogContent?.senderName && (
            <NotificationPreview
              title="Your post"
              post={notificationDialogContent?.post}
              imgUrl={notificationDialogContent?.imgUrl}
              comment={notificationDialogContent?.comment}
              reaction={notificationDialogContent?.reaction}
              senderName={notificationDialogContent?.senderName}
              secondButtonText="Close"
              secondBtnHandler={() => {
                setNotificationDialogContent({
                  post: "",
                  imgUrl: "",
                  comment: "",
                  reaction: "",
                  senderName: "",
                });
              }}
            />
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
                  {notificationCount > 0 && (
                    <span className="bg-danger-dots dots">
                      {notificationCount}
                    </span>
                  )}
                </span>
                {isNotificationActive && (
                  <ul className="dropdown-ul" ref={notificationRef}>
                    <li className="dropdown-li">
                      {/* Notification Drop down */}
                      <Dropdown
                        height={300}
                        style={{ right: "250px", top: "20px" }}
                        data={notifications}
                        notificationCount={notificationCount}
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
                <span className="header-list-name profile-name header-profile-name">
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
