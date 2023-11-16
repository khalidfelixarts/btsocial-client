import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import "./feeds.scss";
import Suggestions from "../../../components/suggestions/Suggestions";
import { getUserSuggestions } from "../../../redux-toolkit/api/suggestions";
import useEffectOnce from "../../../hooks/useEffectOnce";

const Feeds = () => {
  const bodyRef = useRef(null);
  const bottomLineRef = useRef();
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(getUserSuggestions());
  });

  return (
    <div className="feeds">
      <div className="feeds-content">
        <div
          className="feeds-post"
          ref={bodyRef}
          style={{ backgroundColor: "white" }}
        >
          <div>Post Form</div>
          <div>Posts Items</div>
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
