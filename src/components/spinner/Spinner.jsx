import PropTypes from "prop-types";
import "./spinner.scss";

const Spinner = ({ bgColor }) => {
  return (
    <>
      {/* Loading 1 */}
      <div className="spinner">
        <div
          className="bounce1 spinner__div"
          style={{ backgroundColor: `${bgColor || "#50b5ff"}` }}
        ></div>
        <div
          className="bounce2 spinner__div"
          style={{ backgroundColor: `${bgColor || "#50b5ff"}` }}
        ></div>
        <div
          className="bounce3 spinner__div"
          style={{ backgroundColor: `${bgColor || "#50b5ff"}` }}
        ></div>
      </div>

      {/* Loading 2 */}
      {/* 
      <div className="loading__parent">
        <div class="loading__loader">
          <div class="loading__upper loading__ball"></div>
          <div class="loading__right loading__ball"></div>
          <div class="loading__lower loading__ball"></div>
          <div class="loading__left loading__ball"></div>
        </div>
      </div> */}

      {/* Loading 3 */}

      {/* <div className="loading3__parent">
        <div class="loading3__wrapper">
          <span className="loading3__span"></span>
        </div>
      </div> */}
    </>
  );
};
Spinner.propTypes = {
  bgColor: PropTypes.string,
};
export default Spinner;
