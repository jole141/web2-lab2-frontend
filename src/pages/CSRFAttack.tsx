import React, { FC } from "react";
import Button from "../components/Button";

const CSRFAttack: FC = () => {
  return (
    <div>
      <h1>CSRF Attack</h1>
      <p>
        <span>Unesite tekst: </span>
        <input type="text" id="csrf-input" />
      </p>
      <p>
        <span>Uneseni tekst: </span>
        <span id="csrf-output"></span>
      </p>
      <Button
        label="Pošalji"
        onClick={() => {
          const input = document.getElementById(
            "csrf-input"
          ) as HTMLInputElement;
          const output = document.getElementById(
            "csrf-output"
          ) as HTMLSpanElement;
          output.innerText = input.value;
        }}
      />
    </div>
  );
};

export default CSRFAttack;
