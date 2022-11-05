import React from "react";
import Header from "./components/Header";
import XSSAttack from "./pages/XSSAttack";
import BrokenAuth from "./pages/BrokenAuth";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh -4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: calc(100vh -4rem);
  width: min(100rem, 100%);
`;

function App() {
  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <XSSAttack />
          <BrokenAuth />
        </Wrapper>
      </Container>
    </>
  );
}

export default App;
