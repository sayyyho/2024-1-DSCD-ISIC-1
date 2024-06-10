import { useRecoilState } from "recoil";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { Text } from "@/components/common/Text";
import { Box } from "@/components/common/Box";
import { useEffect, useState } from "react";
import { getJobs } from "@/apis/getJobs";
import { useAuthHeader } from "@/hooks/useAuth";
import { Spinner } from "@/components/common/Spinner";
import { jobData } from "@/atoms/jobData";

export const Job = () => {
  const [jobDataSet, setJobData] = useRecoilState(jobData);
  const [headers] = useState(useAuthHeader());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (jobDataSet.length > 0) {
      setLoading(false);
      return;
    }
    const getData = async () => {
      setLoading(true);
      try {
        const response = await getJobs(headers);
        setJobData(response.data.recommendations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [headers, jobDataSet.length, setJobData]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <PageLayout $justifyContent="start">
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
          $padding="10px"
          $backgroundColor="#ffffff"
          radius="10px"
          margin="15px 0px"
          border="1px solid black"
        >
          <Text color="black" size="24px" $padding="10px">
            {job.job_name}
          </Text>
          <Box
            $justifyProps="start"
            width="100%"
            $flexDirection="row"
            $padding="10px"
            $backgroundColor="transparent"
          >
            추천 이유
          </Box>
          <Box $justifyProps="start" $backgroundColor="transparent">
            {job.recommendation_reason}
          </Box>
          <Box
            $justifyProps="start"
            width="100%"
            $flexDirection="row"
            $padding="10px"
            $backgroundColor="transparent"
          >
            보완점
          </Box>
          <Box $justifyProps="flex-start" $backgroundColor="transparent">
            {job.improvement_points}
          </Box>
        </Box>
      ))}
    </PageLayout>
  );
};
