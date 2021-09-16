import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import arrowUpIcon from "../../../assets/shared/icon-arrow-up.svg";
import arrowUpWhiteIcon from "../../../assets/shared/icon-arrow-up-white.svg";
import { updateData } from "../../../actions/dataActions";

const UpvoteButton = ({ upvotes, id }) => {
  const [upvoteStatus, setUpvoteStatus] = useState(false);
  const [numberOfVotes, setNumberOfVotes] = useState(upvotes);
  const [feedbacks, setFeedbacks] = useState({});
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  useEffect(() => {
    setFeedbacks(data);

    const extractedData = JSON.parse(localStorage.getItem("data"));

    for (let i = 0; i < extractedData.productRequests.length; i++) {
      // Load number of upvotes from localStorage
      if (extractedData.productRequests[i].id === id) {
        setNumberOfVotes(extractedData.productRequests[i].upvotes);
      }
      // Load upvote status
      if (
        extractedData.productRequests[i].id === id &&
        extractedData.productRequests[i].upvoted === true
      ) {
        setUpvoteStatus(true);
      }
    }
  }, [numberOfVotes, data, id, upvoteStatus]);

  const handleClick = (e) => {
    e.preventDefault();

    if (!upvoteStatus) {
      const updatedData = {
        ...feedbacks,
        productRequests: feedbacks.productRequests.map((feedback) => {
          if (feedback.id === id) {
            return {
              ...feedback,
              upvotes: (feedback.upvotes += 1),
              upvoted: true,
            };
          }
          return { ...feedback };
        }),
      };
      localStorage.setItem("data", JSON.stringify(updatedData));
      dispatch(updateData(updatedData));
      setUpvoteStatus(true);
    }

    if (upvoteStatus) {
      const updatedData = {
        ...feedbacks,
        productRequests: feedbacks.productRequests.map((feedback) => {
          if (feedback.id === id) {
            delete feedback["upvoted"];
            return {
              ...feedback,
              upvotes: (feedback.upvotes -= 1),
            };
          }
          return { ...feedback };
        }),
      };
      localStorage.setItem("data", JSON.stringify(updatedData));
      dispatch(updateData(updatedData));
      setUpvoteStatus(false);
    }
  };

  return (
    <div>
      <button className={upvoteStatus ? "upvoted" : ""} onClick={handleClick}>
        {!upvoteStatus && <img src={arrowUpIcon} alt="arrow up" />}
        {upvoteStatus && <img src={arrowUpWhiteIcon} alt="arrow up white" />}
        {numberOfVotes}
      </button>
    </div>
  );
};

export default UpvoteButton;
