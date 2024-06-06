import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { useEffect } from "react";
import { getJobs } from "@/apis/getJobs";
import { useAuthHeader } from "@/hooks/useAuth";

export const Job = () => {
  const headers = useAuthHeader();
  useEffect(() => {
    const getData = async () => {
      const res = await getJobs(headers);
      console.log(res);
    };
    getData();
  }, [headers]);
  return (
    <PageLayout $justifyContent="start">
      <Header></Header>
      <h1>Job</h1>
    </PageLayout>
  );
};
