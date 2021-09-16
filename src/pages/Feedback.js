import React from "react";
import styled from "styled-components";
import arrowLeftIcon from "../assets/shared/icon-arrow-left.svg";

const Feedback = () => {
  return (
    <StyledFeedback>
      <div className="feedback__header">
        <button>
          <img src={arrowLeftIcon} alt="arrow left" />
          Go Back
        </button>

        <button>Edit Feedback</button>
      </div>
    </StyledFeedback>
  );
};

export default Feedback;

const StyledFeedback = styled.main`
  margin: 70px 0;
  width: 800px;
`;
