import * as S from "./Loading.styled";
import { PageLayout } from "@/components/PageLayout";
import { Text } from "../Text";
import LOADING_LOGO from "@/assets/images/loading.png";

export const Loading = (props: { children: React.ReactNode }) => {
  return (
    <PageLayout>
      <S.LoadingLayout>
        <S.LoadingImg src={LOADING_LOGO} alt="이미지" />
        <Text color="black" size="20px">
          {props.children}
        </Text>
      </S.LoadingLayout>
    </PageLayout>
  );
};
