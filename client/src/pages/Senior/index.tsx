import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { useEffect } from "react";
import { getSenior } from "@/apis/getSenior";
import { useAuthHeader } from "@/hooks/useAuth";

export const Senior = () => {
  const header = useAuthHeader();
  useEffect(() => {
    const getData = async () => {
      const res = await getSenior(header);
      console.log(res);
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
