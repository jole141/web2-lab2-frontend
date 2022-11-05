import React, { FC } from "react";
import Button from "../components/Button";
import { colors } from "../constants/colors";
import { loginUser } from "../api";
import Loader from "../components/Loader";

const BrokenAuth: FC = () => {
  const [isEnable, setIsEnable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [jwt, setJwt] = React.useState("");

  const handleLogin = async () => {
    setMessage("");
    if (username.length === 0 || password.length === 0) {
      setMessage("Please enter username and password");
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
    }
  };

  const handleLogout = async () => {
    setJwt("");
    setLoggedIn(false);
    setMessage("Logged out successfully!");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h1>Broken Authentication {isEnable ? "(ENABLED)" : "(DISABLED)"}</h1>
        <input
          type="checkbox"
          checked={isEnable}
          onChange={() => setIsEnable(!isEnable)}
        />
        {!loggedIn && (
          <>
            <p>
              <span>Username: </span>
              <input
                type={"text"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>
            <p>
              <span>Password: </span>
              <input
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>
            <Button
              label={"Login"}
              color={colors.white}
              backgroundColor={colors.primary}
              onClick={handleLogin}
            />
          </>
        )}
        <p>{message}</p>
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
      </div>
    </>
  );
};
export default BrokenAuth;
