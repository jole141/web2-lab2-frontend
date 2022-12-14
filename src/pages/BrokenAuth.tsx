import React, { FC } from "react";
import Button from "../components/Button";
import { colors } from "../constants/colors";
import { loginUser } from "../api";
import Loader from "../components/Loader";
import styled from "styled-components";
import { DICTIONARY } from "../constants/dictionary";
import { ITest } from "../types";
import TestResult from "../components/TestResult";

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

const BrokenAuth: FC = () => {
  const [isEnable, setIsEnable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loggedUser, setLoggedUser] = React.useState("");
  const [tests, setTests] = React.useState<ITest[]>([]);

  const handleTest = async () => {
    setTests([]);
    setIsLoading(true);
    try {
      for (let i = 0; i < DICTIONARY.length; i++) {
        const response = await loginUser(
          DICTIONARY[i].username,
          DICTIONARY[i].password,
          isEnable
        );
        const test = {
          username: DICTIONARY[i].username,
          password: DICTIONARY[i].password,
          success: !response.message,
          message: response.user ? "Login successfull" : response.message!,
        };
        setTests((prev) => [...prev, test]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

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
      const response = await loginUser(username, password, isEnable);
      if (response.user) {
        setLoggedUser(response.user);
        setLoggedIn(true);
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
    setLoggedUser("");
    setLoggedIn(false);
    setMessage("Logged out successfully!");
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <Container>
      {isLoading && <Loader />}
      <Title>
        <h2>
          Broken Authentication {isEnable ? "(OMOGU??EN)" : "(ONEMOGU??EN)"}
        </h2>
        <Checkbox
          type="checkbox"
          checked={isEnable}
          onChange={() => setIsEnable(!isEnable)}
        />
      </Title>
      <Description>
        <b>
          ZABUNOM SAM RIJE??IO OVAJ ZADATAK (ostavio sam ga da ne propadne trud)
        </b>
      </Description>
      <Description>
        U ovom napadu nam je cilj pogoditi korisnikovo korisni??ko ime i loziknu.
        Neza??ti??eni sustav omogu??ava nam beskona??no poku??aja i upravo to ga ??ini
        ranjivim. Ako je onemogu??en napad onda se na poslu??itelju radi provjera
        IP-adrese ra??unala koje ??alje zahtjeve i u bazu (in memory) se spremaju
        podatci o poku??ajima i to??no vrijeme neuspjelog poku??aja. 5 minuta nakon
        3. neuspjelog poku??aja korisnik se mo??e probati ponovo ulogirati
      </Description>
      <Description>
        Gumb za testiranje poslati ??e 36 zahtjeva za prijavu sa naju??estalijim
        lozinkama od kojih je posljednja ispravna. Ako je za??tita isklju??ena
        korisnik ??e se uspje??no prijaviti.
      </Description>
      <Button
        label={"Testiraj napad"}
        fullWidth
        color={colors.white}
        backgroundColor={colors.primary}
        onClick={handleTest}
      />
      <Button
        label={"Ukloni testove"}
        fullWidth
        color={colors.primary}
        onClick={() => setTests([])}
      />
      {tests.length > 0 &&
        tests.map((test, index) => (
          <TestResult
            username={test.username}
            password={test.password}
            success={test.success}
            message={test.message}
            key={index}
          />
        ))}
      <Description>
        Prilikom testiranja aplikacije na Renderu, primjetio sam kako Render,
        neovisno o ra??unalu, zahtjeve ??alje preko iste IP adrese, no napada?? ??e
        u ve??ini slu??ajeva pisati skriptu za napadanje i ne??e koristiti na??
        frontend (IP adresa ??e biti razli??ita).
      </Description>
      <Description>
        Sustav za prijavu mo??ete testirati ovdje. Ukoliko se prethodno pokrenuli
        test trebate pri??ekati da pro??e 5 minuta prije sljede??eg poku??aja.
      </Description>
      <Description>Korisnici u bazi i njihove sifre su: </Description>

      <b>(jjurenic, password123), (admin, admin), (test, sifra123)</b>
      <br />
      <br />
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
export default BrokenAuth;
