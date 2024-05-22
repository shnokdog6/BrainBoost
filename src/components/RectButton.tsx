import React, {ButtonHTMLAttributes, FC, memo, PropsWithChildren, useEffect, useState} from 'react';
import styled, {keyframes} from "styled-components";
import {Keyframes} from "styled-components/dist/types";

export interface RectButtonProps extends PropsWithChildren {
    onClick?: () => void;
    selected?: boolean;
    reshow?: boolean;
    reset?: boolean;
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

const showAnimation = keyframes`
    0% {
        transform: rotateY(0deg);
    }
    50% {
        transform: rotateY(180deg);
        background-color: #198de4;
    }
    100% {
        transform: rotateY(180deg);
        background-color: #198de4;
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



const RectButton: FC<RectButtonProps> = ({children ,onClick, selected, reshow, reset}) => {
    const [animation, setAnimation] = useState<Keyframes>();
    const [color, setColor] = useState<ButtonColors>();

    function handleClick() {
        selected ? setColor("#4eaf52") : setColor("#f44133");
        onClick?.();
    }


    // useEffect(() => {
    //     if (selected) {
    //         console.log(1);
    //         setAnimation(appearAnimation);
    //         const timeout = setTimeout(() => {
    //             setAnimation(undefined);
    //             clearTimeout(timeout);
    //         }, 1200);
    //     }
    // }, [selected]);

    useEffect(() => {
        if (!children) {
            setColor(undefined)
            return;
        }
        setAnimation(appearAnimation);
        const timeout = setTimeout(() => {
            setAnimation(undefined);
            clearTimeout(timeout);
        }, 1200);
        setColor(undefined);
    }, [children]);

    useEffect(() => {
        if (reshow) {
            setAnimation(showAnimation);
            const timeout = setTimeout(() => {
                setAnimation(undefined);
                clearTimeout(timeout);
            }, 2000);
        }
    }, [reshow]);

    return (
        <StyledButton onClick={handleClick} $animation={animation} $color={color}/>
    );
};

export default RectButton;