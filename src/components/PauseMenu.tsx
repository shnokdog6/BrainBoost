import React, {Dispatch, FC, SetStateAction} from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

export interface PauseMenuProps {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
}


const StyledWrapper = styled.div<{$isVisible: boolean;}>`
    display: ${props => props.$isVisible ? "flex" : "none"};
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.53);
    width: 100%;
    height: 100%;
    z-index: 100;
    align-items: center;
    justify-content: center;
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const StyledButton = styled.button`
    outline: none;
    border: none;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    width: 100%;
    padding: 10px 20px;

`;


const PauseMenu: FC<PauseMenuProps> = ({isVisible, setIsVisible}) => {
    const navigate = useNavigate();

    function leave() {
        setIsVisible(false);
        navigate("/menu");
    }

    return (
        <StyledWrapper $isVisible={isVisible}>
            <StyledButtonWrapper>
                <StyledButton onClick={() =>  setIsVisible(false)}>Продолжить</StyledButton>
                <StyledButton onClick={leave}>Выйти</StyledButton>
            </StyledButtonWrapper>
        </StyledWrapper>
    );
};

export default PauseMenu;