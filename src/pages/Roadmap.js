import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Roadmap/Header/Header";
import Main from "../components/Roadmap/Main/Main";
import { useDispatch } from "react-redux";
import { updateData } from "../actions/dataActions";
import MobileNav from "../components/Roadmap/MobileNav";
import { motion } from "framer-motion";

const Roadmap = () => {
  const [status, setStatus] = useState("planned");
  const dispatch = useDispatch();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));

    dispatch(updateData(data));
  }, [dispatch]);

  const roadmapVariants = {
    initial: {
      opacity: 0,
      y: 300,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      x: -500,
    },
  };

  return (
    <RoadmapContainer
      variants={roadmapVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header />
      <MobileNav status={status} setStatus={setStatus} />
      <Main status={status} />
    </RoadmapContainer>
  );
};

export default Roadmap;

const RoadmapContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 70px 0;
  width: 1100px;

  @media (max-width: 768px) {
    margin: 0;
    overflow: hidden;
  }
`;
