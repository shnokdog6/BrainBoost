import React, {FC, HTMLAttributes} from 'react';
import styled from "styled-components";
import background from "../images/background.jpg";

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: url(${background}) no-repeat;
    background-size: cover;
    position: relative;
`;

const PageWrapper: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <StyledWrapper {...props}/>
    );
};

export default PageWrapper;