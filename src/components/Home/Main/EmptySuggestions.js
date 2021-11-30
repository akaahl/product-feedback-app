import React from "react";
import styled from "styled-components";
import emptyIcon from "../../../assets/suggestions/illustration-empty.svg";

const EmptySuggestions = ({ category }) => {
  return (
    <StyledWrapper>
      <img src={emptyIcon} alt="empty suggestions illustrations" />
      <h2>
        No suggestions can be found in "
        {category === "ui" || category === "ux"
          ? category.toUpperCase()
          : category[0].toUpperCase() + category.substring(1)}
        " .
      </h2>
    </StyledWrapper>
  );
};

export default EmptySuggestions;

const StyledWrapper = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    height: 200px;
    width: 200px;
    object-fit: cover;
  }

  h2 {
    font-size: 20px;
    color: #3a4374;
    margin-top: 20px;
    text-align: center;
  }
`;
