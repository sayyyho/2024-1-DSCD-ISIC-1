import { ChangeEvent, useState } from "react";
import * as S from "./LoginForm.styled";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Text } from "../common/Text";
import { Artice } from "../Article";
import { postLogin } from "@/apis/login";
import { RequestLoginParams } from "@/types/auth";

export const LoginForm = () => {
  const [user, setUser] = useState<RequestLoginParams>({
    username: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((cur: RequestLoginParams) => ({
      ...cur,
      [e.target.name]: e.target.value,
    }));
    console.log(user);
  };
  const handleLogin = () => {
    postLogin(user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <S.Wrapper>
      <S.LoginFrame>
        <Input
          width="80%"
          height="20%"
          defaultString="아이디"
          type="text"
          radius="8px"
          name="username"
          onChange={onChange}
        />
        <Input
          width="80%"
          height="20%"
          defaultString="비밀번호"
          type="password"
          radius="8px"
          name="password"
          onChange={onChange}
        />
        <Button
          width="80%"
          height="20%"
          radius="105px"
          color="white"
          onClick={handleLogin}
        >
          <Text size="1rem" color="white">
            Login
          </Text>
        </Button>
      </S.LoginFrame>
      <Artice></Artice>
    </S.Wrapper>
  );
};
