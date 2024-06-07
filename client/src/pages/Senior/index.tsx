import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { useEffect, useState } from "react";
import { getSenior, SeniorRecommendation } from "@/apis/getSenior";
import { useAuthHeader } from "@/hooks/useAuth";
import { Text } from "@/components/common/Text";
import { Box } from "@/components/common/Box";
import { Spinner } from "@/components/common/Spinner";
import { Grid } from "@/components/common/Grid";
import { Button } from "@/components/common/Button";
import USER from "@/assets/images/user.svg";

export const Senior = () => {
  const [headers] = useState(useAuthHeader());
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState<SeniorRecommendation[]>([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await getSenior(headers);
        setRes(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [headers]);

  if (loading) {
    return <Spinner />;
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
      {res.map((senior, index) => (
        <Box
          key={index}
          width="90%"
          $padding="20px 10px"
          $backgroundColor="#ffffff"
          radius="10px"
          margin="15px 0px"
          border="1px solid black"
        >
          <Box
            width="85%"
            $flexDirection="row"
            $backgroundColor="transparent"
            $justifyProps="space-between"
          >
            <img src={USER} alt="프로필" />
            <Box
              $backgroundColor="transparent"
              width="50%"
              $justifyProps="flex-end"
            >
              <Text size="14px" color="black" $selfProps="start">
                {senior.name}
              </Text>
              <Text size="14px" color="black" $selfProps="start">
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
          <Grid>
            <Text size="14px" color="black">
              #{senior.grades}
            </Text>
            <Text size="14px" color="black">
              #{senior.major}
            </Text>
            <Text size="14px" color="black">
              {senior.double_major === senior.major
                ? null
                : `#${senior.double_major}`}
            </Text>
          </Grid>
          <Button
            width="45%"
            height="25px"
            radius="12px"
            padding="1rem"
            isCursor={true}
          >
            <Text color="white" size="14px">
              선배 정보 상세 보기
            </Text>
          </Button>
        </Box>
      ))}
    </PageLayout>
  );
};
