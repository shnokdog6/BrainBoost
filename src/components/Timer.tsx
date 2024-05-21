import React, {FC, PropsWithChildren} from 'react';
import styled from "styled-components";

const StyledTimeSpan = styled.div`
    width: fit-content;
    height: fit-content;
    color:white;
    font-weight: 600;
    font-size: 1rem;
    position: absolute;
    left: 0;
    right: 0;
    top: 10px;
    margin: auto;
`;

const Timer: FC<PropsWithChildren> = ({children}) => {
    return (
        <StyledTimeSpan>
            {children}
        </StyledTimeSpan>
    );
};

export default Timer;