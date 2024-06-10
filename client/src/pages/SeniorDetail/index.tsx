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
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  return (
    <PageLayout $justifyContent="flex-start">
      <Header></Header>
      <Box $backgroundColor="white" width="90%" radius="20px">
        <Text color="black" size="20px">
          <Text color="black" size="40px">
            {seniorData.name}
          </Text>
          <Text color="black" size="25px">
            {seniorData.job}
          </Text>
        </Text>
        <Box
          width="100%"
          $flexDirection="row"
          $backgroundColor="transparent"
          $justifyProps="space-around"
        >
          <Box $backgroundColor="white" width="27%">
            <img src={genderImg} alt="" />
            <Text color="black" size="15px">
              {seniorData.sex}
            </Text>
          </Box>
          <Box $backgroundColor="white" width="27%">
            <img src={groupImg} alt="" />
            <Text color="black" size="15px">
              {seniorData.major}
            </Text>
            <Text color="black" size="15px">
              {seniorData.double_major ? seniorData.double_major : ""}
            </Text>
          </Box>
          <Box $backgroundColor="white" width="27%">
            <img src={gradeImg} alt="" />
            <Text color="black" size="15px">
              {seniorData.grades}
            </Text>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};
