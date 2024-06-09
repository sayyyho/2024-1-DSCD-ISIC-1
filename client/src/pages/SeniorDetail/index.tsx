import { useState, useEffect } from "react";
import { useAuthHeader } from "@/hooks/useAuth";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { getSeniorDetail } from "@/apis/getSeniorDetail";

export const SeniorDetail = () => {
  const [headers] = useState(useAuthHeader());
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSeniorDetail(headers);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [headers]);
  return (
    <PageLayout $justifyContent="flex-start">
      <Header></Header>
      <h1>Senior Detail</h1>
    </PageLayout>
  );
};
