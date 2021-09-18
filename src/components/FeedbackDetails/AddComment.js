import React from "react";
import styled from "styled-components";

const AddComment = () => {
  return (
    <StyledAddComment>
      <h4>Add Comment</h4>
    </StyledAddComment>
  );
};

export default AddComment;

const StyledAddComment = styled.div`
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 25px;

  h4 {
    color: #3a4374;
    font-weight: 700;
    font-size: 20px;
  }
`;
