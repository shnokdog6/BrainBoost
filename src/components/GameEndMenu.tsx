import React, {Dispatch, FC, SetStateAction} from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../store";
import Button from "./Button";

export interface PauseMenuProps {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
    onRestart: () => void;
    score: number;
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

const StyledH2 = styled.h2`
    color: white;
    font-size: 3rem;
`;

const StyledH3 = styled.h3`
    color: white;
    font-size: 2.5rem;
    margin-bottom: 100px;
`;

const GameEndMenu: FC<PauseMenuProps> = ({isVisible, setIsVisible, onRestart, score}) => {
    const navigate = useNavigate();
    const {lowPop} = useAppSelector(state => state.user);

    function leave() {
        setIsVisible(false);
        navigate("/menu");
    }

    function restart() {
        setIsVisible(false);
        onRestart();
    }

    return (
        <StyledWrapper $isVisible={isVisible}>
            <StyledButtonWrapper>
                <StyledH2>Вы набрали: {score}</StyledH2>
                <StyledH3>Лучший: {lowPop}</StyledH3>
                <Button onClick={restart}>Заново</Button>
                <Button onClick={leave}>Выйти</Button>
            </StyledButtonWrapper>
        </StyledWrapper>
    );
};

export default GameEndMenu;