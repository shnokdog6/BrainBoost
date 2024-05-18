import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import background from "../images/background.jpg"

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: url(${background}) no-repeat;
    background-size: cover;
    position: relative;
`;

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

const StyledButton = styled.button`
    outline: none;
    border: none;
    font-size: 2rem;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    
    @media (min-width: 992px) {
        font-size: 5rem;
        padding: 50px 70px;
    }
`;


const MainPage = () => {
    const navigate = useNavigate();

    return (
        <StyledWrapper>
            <StyledCentredWrapper>
                <StyledHeader>BrainBoost</StyledHeader>
                <StyledButtonWrapper>
                    <StyledButton onClick={() => navigate("/menu")}>Играть</StyledButton>
                    <StyledButton>Статистика</StyledButton>
                </StyledButtonWrapper>
            </StyledCentredWrapper>
        </StyledWrapper>
    );
};

export default MainPage;