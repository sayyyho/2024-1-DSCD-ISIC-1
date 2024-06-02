import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { Text } from "@/components/common/Text";
import { Wrapper } from "@/components/common/Wrapper";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import BACK from "@/assets/images/back.svg";
import { RequestSignUpParams } from "@/types/auth";
import { postSignUp } from "@/apis/signUp";
import Swal from "sweetalert2";

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
  const onSubmit = async () => {
    Swal.fire({
      title: "회원 가입 요청",
      text: "잠시만 기다려 주세요.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await postSignUp(user);
      if (res.status === 204) {
        Swal.fire({
          title: "회원가입 성공",
          text: "로그인 페이지로 이동합니다.",
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: "에러 발생!",
          text: "문제가 발생했습니다. 다시 시도해 주세요.",
          icon: "error",
          confirmButtonColor: "#ed8b00",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "에러 발생!",
        text: "문제가 발생했습니다. 다시 시도해 주세요.",
        icon: "error",
        confirmButtonColor: "#ed8b00",
      });
    }
  };
  return (
    <PageLayout $justifyContent="start">
      <Header>
        <img
          src={BACK}
          alt="뒤로가기"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(-1);
          }}
        />
      </Header>
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
          margin="20px 0px 0px 0px"
          width="100%"
          height="50px"
          backgroundColor="#4D3E3E"
          radius="5px"
          color="white"
          onClick={onSubmit}
        >
          회원가입
        </Button>
      </Wrapper>
    </PageLayout>
  );
};
