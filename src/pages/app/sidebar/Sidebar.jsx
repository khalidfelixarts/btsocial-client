import React, { useEffect } from "react";
import "./sidebar.scss";
import LOGO from "../../../assets/images/logo.jpg";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const Sidebar = () => {
  useEffect(() => {
    const body = document.querySelector("body");
    const sidebar = body.querySelector("nav");
    const sidebarToggle = body.querySelector(".sidebarToggle");
    const searchBtn = body.querySelector(".search-box");
    const modeSwitch = body.querySelector(".sidebarToggle-switch");
    const modeText = body.querySelector(".mode-text");

    const sidebarToggleSidebar = () => {
      sidebar.classList.toggle("close");
    };

    const openSearch = () => {
      sidebar.classList.remove("close");
    };

    const sidebarToggleDarkMode = () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
      } else {
        modeText.innerText = "Dark mode";
      }
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

            <ul class="menu-links">
              <li class="nav-link">
                <a href="#">
                  <IoMdHome className="icon" />

                  <span class="text nav-text">Feeds</span>
                </a>
              </li>

              <li class="nav-link">
                <a href="#">
                  <i class="bx bx-bar-chart-alt-2 icon"></i>
                  <span class="text nav-text">Revenue</span>
                </a>
              </li>

              <li class="nav-link">
                <a href="#">
                  <i class="bx bx-bell icon"></i>
                  <span class="text nav-text">Notifications</span>
                </a>
              </li>

              <li class="nav-link">
                <a href="#">
                  <i class="bx bx-pie-chart-alt icon"></i>
                  <span class="text nav-text">Analytics</span>
                </a>
              </li>

              <li class="nav-link">
                <a href="#">
                  <i class="bx bx-heart icon"></i>
                  <span class="text nav-text">Likes</span>
                </a>
              </li>

              <li class="nav-link">
                <a href="#">
                  <i class="bx bx-wallet icon"></i>
                  <span class="text nav-text">Wallets</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li>
              <a href="#">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">Dark mode</span>

              <div className="sidebarToggle-switch">
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
