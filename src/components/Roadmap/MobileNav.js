import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const MobileNav = () => {
  const planned = useSelector((state) =>
    state.data.productRequests.filter(
      (feedback) => feedback.status === "planned"
    )
  );

  const inProgress = useSelector((state) =>
    state.data.productRequests.filter(
      (feedback) => feedback.status === "in-progress"
    )
  );

  const live = useSelector((state) =>
    state.data.productRequests.filter((feedback) => feedback.status === "live")
  );

  console.log(planned, inProgress, live);
  return (
    <MobileNavContainer>
      <button>Planned ({planned.length})</button>
      <button>In-Progress ({inProgress.length})</button>
      <button>Live ({live.length})</button>
      <div className="nav__underline"></div>
    </MobileNavContainer>
  );
};

export default MobileNav;

const MobileNavContainer = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid rgb(58, 67, 116, 0.2);

  button {
    flex: 0.33;
    background: none;
    border: none;
    padding: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #3a4374;
    opacity: 0.5;
  }

  .nav__underline {
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 2px;
    background-color: #f49f85;
    width: 33%;
    /* transform: translateX(-33%); */
  }
`;
