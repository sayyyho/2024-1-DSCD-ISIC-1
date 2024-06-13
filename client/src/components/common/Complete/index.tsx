import { PageLayout } from "@/components/PageLayout";
import { Text } from "../Text";
import loading from "@/assets/images/loading.png";
import styled from "styled-components";

const LoadingLayout = styled.div`
    display: flex;
    width: 75%;
    height: 50%
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
`;

const LoadingImg = styled.img`
  width: 30%;
`;

export const Complete = () => {
  return (
    <PageLayout>
      <LoadingLayout>
        <LoadingImg src={loading}></LoadingImg>
        <Text color="black" size="20px">
          반영완료 !!
        </Text>
      </LoadingLayout>
    </PageLayout>
  );
};
