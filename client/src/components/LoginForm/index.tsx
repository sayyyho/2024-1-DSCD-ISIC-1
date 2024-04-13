import * as S from "./LoginForm.styled";
import { Input } from "../common/Input";

export const LoginForm = () => {
  return (
    <S.Wrapper>
      <Input
        width="80%"
        height="10%"
        defaultString="아이디"
        type="text"
        radius="8px"
      />
      <Input
        width="80%"
        height="10%"
        defaultString="비밀번호"
        type="password"
        radius="8px"
      />
    </S.Wrapper>
  );
};
