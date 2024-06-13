import { useRecoilState } from "recoil";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { Text } from "@/components/common/Text";
import { Box } from "@/components/common/Box";
import { useEffect, useState } from "react";
import { getJobs } from "@/apis/getJobs";
import { jobData } from "@/atoms/jobData";
import { Loading } from "@/components/common/Loading";

export const Job = () => {
  const [jobDataSet, setJobData] = useRecoilState(jobData);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (jobDataSet.length > 0) {
      setLoading(false);
      return;
    }
    const getData = async () => {
      setLoading(true);
      try {
        const response = await getJobs({
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        });
        setJobData(response.data.recommendations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [jobDataSet.length, setJobData]);

  if (loading) {
    return <Loading>AI가 추천 직업을 찾고 있어요...</Loading>;
  }

  return (
    <PageLayout $justifyContent="start" height="none">
      <Header></Header>
      <Text color="black" size="36px">
        추천 직업 보기
      </Text>
      <Text color="black" size="15px" $padding="10px">
        AI가 분석한 추천 직업입니다.
      </Text>
      {jobDataSet.map((job, index) => (
        <Box
          key={index}
          width="90%"
          $padding="25px 10px"
          $backgroundColor="#ffffff"
          radius="10px"
          margin="15px 0px"
          $shadow="0px 3.529px 3.529px 0px rgba(0, 0, 0, 0.25)"
        >
          <Text color="black" size="1.5rem" $padding="10px" $margin="0.5rem">
            🍚 {job.job_name} 🍚
          </Text>
          <Box
            $justifyProps="start"
            width="100%"
            $flexDirection="row"
            $padding="10px"
            $backgroundColor="transparent"
            margin="15px 0 5px 0"
          >
            <Text size="1.2rem" color="black">
              추천 이유
            </Text>
          </Box>
          <Box $justifyProps="start" $backgroundColor="transparent">
            <Text color="black" size="14px" $isLeft={true} $lineHeight="20px">
              {job.recommendation_reason}
            </Text>
          </Box>
          <Box
            $justifyProps="start"
            width="100%"
            $flexDirection="row"
            $padding="10px"
            $backgroundColor="transparent"
            margin="15px 0 5px 0"
          >
            <Text size="1.2rem" color="black">
              보완점
            </Text>
          </Box>
          <Box $justifyProps="flex-start" $backgroundColor="transparent">
            <Text color="black" size="14px" $isLeft={true} $lineHeight="20px">
              {job.improvement_points}
            </Text>
          </Box>
        </Box>
      ))}
    </PageLayout>
  );
};
