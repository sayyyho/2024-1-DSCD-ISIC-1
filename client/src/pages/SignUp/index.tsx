import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { Text } from "@/components/common/Text";
import { Wrapper } from "@/components/common/Wrapper";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { RequestSignUpParams } from "@/types/auth";
import { postSignUp } from "@/apis/signUp";
import { useSubmit } from "@/hooks/useSubmitStatus";

interface SignUpResponse {
  status: number;
  message?: string;
}

export const SignUp = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<boolean>(true);
  const [user, setUser] = useState<RequestSignUpParams>({
    username: "",
    password1: "",
    password2: "",
    last_name: "",
    first_name: "",
    sex: "남자",
    email: "",
    phone_number: "",
  });
  const handleStatus = () => {
    setStatus((cur) => !cur);
    setUser((cur: RequestSignUpParams) => ({
      ...cur,
      sex: status ? "여자" : "남자",
    }));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((cur: RequestSignUpParams) => ({
      ...cur,
      [e.target.name]: e.target.value,
    }));
  };

  const successCallback = () => {
    navigate("/login");
  };

  const { onSubmit } = useSubmit<SignUpResponse>(
    postSignUp,
    "회원가입 성공",
    successCallback
  );

  return (
    <PageLayout $justifyContent="start">
      <Header></Header>
      <Text color="black" size="36px">
        회원가입
      </Text>
      <Wrapper
        width="85%"
        $gap="10px"
        $isFlex={true}
        $flexDirection="column"
        $margin="40px 0px 0px 0px"
        $padding="20px"
      >
        <Text color="black" size="16px" $selfProps="flex-start">
          아이디
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="jang99"
          $type="text"
          $radius="6px"
          name="username"
          onChange={onChange}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          비밀번호
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="⦁⦁⦁⦁⦁⦁⦁⦁⦁⦁"
          $type="password"
          $radius="6px"
          name="password1"
          onChange={onChange}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          비밀번호 확인
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="⦁⦁⦁⦁⦁⦁⦁⦁⦁⦁"
          $type="password"
          $radius="6px"
          name="password2"
          onChange={onChange}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          성
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="홍"
          $type="text"
          $radius="6px"
          name="first_name"
          onChange={onChange}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          이름
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="길동"
          $type="text"
          $radius="6px"
          name="last_name"
          onChange={onChange}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          성별
        </Text>
        <Wrapper width="100%" $isFlex={true} $justifyContent="space-between">
          <Button
            width="48%"
            height="35px"
            backgroundColor="rgba(25, 33, 61, 0.08)"
            radius="6px"
            name="sex"
            $status={status}
            onClick={handleStatus}
            isCursor={true}
          >
            남자
          </Button>
          <Button
            width="48%"
            height="35px"
            backgroundColor="rgba(25, 33, 61, 0.08)"
            radius="6px"
            name="sex"
            $status={!status}
            isCursor={true}
            onClick={handleStatus}
          >
            여자
          </Button>
        </Wrapper>
        <Text color="black" size="16px" $selfProps="flex-start">
          이메일
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="323psh@dongguk.edu"
          $type="text"
          $radius="6px"
          name="email"
          onChange={onChange}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          전화번호
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="01012341234"
          $type="text"
          $radius="6px"
          name="phone_number"
          onChange={onChange}
        />
        <Button
          margin="20px 0px 2rem 0px"
          width="100%"
          height="50px"
          backgroundColor="#4D3E3E"
          radius="5px"
          color="white"
          onClick={() => onSubmit(user)}
          isCursor={true}
        >
          회원가입
        </Button>
      </Wrapper>
    </PageLayout>
  );
};

export default SignUp;
