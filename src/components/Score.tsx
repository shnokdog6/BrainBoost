import React, {FC} from 'react';
import styled from "styled-components";

export interface ScoreProps {
    count: number;
}

const StyledWrapper = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    color: white;
    font-size: 1rem;
    
    @media (min-width: 992px) {
        font-size: 2.5rem;
    }
`;

const Score: FC<ScoreProps> = ({count}) => {
    return (
        <StyledWrapper>
            <span>Очки: {count}</span>
        </StyledWrapper>
    );
};

export default Score;