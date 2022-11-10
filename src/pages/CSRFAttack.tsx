import React, { FC } from "react";
import Button from "../components/Button";
import { colors } from "../constants/colors";
import {
  getCSRFToken,
  loginUser,
  logout,
  resetBalance,
  transferMoney,
} from "../api";
import Loader from "../components/Loader";
import styled from "styled-components";

export const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: calc(100% - 1rem);
`;

export const Checkbox = styled.input``;

export const InputLabel = styled.div`
  display: flex;
  align-items: center;
`;

const Form = styled.div`
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 2rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  justify-content: center;
  align-self: center;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.error};
  background-color: ${colors.errorBackground};
  border: 1px solid ${colors.error};
  border-radius: 0.5rem;
  padding: 0.85rem;
  width: calc(100% - 1.7rem);
  font-size: 0.8rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 40rem;
`;

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${colors.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.2rem;
  text-align: justify;
  color: ${colors.dark};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledA = styled.a`
  color: ${colors.dark};
  text-decoration: underline;
  cursor: pointer;
`;

const CSRFAttack: FC = () => {
  const [isEnable, setIsEnable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loggedUser, setLoggedUser] = React.useState("");

  const handleLogin = async () => {
    setMessage("");
    if (username.length === 0 || password.length === 0) {
      setMessage("Please enter username and password");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      return;
    }
    try {
      setIsLoading(true);
      const response = await loginUser(username, password, true);
      if (response.user) {
        setLoggedUser(response.user);
        setLoggedIn(true);
        await getCSRFToken(); // get CSRF token
      } else if (response.message) {
        setMessage(response.message);
      } else {
        setMessage("Unknown error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setLoggedUser("");
    setLoggedIn(false);
    setIsLoading(false);
    setMessage("Logged out successfully!");
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const handleBalanceReset = async () => {
    try {
      setIsLoading(true);
      await resetBalance();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {isLoading && <Loader />}
      <Title>
        <h2>CSRF attack {isEnable ? "(OMOGUĆEN)" : "(ONEMOGUĆEN)"}</h2>
        {/*<Checkbox
          type="checkbox"
          checked={isEnable}
          onChange={() => setIsEnable(!isEnable)}
        />*/}
      </Title>
      <StyledA href={process.env.REACT_APP_HACKER_CLIENT}>
        Zaradi 500eura u 2min
      </StyledA>
      <Button
        label={"Resetiraj balans korisnika"}
        fullWidth
        color={colors.primary}
        backgroundColor={colors.white}
        onClick={handleBalanceReset}
      />
      <Button
        label={"Transfer 100 eura to jjurenic@mail.com"}
        fullWidth
        color={colors.primary}
        backgroundColor={colors.white}
        onClick={async () => {
          setIsLoading(true);
          await transferMoney(100, "jjurenic@mail.com");
          setIsLoading(false);
        }}
      />
      {!loggedIn && (
        <>
          <Form>
            <InputLabel>Username: </InputLabel>
            <Input
              type={"text"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputLabel>Password: </InputLabel>
            <Input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {message.length > 0 && <ErrorMessage>{message}</ErrorMessage>}
            <Button
              label={"Login"}
              fullWidth
              color={colors.white}
              backgroundColor={colors.primary}
              onClick={handleLogin}
            />
          </Form>
        </>
      )}
      {loggedIn && (
        <div>
          <p>User: {loggedUser}</p>
          <Button
            color={colors.white}
            backgroundColor={colors.error}
            label={"Logout"}
            onClick={handleLogout}
          />
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};
export default CSRFAttack;
