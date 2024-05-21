import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../store";
import PageWrapper from "../components/PageWrapper";
import Button from "../components/Button";

const StyledWrapper = styled(PageWrapper)`
    display: flex;
    flex-direction: column;
`;

const StyledButton = styled(Button)`
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