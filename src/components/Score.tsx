import React, {FC} from 'react';
import styled from "styled-components";

export interface ScoreProps {
    count: number;
}

const StyledWrapper = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
`;

const Score: FC<ScoreProps> = ({count}) => {
    return (
        <StyledWrapper>
            <span>Очки: {count}</span>
        </StyledWrapper>
    );
};

export default Score;