import React from "react";
import "./suggestions.scss";
import Avatar from "../avatar/Avatar";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Utils } from "../../services/utils/utils.service";
import { FollowersUtils } from "../../services/utils/utils.followers.service";
import { filter } from "lodash";
import { addToSuggestions } from "../../redux-toolkit/reducers/suggestions/suggestions.reducer";

const Suggestions = () => {
  const { suggestions } = useSelector((state) => state);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const followUser = async (user) => {
    try {
      FollowersUtils.followUser(user, dispatch);
      const result = filter(users, (data) => data?._id !== user?._id);
      setUsers(result);
      dispatch(addToSuggestions({ users: result, isLoading: false }));
    } catch (error) {
      Utils.dispatchNotification(
        error.response.data.message,
        "error",
        dispatch
      );
    }
  };

  useEffect(() => {
    setUsers(suggestions?.users);
  }, [suggestions, users]);

  return (
    <div className="suggestions-list-container">
      <div className="suggestions-header">
        <div className="title-text">Suggestions</div>
      </div>
      <hr />
      <div className="suggestions-container">
        <div className="suggestions">
          {users?.map((user) => (
            <div className="suggestions-item" key={user?._id}>
              <Avatar
                name={user?.username}
                bgColor={user?.avatarColor}
                textColor="#ffffff"
                size={40}
                avatarSrc={user?.profilePicture}
              />
              <div className="title-text">{user?.username}</div>
              <div className="add-icon">
                <Button
                  label="Follow"
                  className="button follow"
                  disabled={false}
                  handleClick={() => followUser(user)}
                />
              </div>
            </div>
          ))}
        </div>
        {users.length > 8 && (
          <div
            className="view-more"
            onClick={() => navigate("/app/home/people")}
          >
            View More
          </div>
        )}
      </div>
    </div>
  );
};

export default Suggestions;
