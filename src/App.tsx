import React from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import { colors } from "./constants/colors";

function App() {
  return (
    <>
      <Header />
      <div>
        <Button
          label="Test"
          onClick={() => alert("test")}
          color={colors.white}
          backgroundColor={colors.primary}
        />
      </div>
    </>
  );
}

export default App;
