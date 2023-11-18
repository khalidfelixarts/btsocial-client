import CommentArea from "../comment-area/CommentArea";
import ReactionsAndCommentsDisplay from "../reactions/reactions-and-comments-display/ReactionsAndCommentsDisplay";
import PropTypes from "prop-types";

const PostCommentSection = ({ post }) => {
  return (
    <div>
      <ReactionsAndCommentsDisplay post={post} />
      <CommentArea post={post} />
    </div>
  );
};

PostCommentSection.propTypes = {
  post: PropTypes.object,
};

export default PostCommentSection;
