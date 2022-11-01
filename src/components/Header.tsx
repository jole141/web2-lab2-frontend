import React, { FC } from "react";
import styled from "styled-components";
import { colors } from "../constants/colors";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 4rem;
  background-color: ${colors.dark};
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.white};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <Title>Sigurnost weba</Title>
    </HeaderContainer>
  );
};

export default Header;
