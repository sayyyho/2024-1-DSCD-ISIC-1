import * as S from "./Senior.styled";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { useEffect, useState } from "react";
import { getSenior } from "@/apis/getSenior";
import { Text } from "@/components/common/Text";
import { Box } from "@/components/common/Box";
import { Button } from "@/components/common/Button";
import { seniorData } from "@/atoms/seniorData";
import { Loading } from "@/components/common/Loading";
import USER from "@/assets/images/user.png";

export const Senior = () => {
  const [loading, setLoading] = useState(true);
  const [SeniorData, setSeniorData] = useRecoilState(seniorData);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      if (SeniorData.length > 0) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await getSenior({
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        });
        setSeniorData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [setSeniorData, SeniorData.length]);

  if (loading) {
    return <Loading>AI가 추천 선배를 찾고 있어요...</Loading>;
  }
  return (
    <PageLayout $justifyContent="start" height="none">
      <Header></Header>
      <Text color="black" size="36px">
        추천 선배 보기
      </Text>
      <Text color="black" size="15px" $padding="10px">
        AI가 분석한 추천 선배입니다.
      </Text>
      {SeniorData.map((senior, index) => (
        <Box
          key={index}
          width="85%"
          $padding="20px 10px 10px 10px"
          $backgroundColor="#ffffff"
          radius="8px"
          margin="15px 0px 25px 0px"
          $shadow="0px 3.529px 3.529px 0px rgba(0, 0, 0, 0.25)"
        >
          <Box
            width="100%"
            $flexDirection="row"
            $backgroundColor="transparent"
            $justifyProps="space-between"
          >
            <img src={USER} alt="프로필" />
            <Box
              $backgroundColor="transparent"
              width="50%"
              $justifyProps="flex-end"
              $padding="0 0 0 15px"
            >
              <Text size="20px" color="black" $selfProps="start">
                {senior.name}
              </Text>
              <Text size="17px" color="black" $selfProps="start">
                {senior.job}
              </Text>
            </Box>
            <Box
              $backgroundColor="#ED774D"
              radius="8px"
              width="100px"
              height="30px"
            >
              <Text color="white" size="14px">
                유사도 : {senior.similarity_sum}
              </Text>
            </Box>
          </Box>
          <S.Grid $padding="20px 0 15px 0">
            <Text size="16px" color="black" $justifySelf="start" $isLeft={true}>
              #{senior.grades}
            </Text>
            <Text
              size="16px"
              color="black"
              $justifySelf="center"
              $isLeft={true}
            >
              #{senior.major}
            </Text>
            <Text size="16px" color="black" $justifySelf="start" $isLeft={true}>
              {senior.double_major === null ? "" : `#${senior.double_major}`}
            </Text>
          </S.Grid>
          <Button
            width="65%"
            height="2.5rem"
            radius="12px"
            isCursor={true}
            onClick={() => navigate(`/seniorDetail/${senior.id}`)}
          >
            <Text color="white" size="15px" $height="100%">
              선배 정보 상세 보기
            </Text>
          </Button>
        </Box>
      ))}
    </PageLayout>
  );
};
