import React from "react";
import { useDispatch, useSelector } from "react-redux";
import arrowUpIcon from "../../../assets/shared/icon-arrow-up.svg";
import arrowUpWhiteIcon from "../../../assets/shared/icon-arrow-up-white.svg";
import { updateData } from "../../../actions/dataActions";

const UpvoteButton = ({ upvotes, id, upvoted }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedData = {
      ...data,
      productRequests: data.productRequests.map((feedback) =>
        feedback.id === id
          ? {
              ...feedback,
              upvotes: !upvoted
                ? (feedback.upvotes += 1)
                : (feedback.upvotes -= 1),
              upvoted: !upvoted ? true : false,
            }
          : { ...feedback }
      ),
    };

    localStorage.setItem("data", JSON.stringify(updatedData));
    dispatch(updateData(updatedData));
  };

  return (
    <div>
      <button className={upvoted ? "upvoted" : ""} onClick={handleClick}>
        {!upvoted ? (
          <img src={arrowUpIcon} alt="arrow up" />
        ) : (
          <img src={arrowUpWhiteIcon} alt="arrow up white" />
        )}

        <span>{upvotes}</span>
      </button>
    </div>
  );
};

export default UpvoteButton;
