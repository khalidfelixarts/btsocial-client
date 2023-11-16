import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import LOGO from "../../../assets/images/logo.jpg";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { sideBarItems } from "../../../services/utils/static.data";
import { MdLogout } from "react-icons/md";

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
const Sidebar = () => {
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

  return (
    <>
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
                <li key={data.index} className="nav-link">
                  <Link to={data.url}>
                    {fontAwesomeIcons[data.iconName]}
                    <span className="text nav-text">{data.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bottom-content">
            <li className="nav-link">
              <Link to="#">
                <MdLogout className="icon" />
                <span className="text nav-text">Logout</span>
              </Link>
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
