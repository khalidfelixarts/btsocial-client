import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./feeds.scss";
import Suggestions from "../../../components/suggestions/Suggestions";
import { getUserSuggestions } from "../../../redux-toolkit/api/suggestions";
import useEffectOnce from "../../../hooks/useEffectOnce";
import PostForm from "../../../components/posts/post-form/PostForm";
import Posts from "../../../components/posts/Posts";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { postService } from "../../../services/api/post/post.service";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { orderBy, uniqBy } from "lodash";
import { addReactions } from "../../../redux-toolkit/reducers/post/user-post-reaction.reducer";
import { PostUtils } from "../../../services/utils/utils.post.service";
import { Utils } from "../../../services/utils/utils.service";
import { getPosts } from "./../../../redux-toolkit/api/posts";
const Feeds = () => {
  const bodyRef = useRef(null);
  const bottomLineRef = useRef();
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(getUserSuggestions());
  });

  //////////////////////////////////////////
  //////////// POSTS ///////////////////////

  const { allPosts } = useSelector((state) => state);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  let appPosts = useRef([]);
  const storedUsername = useLocalStorage("username", "get");
  const [deleteSelectedPostId] = useLocalStorage("selectedPostId", "delete");
  useInfiniteScroll(bodyRef, bottomLineRef, fetchPostData);
  const PAGE_SIZE = 8;

  function fetchPostData() {
    let pageNum = currentPage;
    if (currentPage <= Math.round(totalPostsCount / PAGE_SIZE)) {
      pageNum += 1;
      setCurrentPage(pageNum);
      getAllPosts();
    }
  }

  const getAllPosts = async () => {
    try {
      const response = await postService.getAllPosts(currentPage);
      if (response.data.posts.length > 0) {
        appPosts = [...posts, ...response.data.posts];
        const allPosts = uniqBy(appPosts, "_id");
        const orderedPosts = orderBy(allPosts, ["createdAt"], ["desc"]);
        setPosts(orderedPosts);
      }
      setLoading(false);
    } catch (error) {
      Utils.dispatchNotification(
        error.response.data.message,
        "error",
        dispatch
      );
    }
  };

  // const getUserFollowing = async () => {
  //   try {
  //     const response = await followerService.getUserFollowing();
  //     setFollowing(response.data.following);
  //   } catch (error) {
  //     Utils.dispatchNotification(
  //       error.response.data.message,
  //       "error",
  //       dispatch
  //     );
  //   }
  // };

  const getReactionsByUsername = async () => {
    try {
      const response = await postService.getReactionsByUsername(storedUsername);
      dispatch(addReactions(response.data.reactions));
    } catch (error) {
      Utils.dispatchNotification(
        error.response.data.message,
        "error",
        dispatch
      );
    }
  };

  useEffectOnce(() => {
    // getUserFollowing();
    getReactionsByUsername();
    deleteSelectedPostId();
    dispatch(getPosts());
    dispatch(getUserSuggestions());
  });

  useEffect(() => {
    setLoading(allPosts?.isLoading);
    const orderedPosts = orderBy(allPosts?.posts, ["createdAt"], ["desc"]);
    setPosts(orderedPosts);
    setTotalPostsCount(allPosts?.totalPostsCount);
  }, [allPosts]);

  useEffect(() => {
    PostUtils.socketIOPost(posts, setPosts);
  }, [posts]);

  return (
    <div className="feeds">
      <div className="feeds-content">
        <div
          className="feeds-post"
          ref={bodyRef}
          style={{ backgroundColor: "white" }}
        >
          <PostForm />
          <Posts
            allPosts={posts}
            postsLoading={loading}
            // userFollowing={following}
            userFollowing={[]}
          />
          <div
            ref={bottomLineRef}
            style={{ marginBottom: "50px", height: "50px" }}
          ></div>
        </div>
        <div className="feeds-suggestions">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Feeds;
