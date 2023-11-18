import "./postWrapper.scss";
import PropTypes from "prop-types";

const PostWrapper = ({ children }) => {
  return (
    <div className="modal-wrapper">
      {children[1]}
      {children[2]}
      {children[3]}
      <div className="modal-bg"></div>
    </div>
  );
};

PostWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostWrapper;
