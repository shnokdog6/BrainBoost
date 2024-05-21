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

const MenuPage = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper>
            <StyledCentredWrapper>
                <StyledButtonWrapper>
                    <Button onClick={() => navigate("/lowPop")}>LowPop</Button>
                    <Button onClick={() => navigate("/memorySweep")}>Memory Sweep</Button>
                    <Button onClick={() => navigate("/")}>Назад</Button>
                </StyledButtonWrapper>
            </StyledCentredWrapper>
        </PageWrapper>
    );
};

export default MenuPage;