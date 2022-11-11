import React, { FC, useEffect } from "react";
import Button from "../components/Button";
import { colors } from "../constants/colors";
import { Container, Description, Input, Title } from "./BrokenAuth";
import styled from "styled-components";
import { IComment } from "../types";
import { getComments, postComment, resetComments } from "../api";
import Loader from "../components/Loader";

const CommentSection = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  margin: 0.2rem 0;
  gap: 1rem;
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: calc(100% - 2rem);
  padding: 1rem;
  margin: 0.2rem 0;
  border-radius: 0.5rem;
  border: 1px solid ${colors.primary};
  justify-content: space-between;
  align-items: flex-start;
`;

const NoResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 2rem);
  padding: 1rem;
  margin: 0.2rem 0;
`;

const XSSAttack: FC = () => {
  const [isEnable, setIsEnable] = React.useState(true);
  const [input, setInput] = React.useState<string>("");
  const [comments, setComments] = React.useState<IComment[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const addComment = async () => {
    try {
      setIsLoading(true);
      await postComment(input);
      setInput("");
      await getAllComments();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRest = async () => {
    try {
      setIsLoading(true);
      await resetComments();
      await getAllComments();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getComment = (comment: IComment) => {
    if (isEnable) {
      return (
        <Comment
          key={comment.id}
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
      );
    }
    return <Comment key={comment.id}>{comment.text}</Comment>;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const getAllComments = async () => {
    try {
      setIsLoading(true);
      const response = await getComments();
      setComments(response);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <Container>
      {isLoading && <Loader />}
      <Title>
        <h2>XSS Attack {isEnable ? "(OMOGUĆEN)" : "(ONEMOGUĆEN)"}</h2>
        <input
          type="checkbox"
          checked={isEnable}
          onChange={() => setIsEnable(!isEnable)}
        />
      </Title>
      <Description>
        Ovo je oblik napada u kojem se podatci od napadača šalju u preglednik
        korisnika. Napdači mogu umjesto nekog predviđenog teksta za unos,
        unijeti zlonamjernu skriptu. Uzmimo za primjer da se na stranici
        prikazuju komentari. Od korisnika se očekuje da unese neki tekst, no on
        može unijeti bilo koju skriptu. Ako napadač unese neku skriptu u
        komentare, kada drugi korisnik otvori komentare učitati će mu se i
        izvršiti zlonamjerni kod.
      </Description>
      <Description>
        Primjer hakiranja bio bi kada bi napadač umjesto očekivanog komentara
        napisao html komponentu koja izvršava skriptu. Današnji preglednici
        automatski blokiraju prikaz skripti, postoje i drugi načini. Jedan od
        načina je da pokušamo prikazati sliku no u src atributu stavimo izvor
        koji ne postoji. U komponenti će doći do pogreške. Img komponenta ima
        funkciju "onError" koja se poziva u slučaju pogreške. U toj funkciji
        možemo pozvati bilo koju skriptu koju želimo.
      </Description>
      <li>
        <b>
          {`<img src="link-koji-ne-postoji" onError="alert('Skripta pokrenuta')"/>`}
        </b>
      </li>
      <CommentSection>
        <Input value={input} onChange={handleChange} />
        <Button
          label="Komentiraj"
          color={colors.white}
          backgroundColor={colors.primary}
          onClick={addComment}
        />
      </CommentSection>
      <h3>Komentari:</h3>
      {comments.length ? (
        comments.map((comment) => getComment(comment))
      ) : (
        <NoResults>Nema komentara</NoResults>
      )}
      <Button
        label="Resetiraj komentare"
        fullWidth
        color={colors.white}
        backgroundColor={colors.primary}
        onClick={handleRest}
      />
    </Container>
  );
};

export default XSSAttack;
