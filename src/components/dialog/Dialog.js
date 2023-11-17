import PropTypes from "prop-types";
import "./dialog.scss";
import Button from "../button/Button";

const Dialog = ({
  title,
  firstButtonText,
  secondButtonText,
  firstBtnHandler,
  secondBtnHandler,
}) => {
  return (
    <div className="dialog-container">
      <div className="dialog">
        <h4>{title}</h4>
        <div className="btn-container">
          <Button
            className="btn button cancel-btn"
            label={secondButtonText}
            handleClick={secondBtnHandler}
          />
          <Button
            className="btn button confirm-btn"
            label={firstButtonText}
            handleClick={firstBtnHandler}
          />
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  title: PropTypes.string,
  firstButtonText: PropTypes.string,
  secondButtonText: PropTypes.string,
  firstBtnHandler: PropTypes.func,
  secondBtnHandler: PropTypes.func,
};

export default Dialog;
