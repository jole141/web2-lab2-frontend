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
  const [jwt, setJwt] = React.useState("");
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
          message: response.token ? "Login successfull" : response.message!,
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
      if (response.token) {
        setJwt(response.token);
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
    setJwt("");
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
          Broken Authentication {isEnable ? "(OMOGUĆEN)" : "(ONEMOGUĆEN)"}
        </h2>
        <Checkbox
          type="checkbox"
          checked={isEnable}
          onChange={() => setIsEnable(!isEnable)}
        />
      </Title>
      <Description>
        U ovom napadu nam je cilj pogoditi korisnikovo korisničko ime i loziknu.
        Nezaštičeni sustav omogućava nam beskonačno pokušaja i upravo to ga čini
        ranjivim. Ako je onemogućen napad onda se na poslužitelju radi provjera
        IP-adrese računala koje šalje zahtjeve i u bazu (in memory) se spremaju
        podatci o pokušajima i točno vrijeme neuspjelog pokušaja. 5 minuta nakon
        3. neuspjelog pokušaja korisnik se može probati ponovo ulogirati
      </Description>
      <Description>
        Gumb za testiranje poslati će 36 zahtjeva za prijavu sa najučestalijim
        lozinkama od kojih je posljednja ispravna. Ako je zaštita isključena
        korisnik će se uspješno prijaviti.
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
        neovisno o računalu, zahtjeve šalje preko iste IP adrese, no napadač će
        u većini slučajeva pisati skriptu za napadanje i neće koristiti naš
        frontend (IP adresa će biti različita).
      </Description>
      <Description>
        Sustav za prijavu možete testirati ovdje. Ukoliko se prethodno pokrenuli
        test trebate pričekati da prođe 5 minuta prije sljedećeg pokušaja.
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
          <p>JWT: {jwt}</p>
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
