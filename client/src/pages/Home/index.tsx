import { PageLayout } from "@/components/PageLayout";
import { Box } from "@/components/common/Box";
import { Text } from "@/components/common/Text";
import { Wrapper } from "@/components/common/Wrapper";
import { Link, useNavigate } from "react-router-dom";
import PEOPLE_IMG from "@/assets/images/people.png";
import CASE from "@/assets/images/briefCase.svg";
import CAP from "@/assets/images/graduationCap.svg";
import { useEffect } from "react";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const moveToLogin = () => {
      navigate("/login");
    };
    if (!sessionStorage.getItem("token")) {
      moveToLogin();
    }
  }, [navigate]);

  return (
    <PageLayout $gap="1rem">
      <Box
        width="90%"
        height="55%"
        $backgroundColor="#F3E1B0"
        radius="17px 17px 17px 17px"
      >
        <Text size="3rem" color="white" $padding="0">
          졸업한 선배의
        </Text>
        <Text size="3rem" color="white" $padding="0">
          밥벌이 알아보기
        </Text>
        <Wrapper width="80%" $margin="20% 0 0 0" $isFlex={true}>
          <img src={PEOPLE_IMG} alt="선배이미지" />
        </Wrapper>
      </Box>
      <Box width="90%" height="10%" radius="17px 17px 17px 17px">
        <Link
          to="/info"
          style={{
            textDecoration: "none",
            color: "black",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          내 정보 입력하기 📚
        </Link>
      </Box>
      <Box
        width="90%"
        height="20%"
        $flexDirection="row"
        $backgroundColor="transparent"
        $justifyProps="space-between"
      >
        <Box
          width="46%"
          height="100%"
          radius="24px"
          $justifyProps="space-around"
        >
          <Link
            to="/job"
            style={{
              textDecoration: "none",
              color: "black",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              height="45%"
              $backgroundColor="transparent"
              $padding="1.5rem 0"
            >
              <img src={CASE} alt="회사가방" />
            </Box>
            <Text size="1rem" color="black">
              직업 추천 받기
            </Text>
          </Link>
        </Box>
        <Box
          width="46%"
          height="100%"
          radius="24px"
          // border="20px"
          $justifyProps="space-around"
        >
          <Link
            to="/senior"
            style={{
              textDecoration: "none",
              color: "black",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              height="45%"
              $backgroundColor="transparent"
              $padding="1.5rem 0"
            >
              <img src={CAP} alt="학사모" />
            </Box>
            <Text size="1rem" color="black">
              선배 추천 받기
            </Text>
          </Link>
        </Box>
      </Box>
      <Box width="90%" height="5%" radius="17px 17px 17px 17px">
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "black",
            width: "100%",
            height: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          로그아웃
        </Link>
      </Box>
    </PageLayout>
  );
};
