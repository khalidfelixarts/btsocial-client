import {
  addPostFeeling,
  toggleFeelingModal,
} from "../../redux-toolkit/reducers/modal/modal.reducer";
import { feelingsList } from "../../services/utils/static.data";
import { useDispatch, useSelector } from "react-redux";
import "./feelings.scss";

const Feelings = () => {
  const { feelingsIsOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const selectFeeling = (feeling) => {
    dispatch(addPostFeeling({ feeling }));
    dispatch(toggleFeelingModal(!feelingsIsOpen));
  };

  return (
    <div className="feelings-container">
      <div className="feelings-container-picker">
        <p>Feelings</p>
        <hr />
        <ul className="feelings-container-picker-list">
          {feelingsList.map((feeling) => (
            <li
              className="feelings-container-picker-list-item"
              key={feeling.index}
              onClick={() => selectFeeling(feeling)}
            >
              <img src={feeling.image} alt="" /> <span>{feeling.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Feelings;
