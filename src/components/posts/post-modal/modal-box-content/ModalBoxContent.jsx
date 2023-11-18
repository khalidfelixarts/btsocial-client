import Avatar from "../../../avatar/Avatar";
import SelectDropdown from "../../../select-dropdown/SelectDropdown";
import useDetectOutsideClick from "../../../../hooks/useDetectOutsideClick";
import { privacyList } from "../../../../services/utils/static.data";
import { useRef, useState, useCallback, useEffect } from "react";
import { FaGlobe } from "react-icons/fa";
import { useSelector } from "react-redux";
import { find } from "lodash";

const ModalBoxContent = () => {
  const { profile } = useSelector((state) => state.user);
  const { privacy } = useSelector((state) => state.post);
  const { feeling } = useSelector((state) => state.modal);
  const privacyRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState({
    topText: "Public",
    subText: "Anyone on BTsocial",
    icon: <FaGlobe className="globe-icon globe" />,
  });
  const [tooglePrivacy, setTogglePrivacy] = useDetectOutsideClick(
    privacyRef,
    false
  );

  const displayPostPrivacy = useCallback(() => {
    if (privacy) {
      const postPrivacy = find(privacyList, (data) => data.topText === privacy);
      setSelectedItem(postPrivacy);
    }
  }, [privacy]);

  useEffect(() => {
    displayPostPrivacy();
  }, [displayPostPrivacy]);

  return (
    <div className="modal-box-content">
      <div className="user-post-image">
        <Avatar
          name={profile?.username}
          bgColor={profile?.avatarColor}
          textColor="#ffffff"
          size={40}
          avatarSrc={profile?.profilePicture}
        />
      </div>
      <div className="modal-box-info">
        <h5 className="inline-title-display">{profile?.username}</h5>
        {feeling?.name && (
          <p className="inline-display">
            is feeling{" "}
            <img className="feeling-icon" src={`${feeling?.image}`} alt="" />{" "}
            <span>{feeling?.name}</span>
          </p>
        )}
        <div
          className="time-text-display"
          onClick={() => setTogglePrivacy(!tooglePrivacy)}
        >
          {selectedItem.icon}{" "}
          <div className="selected-item-text">{selectedItem.topText}</div>
          <div ref={privacyRef}>
            <SelectDropdown
              isActive={tooglePrivacy}
              items={privacyList}
              setSelectedItem={setSelectedItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalBoxContent;
