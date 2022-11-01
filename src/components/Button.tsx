import React, { FC } from "react";
import styled from "styled-components";

interface ButtonProps {
  label: string;
  onClick: () => void;
  backgroundColor?: string;
  color?: string;
}

const StyledButton = styled.button<Partial<ButtonProps>>`
  border: none;
  background-color: ${(props) => props.backgroundColor || "#fff"};
  border-radius: 10px;
  color: ${(props) => props.color || "#000"};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  width: 8rem;
  transition: all 0.2s ease-in-out;
  margin: 0.2rem;
`;

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  color,
  backgroundColor,
}) => {
  return (
    <StyledButton
      color={color}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
