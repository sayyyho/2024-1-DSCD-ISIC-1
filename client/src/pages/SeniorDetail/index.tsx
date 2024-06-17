import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { getSeniorDetail } from "@/apis/getSeniorDetail";
import { Box } from "@/components/common/Box";
import { Text } from "@/components/common/Text";
import { useParams } from "react-router-dom";
import { SeniorDetailProps } from "@/apis/getSeniorDetail";
import { openChattingURL } from "@/constant/kakao";
import genderImg from "@/assets/images/gender.svg";
import groupImg from "@/assets/images/group.svg";
import gradeImg from "@/assets/images/grade.svg";

export const SeniorDetail = () => {
  const id = useParams<{ id: string }>().id;
  const [seniorData, setSeniorData] = useState<SeniorDetailProps>(
    {} as SeniorDetailProps
  );
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSeniorDetail(id, {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        });
        setSeniorData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  return (
    <PageLayout $justifyContent="flex-start" height="none">
      <Header></Header>
      <Box
        $backgroundColor="white"
        width="95%"
        height="310px"
        radius="20px"
        $shadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        $gap="17px"
      >
        <Text color="black" size="40px">
          {seniorData.name}
        </Text>
        <Text color="black" size="25px">
          {seniorData.job}
        </Text>
        <Box
          width="100%"
          $flexDirection="row"
          $backgroundColor="transparent"
          $justifyProps="space-around"
          height="50%"
        >
          <Box
            $backgroundColor="white"
            width="27%"
            $shadow="0px 3.529px 3.529px 0px rgba(0, 0, 0, 0.25)"
            height="90%"
            $justifyProps="start"
            radius="20px"
          >
            <img
              src={genderImg}
              alt=""
              style={{
                marginBottom: "10px",
              }}
            />
            <Text color="black" size="15px">
              {seniorData.sex}
            </Text>
          </Box>
          <Box
            $backgroundColor="white"
            width="27%"
            $shadow="0px 3.529px 3.529px 0px rgba(0, 0, 0, 0.25)"
            height="90%"
            $justifyProps="start"
            radius="20px"
          >
            <img
              src={groupImg}
              alt=""
              style={{
                marginBottom: "10px",
              }}
            />
            <Text color="black" size="15px">
              {seniorData.major}
              {seniorData.double_major ? ` / ${seniorData.double_major}` : ""}
            </Text>
          </Box>
          <Box
            $backgroundColor="white"
            width="27%"
            $shadow="0px 3.529px 3.529px 0px rgba(0, 0, 0, 0.25)"
            height="90%"
            $justifyProps="start"
            radius="20px"
          >
            <img
              src={gradeImg}
              alt=""
              style={{
                marginBottom: "10px",
              }}
            />
            <Text color="black" size="15px">
              {seniorData.grades}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        margin="25px 0"
        $shadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        width="95%"
        $backgroundColor="white"
        radius="20px"
        $padding="15px 0"
      >
        <Text color="black" size="25px" $margin="10px 0 0 0" $isLeft={true}>
          ⚒️ 보유 기술
        </Text>
        <div
          style={{
            display: "grid",
            width: "90%",
            gap: "10px",
            padding: "10px",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            margin: "1rem 0",
          }}
        >
          {seniorData.skills?.map((skill) => (
            <Box
              height="40px"
              key={skill}
              $backgroundColor="#FFFFFF"
              radius="50px"
              $shadow="0px 3.529px 3.529px 0px rgba(0, 0, 0, 0.25)"
            >
              {skill}
            </Box>
          ))}
        </div>
        <Box
          width="90%"
          radius="20px"
          $shadow="0px 3.529px 3.529px 0px rgba(0, 0, 0, 0.25)"
          $backgroundColor="transparent"
          margin="10px 0"
        >
          <Text color="black" size="25px" $margin="20px 0 0 0">
            🏅 수상 내역 🏅
          </Text>
          <Text color="black" size="15px" $margin="5px 0 10px 0">
            {seniorData.award_part}
          </Text>
        </Box>
        <Box
          width="90%"
          radius="20px"
          $shadow="0px 3.529px 3.529px 0px rgba(0, 0, 0, 0.25)"
          $backgroundColor="transparent"
          margin="10px 0"
        >
          <Text color="black" size="25px" $margin="20px 0 0 0">
            🏃🏻 동아리 활동 🏃🏻
          </Text>
          <Text color="black" size="15px" $margin="5px 0 10px 0">
            {seniorData.club_part}
          </Text>
        </Box>
        <Box
          width="90%"
          radius="20px"
          $shadow="0px 3.529px 3.529px 0px rgba(0, 0, 0, 0.25)"
          $backgroundColor="transparent"
          margin="10px 0"
        >
          <Text color="black" size="25px" $margin="20px 0 0 0">
            🎨 프로젝트 경혐 🎨
          </Text>
          <Text color="black" size="15px" $margin="5px 0 10px 0">
            {seniorData.project_part}
          </Text>
        </Box>
      </Box>
      <Box
        width="95%"
        height="40px"
        $backgroundColor="#FFFFFF"
        margin="0 0 1.5rem 0"
        radius="20px"
        $shadow="0px 3.529px 3.529px 0px rgba(0, 0, 0, 0.25)"
      >
        <Link
          to={openChattingURL[0]}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            color: "black",
          }}
        >
          선배와 소통하기
        </Link>
      </Box>
    </PageLayout>
  );
};
