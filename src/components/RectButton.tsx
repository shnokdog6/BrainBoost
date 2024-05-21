import React, {ButtonHTMLAttributes, FC, memo, useEffect, useState} from 'react';
import styled, {keyframes} from "styled-components";
import {Keyframes} from "styled-components/dist/types";

export interface RectButtonProps {
    onClick?: () => void;
    selected?: boolean;
}

export type ButtonColors = "#4eaf52" | "#f44133";


const appearAnimation = keyframes`
    0% {
        transform: rotateY(0deg);
    }
    50% {
        transform: rotateY(180deg);
        background-color: #198de4;
    }
    100% {
        transform: rotateY(0deg);
        background-color: #414246;
    }
`;

const StyledButton = styled.button<{$animation?: Keyframes | string; $color?: string}>`
    width: 75px;
    height: 75px;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 #000;
    outline: none;
    border: none;
    background-color: ${props => props.$color || "#414246"};
    animation: ${props => props.$animation || "none"} 1.2s ease-in-out;
`;



const RectButton: FC<RectButtonProps> = ({onClick, selected}) => {
    const [animation, setAnimation] = useState<Keyframes>();
    const [color, setColor] = useState<ButtonColors>();

    function handleClick() {
        selected ? setColor("#4eaf52") : setColor("#f44133");
        onClick?.();
    }

    useEffect(() => {
        console.log("mounted");
    }, []);

    useEffect(() => {
        if (selected) {
            setAnimation(appearAnimation);
        }
    }, [selected]);

    return (
        <StyledButton onClick={handleClick} $animation={animation} $color={color}/>
    );
};

export default RectButton;