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
    <div
      style={{
        width: "100%",
        height: "50%",
        backgroundColor: "#F3E1B0",
        paddingTop: "10%",
        borderRadius: "17px 17px 0 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <S.LoginFrame>
        <Input
          width="80%"
          height="20%"
          defaultString="아이디"
          $type="text"
          $radius="8px"
          name="username"
          onChange={props.onChange}
        />
        <Input
          width="80%"
          height="20%"
          defaultString="비밀번호"
          $type="password"
          $radius="8px"
          name="password"
          onChange={props.onChange}
        />
        <Button
          width="80%"
          height="20%"
          radius="105px"
          color="white"
          onClick={props.handleLogin}
          isCursor={true}
        >
          <Text size="1rem" color="white">
            Login
          </Text>
        </Button>
      </S.LoginFrame>
      <Artice></Artice>
    </div>
  );
};
