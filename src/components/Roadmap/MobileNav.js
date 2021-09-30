import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const MobileNav = ({ status, setStatus }) => {
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

  const handleClick = (e) => {
    e.preventDefault();

    const buttonContent = e.target.className;
    setStatus((status) => buttonContent);
  };

  // console.log(planned, inProgress, live);
  return (
    <MobileNavContainer status={status}>
      <button
        onClick={handleClick}
        className={status === "planned" ? "planned active" : "planned"}
      >
        Planned ({planned.length})
      </button>
      <button
        onClick={handleClick}
        className={
          status === "in-progress" ? "in-progress active" : "in-progress"
        }
      >
        In-Progress ({inProgress.length})
      </button>
      <button
        onClick={handleClick}
        className={status === "live" ? "live active" : "live"}
      >
        Live ({live.length})
      </button>
      <div className="nav__underline"></div>
    </MobileNavContainer>
  );
};

export default MobileNav;

const MobileNavContainer = styled.nav`
  position: relative;
  display: none;
  justify-content: space-between;
  border-bottom: 0.5px solid rgb(58, 67, 116, 0.2);
  box-shadow: 0 2px 30px rgba(58, 67, 116, 0.2);

  button {
    flex: 0.33;
    background: none;
    border: none;
    padding: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #3a4374;
    opacity: 0.5;
    cursor: pointer;

    &.active {
      opacity: 1;
    }
  }

  .nav__underline {
    position: absolute;
    bottom: -1px;
    transition: left 0.2s linear, background-color 0.2s ease-in;
    left: ${({ status }) =>
      status === "planned" ? "0" : status === "in-progress" ? "34%" : "67%"};
    height: 2px;
    background-color: ${({ status }) =>
      status === "planned"
        ? "#f49f85"
        : status === "in-progress"
        ? "#ad1fea"
        : "#62bcfa"};
    width: 33%;
    /* transform: translateX(-33%); */
  }

  @media (max-width: 768px) {
    display: flex;
  }

  @media (max-width: 425px) {
    button {
      font-size: 12px;
      padding: 20px 10px;
    }
  }

  @media (max-width: 290px) {
    button {
      font-size: 11px;
      padding: 20px 0;
    }
  }
`;
