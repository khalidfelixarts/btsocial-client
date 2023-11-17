import React from "react";
import "./error.scss";
import { useNavigate } from "react-router-dom";
import image404 from "../../assets/error/404.svg";
import astronaut from "../../assets/error/astronaut.svg";
import earth from "../../assets/error/earth.svg";
import moon from "../../assets/error/moon.svg";
import rocket from "../../assets/error/rocket.svg";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="error_page_bg-purple">
      <div className="error_page_stars">
        <div className="error_page_central-body">
          <img
            className="error_page_image-404"
            src={image404}
            width="300px"
            alt=""
          />
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="error_page_btn-go-home forgot__password__button"
            target="_blank"
          >
            GO BACK
          </button>
        </div>
        <div className="error_page_objects">
          <img
            className="error_page_object_rocket"
            src={rocket}
            width="40px"
            alt=""
          />
          <div className="error_page_earth-moon">
            <img
              className="error_page_object_earth"
              src={earth}
              width="100px"
              alt=""
            />
            <img
              className="error_page_object_moon"
              src={moon}
              width="80px"
              alt=""
            />
          </div>
          <div className="error_page_box_astronaut">
            <img
              className="error_page_object_astronaut"
              src={astronaut}
              width="140px"
              alt=""
            />
          </div>
        </div>
        <div className="error_page_glowing_stars">
          <div className="error_page_star"></div>
          <div className="error_page_star"></div>
          <div className="error_page_star"></div>
          <div className="error_page_star"></div>
          <div className="error_page_star"></div>
        </div>
      </div>
    </div>
  );
};

export default Error;
