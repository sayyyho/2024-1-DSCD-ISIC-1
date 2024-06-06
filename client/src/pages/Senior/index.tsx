import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { useEffect } from "react";
import { getSenior } from "@/apis/getSenior";
import { getSeniorDetail } from "@/apis/getSeniorDetail";
import { useAuthHeader } from "@/hooks/useAuth";

export const Senior = () => {
  const header = useAuthHeader();
  useEffect(() => {
    const getData = async () => {
      const res = await getSenior(header);
      const res2 = await getSeniorDetail(header);
      console.log(res);
      console.log(res2);
    };
    getData();
  }, [header]);
  return (
    <PageLayout $justifyContent="start">
      <Header></Header>
      <h1>Senior</h1>
    </PageLayout>
  );
};
