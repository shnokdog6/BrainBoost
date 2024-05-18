import React, {FC, memo, PropsWithChildren, useEffect, useState} from 'react';
import styled, {keyframes} from "styled-components";
import {Keyframes} from "styled-components/dist/types";

export interface ButtonProps extends PropsWithChildren {
    onClick?: () => void;
    disabled?: boolean;
}

const idleAnimation = keyframes`
    from {
    }
    to {
        transform: scale(100%);
    }
`;

const appearAnimation = keyframes`
    from {
        transform: scale(0%);
    }
    to {
        transform: scale(100%);
    }
`;

const disappearAnimation = keyframes`
    from {
        transform: scale(100%);
    }
    to {
        transform: scale(0%);
    }
`;

const StyledWrapper = styled.div<{ $disabled: boolean; }>`
    width: 100px;
    height: 100px;
    font-size: 2rem;
    background-color: white;
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    position: relative;
    opacity: ${props => props.$disabled ? 0 : 1};
    animation: ${appearAnimation} 0.25s ease-in-out;
`;

const StyledContent = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: calc(100% - 5px);
    height: calc(100% - 5px);
    background-color: blue;
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
`;


const OctagonButton: FC<ButtonProps> = memo(({children, onClick, disabled}) => {


    return (
        <StyledWrapper $disabled={disabled || false} onClick={onClick}>
            <StyledContent>
                {children}
            </StyledContent>
        </StyledWrapper>
    );
});

export default OctagonButton;