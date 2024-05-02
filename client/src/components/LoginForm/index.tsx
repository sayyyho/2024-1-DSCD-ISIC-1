import * as S from "./LoginForm.styled";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Text } from "../common/Text";
import { Artice } from "../Article";

export const LoginForm = (props: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
}) => {
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
          onChange={props.onChange}
        />
        <Input
          width="80%"
          height="20%"
          defaultString="비밀번호"
          type="password"
          radius="8px"
          name="password"
          onChange={props.onChange}
        />
        <Button
          width="80%"
          height="20%"
          radius="105px"
          color="white"
          onClick={props.handleLogin}
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
