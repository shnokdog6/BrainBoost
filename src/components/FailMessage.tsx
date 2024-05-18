import React, {FC} from 'react';
import styled from "styled-components"
import errorImage from "../images/error.png"

export interface FailMessageProps  {
    isVisible: boolean;
}

const StyledWrapper = styled.div<{$isVisible: boolean}>`
    display: ${props => props.$isVisible ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 100;
`;

const StyledDiv = styled.div`
    background: url(${errorImage}) no-repeat;
    background-size: cover;
    width: 256px;
    height: 256px;
`;


const FailMessage: FC<FailMessageProps> = ({isVisible}) => {
    return (
        <StyledWrapper $isVisible={isVisible}>
            <StyledDiv/>
        </StyledWrapper>
    );
};


export default FailMessage;