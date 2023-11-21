import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import LOGO from "../../../assets/images/logo.jpg";
import { IoIosArrowForward } from "react-icons/io";
import {
  Link,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { sideBarItems } from "../../../services/utils/static.data";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  FaVideo,
  FaBirthdayCake,
  FaNewspaper,
  FaComments,
  FaUsers,
  FaUserPlus,
  FaHeart,
  FaImages,
  FaRegBell,
  FaRegUser,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";

import { Utils } from "../../../services/utils/utils.service";
import useLocalStorage from "../../../hooks/useLocalStorage";
import useSessionStorage from "../../../hooks/useSessionStorage";
import { user_logoutUser } from "../../../services/api/user/user.service";

const Sidebar = () => {
  const { profile } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToPage = (name, url) => {
    if (name === "Profile") {
      url = `${url}/${profile?.username}?${createSearchParams({
        id: profile?._id,
        uId: profile?.uId,
      })}`;
      navigate(url);
    }
  };

  const checkUrl = (name) => {
    return location.pathname.includes(name.toLowerCase());
  };

  const [themeMode, setThemeMode] = useState(true);

  useEffect(() => {
    const body = document.querySelector("body");
    const sidebar = body.querySelector("nav");
    const sidebarToggle = body.querySelector(".sidebarToggle");
    const searchBtn = body.querySelector(".search-box");
    const modeSwitch = body.querySelector(".sidebarToggle-switch");

    const sidebarToggleSidebar = () => {
      sidebar.classList.toggle("close");
    };

    const openSearch = () => {
      sidebar.classList.remove("close");
    };

    const sidebarToggleDarkMode = () => {
      body.classList.toggle("dark");
    };

    sidebarToggle.addEventListener("click", sidebarToggleSidebar);
    searchBtn.addEventListener("click", openSearch);
    modeSwitch.addEventListener("click", sidebarToggleDarkMode);

    return () => {
      sidebarToggle.removeEventListener("click", sidebarToggleSidebar);
      searchBtn.removeEventListener("click", openSearch);
      modeSwitch.removeEventListener("click", sidebarToggleDarkMode);
    };
  }, []);

  const fontAwesomeIcons = {
    FaNewspaper: <FaNewspaper className="icon" />,
    FaComments: <FaComments className="icon" />,
    FaUsers: <FaUsers className="icon" />,
    FaUserPlus: <FaUserPlus className="icon" />,
    FaHeart: <FaHeart className="icon" />,
    FaImages: <FaImages className="icon" />,
    FaVideo: <FaVideo className="icon" />,
    FaRegBell: <FaRegBell className="icon" />,
    FaBirthdayCake: <FaBirthdayCake className="icon" />,
    FaRegUser: <FaRegUser className="icon" />,
  };

  const [sidebar, setSidebar] = useState([]);
  useEffect(() => {
    setSidebar(sideBarItems);
  }, []);

  const [setLoggedIn] = useLocalStorage("keepLoggedIn", "set");
  const dispatch = useDispatch();
  const [deleteStoredUsername] = useLocalStorage("username", "delete");
  const [deleteSessionPageReload] = useSessionStorage("pageReload", "delete");

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

  ///////////////////////////////////////////////////////////////////////////
  ////////////////////////// THEME TAB /////////////////////////////////////
  const [isThemeActive, setIsThemeActive] = useState(false);
  const [color, setColor] = useState("default");

  function setPrimaryColor(color) {
    const body = document.querySelector("body");
    body.classList.toggle(`${color}`);
  }

  return (
    <>
      {isThemeActive && (
        <div className="theme__tab__parent">
          <div className="theme__settings">
            <div className="theme__top">
              <span>Theme Settings</span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsThemeActive(!isThemeActive);
                }}
              >
                X
              </span>
            </div>
            <div className="theme__bottom">
              {/* ADD THEME BUTTONS */}

              {/*  */}
            </div>
          </div>
        </div>
      )}
      <nav className="sidebar close">
        <div className="header">
          <div className="image-text">
            <span className="image">
              <img src={LOGO} alt="logo" />
            </span>

            <div className="text logo-text">
              <span className="name">BTsocial</span>
              <span className="profession">The Social Media</span>
            </div>
          </div>

          <IoIosArrowForward className="sidebarToggle"></IoIosArrowForward>
        </div>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box">
              <IoIosSearch className="icon" />

              <input type="text" placeholder="Search..." />
            </li>

            <ul className="menu-links">
              {/* MAP SIDE BAR COMPONENTS */}
              {sidebar.map((data) => (
                <li
                  key={data.index}
                  className={`nav-link ${checkUrl(data.name) ? "active" : ""}`}
                  onClick={() => navigateToPage(data.name, data.url)}
                >
                  <Link to={data.url === "/app/home/profile" ? "" : data.url}>
                    {fontAwesomeIcons[data.iconName]}
                    <span className="text nav-text">{data.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bottom-content">
            <li
              style={{ cursor: "pointer" }}
              className="nav-link"
              onClick={() => {
                setIsThemeActive(!isThemeActive);
              }}
            >
              <a>
                <IoIosColorPalette className="icon" />
                <span className="text nav-text">Theme</span>
              </a>
            </li>
            <li
              style={{ cursor: "pointer" }}
              className="nav-link"
              onClick={() => {
                onLogout();
              }}
            >
              <a>
                <MdLogout className="icon" />
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <FaMoon
                  className={`icon moon ${themeMode ? "active__mode" : ""}`}
                />
                <FaSun
                  className={`icon sun ${themeMode ? "" : "active__mode"}`}
                />
              </div>
              <span className="mode-text text">
                {themeMode ? "Light Mode" : "Dark Mode"}
              </span>

              <div
                className="sidebarToggle-switch"
                onClick={() => {
                  setThemeMode(!themeMode);
                }}
              >
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
