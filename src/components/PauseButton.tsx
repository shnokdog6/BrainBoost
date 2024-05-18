import React, {FC, HTMLAttributes} from 'react';
import styled from "styled-components";
import icon from "../images/pause.png"


const StyledButton = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    width: 5%;
    height: 5%;
    background: url(${icon}) no-repeat;
    background-size: contain;
`;

const PauseButton: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <StyledButton {...props}/>
    );
};

export default PauseButton;