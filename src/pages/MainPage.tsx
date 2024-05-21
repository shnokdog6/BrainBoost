import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import Button from "../components/Button";

const StyledCentredWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`;

const StyledHeader = styled.h1`
    color: white;
    font-size: 48px;
    width: fit-content;
    height: fit-content;
    margin-bottom: 70px;

    @media (min-width: 992px) {
        font-size: 10rem;
    }
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 100px;
`;




const MainPage = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper>
            <StyledCentredWrapper>
                <StyledHeader>BrainBoost</StyledHeader>
                <StyledButtonWrapper>
                    <Button onClick={() => navigate("/menu")}>Играть</Button>
                    <Button onClick={() => navigate("/stats")}>Статистика</Button>
                </StyledButtonWrapper>
            </StyledCentredWrapper>
        </PageWrapper>
    );
};

export default MainPage;