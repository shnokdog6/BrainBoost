import React, {ButtonHTMLAttributes, FC} from 'react';
import styled from "styled-components";

const StyledButton = styled.button`
    outline: none;
    border: none;
    font-size: 2rem;
    width: 300px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
`;

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <StyledButton {...props}/>
    );
};

export default Button;