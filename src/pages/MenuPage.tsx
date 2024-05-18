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

const StyledButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    
    :last-child {
        margin-top: 100px;
    }
`;

const StyledButton = styled.button`
    outline: none;
    border: none;
    font-size: 32px;
    min-width: 300px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
`;


const MenuPage = () => {
    const navigate = useNavigate();

    return (
        <StyledWrapper>
            <StyledCentredWrapper>
                <StyledButtonWrapper>
                    <StyledButton onClick={() => navigate("/lowPop")}>LowPop</StyledButton>
                    <StyledButton>Memory Sweep</StyledButton>
                    <StyledButton onClick={() => navigate("/")}>Назад</StyledButton>
                </StyledButtonWrapper>
            </StyledCentredWrapper>
        </StyledWrapper>
    );
};

export default MenuPage;