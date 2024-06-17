import { useState, useEffect } from "react";
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
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
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

  useEffect(() => {
    const validateForm = () => {
      const isValid =
        user.username &&
        user.password1 &&
        user.password2 &&
        user.last_name &&
        user.first_name &&
        user.email &&
        user.phone_number &&
        user.password1 === user.password2;
      setIsFormValid(isValid);
    };
    validateForm();
  }, [user]);

  const successCallback = () => {
    navigate("/login");
  };

  const { onSubmit } = useSubmit<SignUpResponse>(
    postSignUp,
    "회원가입 성공",
    successCallback
  );

  const handleSubmit = () => {
    if (!isFormValid) return;
    onSubmit(user);
  };

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
          defaultString="아이디를 입력해주세요."
          $type="text"
          $radius="6px"
          name="username"
          onChange={onChange}
          $isRequired={true}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          비밀번호
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="비밀번호를 입력해주세요."
          $type="password"
          $radius="6px"
          name="password1"
          onChange={onChange}
          $isRequired={true}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          비밀번호 확인
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="비밀번호를 다시 한 번 입력해주세요."
          $type="password"
          $radius="6px"
          name="password2"
          onChange={onChange}
          $isRequired={true}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          성
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="성씨를 입력해주세요."
          $type="text"
          $radius="6px"
          name="first_name"
          onChange={onChange}
          $isRequired={true}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          이름
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="이름을 입력해주세요."
          $type="text"
          $radius="6px"
          name="last_name"
          onChange={onChange}
          $isRequired={true}
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
          defaultString="이메일을 입력해주세요."
          $type="text"
          $radius="6px"
          name="email"
          onChange={onChange}
          $isRequired={true}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          전화번호
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="전화번호를 입력해주세요."
          $type="text"
          $radius="6px"
          name="phone_number"
          onChange={onChange}
          $isRequired={true}
        />
        <Button
          margin="20px 0px 2rem 0px"
          width="100%"
          height="50px"
          backgroundColor={isFormValid ? "#4D3E3E" : "#cccccc"}
          radius="5px"
          color="white"
          onClick={handleSubmit}
          isCursor={true}
          disabled={!isFormValid}
        >
          회원가입
        </Button>
      </Wrapper>
    </PageLayout>
  );
};

export default SignUp;
