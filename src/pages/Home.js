import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Home/Header/Header";
import Main from "../components/Home/Main/Main";
import { useDispatch } from "react-redux";
import { fetchData, updateData } from "../actions/dataActions";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();
  const [showMobile, setShowMobile] = useState(false);
  const homeVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, when: "beforeChildren" },
    },
    exit: { x: 400, opacity: 0 },
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    window.scrollTo({
      top: 0,
    });

    if (!data) {
      dispatch(fetchData());
    }

    dispatch(updateData(data));
  }, [dispatch]);

  return (
    <StyledContainer
      variants={homeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header showMobile={showMobile} setShowMobile={setShowMobile} />
      <Main showMobile={showMobile} />
    </StyledContainer>
  );
};

export default Home;

const StyledContainer = styled(motion.div)`
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
