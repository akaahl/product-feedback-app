import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Home/Header/Header";
import Main from "../components/Home/Main/Main";
import { useDispatch } from "react-redux";
import { fetchData, updateData } from "../actions/dataActions";

const Home = () => {
  const dispatch = useDispatch();
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));

    if (!data) {
      dispatch(fetchData());
    }

    dispatch(updateData(data));
  }, [dispatch]);

  return (
    <StyledContainer>
      <Header showMobile={showMobile} setShowMobile={setShowMobile} />
      <Main showMobile={showMobile} />
    </StyledContainer>
  );
};

export default Home;

const StyledContainer = styled.div`
  margin: 70px 0;
  width: 1100px;
  display: flex;

  @media (max-width: 1024px) {
    width: 750px;
    flex-direction: column;
    margin: 20px 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;
