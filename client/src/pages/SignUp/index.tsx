import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { Text } from "@/components/common/Text";
import { Wrapper } from "@/components/common/Wrapper";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import BACK from "@/assets/images/back.svg";
export const SignUp = () => {
  const navigate = useNavigate();
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
          name="id"
        />
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
          name="password"
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
          name="password-check"
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
          >
            남자
          </Button>
          <Button
            width="48%"
            height="35px"
            backgroundColor="rgba(25, 33, 61, 0.08)"
            radius="6px"
          >
            여자
          </Button>
        </Wrapper>
        <Text color="black" size="16px" $selfProps="flex-start">
          성
        </Text>
        <Input
          width="98%"
          height="35px"
          defaultString="홍"
          $type="text"
          $radius="6px"
          name="gender"
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
          name="last-name"
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
          name="phone"
        />
        <Button
          margin="20px 0px 0px 0px"
          width="100%"
          height="50px"
          backgroundColor="#4D3E3E"
          radius="5px"
        >
          회원가입
        </Button>
      </Wrapper>
    </PageLayout>
  );
};
