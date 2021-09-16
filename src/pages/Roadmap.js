import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Roadmap/Header/Header";
import Main from "../components/Roadmap/Main/Main";
import { useDispatch } from "react-redux";
import { updateData } from "../actions/dataActions";

const Roadmap = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));

    dispatch(updateData(data));
  }, [dispatch]);

  return (
    <RoadmapContainer>
      <Header />
      <Main />
    </RoadmapContainer>
  );
};

export default Roadmap;

const RoadmapContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 70px 0;
  width: 1100px;
`;
