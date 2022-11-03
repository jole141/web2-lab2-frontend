import React, { FC } from "react";
import Button from "../components/Button";
import { colors } from "../constants/colors";

const XSSAttack: FC = () => {
  const [isEnable, setIsEnable] = React.useState(true);
  const [input, setInput] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");

  const handleSubmit = () => {
    setSearch(input);
    setInput("");
  };

  const getSearchValue = () => {
    if (isEnable) {
      return <span dangerouslySetInnerHTML={{ __html: search }} />;
    }
    return <span>{search}</span>;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <div>
      <span>
        <h1>XSS Attack {isEnable ? "(ENABLED)" : "(DISABLED)"}</h1>
        <li>HINT za hack: {`<img src="test" onError="alert('Hacked')"/>`}</li>
        <input
          type="checkbox"
          checked={isEnable}
          onChange={() => setIsEnable(!isEnable)}
        />
      </span>
      <div>
        <span>Unesite tekst: </span>
        <input value={input} onChange={handleChange} />
        <Button
          label="Pretraži"
          color={colors.white}
          backgroundColor={colors.primary}
          onClick={handleSubmit}
        />
      </div>
      <p>
        <span>Pretražili ste: {getSearchValue()}</span>
      </p>
    </div>
  );
};

export default XSSAttack;
