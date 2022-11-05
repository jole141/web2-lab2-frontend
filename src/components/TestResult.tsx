import React, { FC } from "react";
import styled from "styled-components";
import { colors } from "../constants/colors";

interface ITestResultProps {
  username: string;
  password: string;
  success: boolean;
  message: string;
}

const Test = styled.div`
  display: flex;
  background-color: ${colors.blueLight};
  width: calc(100% - 2rem);
  padding: 1rem;
  margin: 0.2rem 0;
  border-radius: 0.5rem;
  border: 1px solid ${colors.primary};
  justify-content: space-between;
  align-items: center;
`;

const Credentials = styled.div`
  display: flex;
  flex-direction: column;
  height: 2rem;
  gap: 0.1rem;
  align-items: flex-start;
  justify-content: center;
`;

const Result = styled.div<{ success: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
  padding: 0.5rem;
  color: ${(props) => (props.success ? colors.success : colors.error)};
  border-radius: 0.25rem;
  border: 1px solid
    ${(props) => (props.success ? colors.success : colors.error)};
  background-color: ${(props) =>
    props.success ? colors.successBackground : colors.errorBackground};
`;

const TestResult: FC<ITestResultProps> = ({
  username,
  password,
  success,
  message,
}) => {
  return (
    <Test>
      <Credentials>
        <div>
          Username: <b>{username}</b>
        </div>
        <div>
          Password: <b>{password}</b>
        </div>
      </Credentials>
      <Result success={success}>{message}</Result>
    </Test>
  );
};

export default TestResult;
