import React from 'react';
import styled from "styled-components";
import background from "../images/background.jpg";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../store";

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: url(${background}) no-repeat;
    background-size: cover;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const StyledButton = styled.button`
    outline: none;
    border: none;
    font-size: 32px;
    width: 300px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: auto;
`;

const StyledDiv = styled.div`
    display: flex;
    height: 95%;
    padding: 10px;
    gap: 10px;
    align-items: start;
    justify-content: center;
`;

const StyledH2 = styled.h2`
    font-size: 3rem;
`;

const StatsPage = () => {
    const navigate = useNavigate();
    const {lowPop} = useAppSelector(state => state.user)

    return (
        <StyledWrapper>
            <StyledDiv>
                <StyledH2>LowPop: {lowPop}</StyledH2>
            </StyledDiv>
            <StyledButton onClick={() => navigate("/")}>Назад</StyledButton>
        </StyledWrapper>
    );
};

export default StatsPage;