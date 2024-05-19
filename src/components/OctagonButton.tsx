import React, {FC, memo, PropsWithChildren, useEffect, useState} from 'react';
import styled, {keyframes} from "styled-components";
import {Keyframes} from "styled-components/dist/types";

export interface ButtonProps extends PropsWithChildren {
    onClick?: () => void;
}


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

const StyledWrapper = styled.div<{$animation: Keyframes | string; }>`
    width: 100px;
    height: 100px;
    font-size: 2rem;
    background-color: white;
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    position: relative;
    
    animation: ${props => props.$animation} 0.25s ease-in-out forwards;
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


const OctagonButton: FC<ButtonProps> = memo(({children, onClick}) => {
    const [animation, setAnimation] = useState<Keyframes | string>(appearAnimation)

    useEffect(() => {
        if (children) {
            setAnimation(appearAnimation);
            return;
        }
        setAnimation(disappearAnimation);
    }, [children]);

    useEffect(() => {
        return () => {
            setAnimation("none");
        }
    }, []);

    function handleClick() {
        setAnimation(disappearAnimation);
        onClick?.();
    }

    return (
        <StyledWrapper onClick={handleClick} $animation={animation}>
            <StyledContent>
                {children}
            </StyledContent>
        </StyledWrapper>
    );
});

export default OctagonButton;