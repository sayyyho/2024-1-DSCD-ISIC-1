import { useEffect } from "react";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { getSeniorDetail } from "@/apis/getSeniorDetail";
import { Box } from "@/components/common/Box";
import { Text } from "@/components/common/Text";
import { useParams } from "react-router-dom";
import { SeniorDetailProps } from "@/apis/getSeniorDetail";
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
        height="45vh"
        radius="20px"
        $shadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      >
        <Text color="black" size="40px" $margin="0 0 5px 0">
          {seniorData.name}
        </Text>
        <Text color="black" size="25px" $margin="0 0 5px 0">
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
            height="95%"
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
            </Text>
            <Text color="black" size="15px">
              {seniorData.double_major ? seniorData.double_major : ""}
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
        margin="20px 0"
        $shadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        width="95%"
        $backgroundColor="white"
        radius="20px"
        $padding="10px 0"
      >
        <Text color="black" size="25px" $margin="10px 0 0 0">
          보유 기술
        </Text>
        <div
          style={{
            display: "grid",
            width: "90%",
            gap: "10px",
            padding: "10px",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          }}
        >
          {seniorData.skills?.map((skill) => (
            <Box
              height="40px"
              key={skill}
              $backgroundColor="#FFFFFF"
              radius="10px"
              border="1px solid #000000"
            >
              {skill}
            </Box>
          ))}
        </div>
        <Text color="black" size="25px" $margin="20px 0 0 0">
          수상 내역
        </Text>
        <Text color="black" size="15px" $margin="10px 0 0 0">
          {seniorData.award_part}
        </Text>
        <Text color="black" size="25px" $margin="20px 0 0 0">
          동아리 활동
        </Text>
        <Text color="black" size="15px" $margin="10px 0 0 0">
          {seniorData.club_part}
        </Text>
        <Text color="black" size="25px" $margin="20px 0 0 0">
          프로젝트 경혐
        </Text>
        <Text color="black" size="15px" $margin="10px 0 0 0">
          {seniorData.project_part}
        </Text>
      </Box>
    </PageLayout>
  );
};
