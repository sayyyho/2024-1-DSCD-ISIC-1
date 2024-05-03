import { PageLayout } from "@/components/PageLayout";
import { Box } from "@/components/common/Box";
import { Text } from "@/components/common/Text";
import { Wrapper } from "@/components/common/Wrapper";
import PEOPLE_IMG from "@/assets/images/people.png";

export const Home = () => {
  return (
    <PageLayout gap="1rem">
      <Box
        width="90%"
        height="60%"
        backgroundColor="#F3E1B0"
        radius="17px 17px 17px 17px"
      >
        <Text size="3rem" color="white" padding="1.5rem">
          <span>졸업한 선배의</span>
          <span>밥벌이 알아보기</span>
        </Text>
        <Wrapper width="80%" margin="20% 0 0 0">
          <img src={PEOPLE_IMG} alt="선배이미지" />
        </Wrapper>
      </Box>
      <Box width="90%" height="10%" radius="17px 17px 17px 17px">
        <Text size="1rem" color="black">
          선배 추천 받기
        </Text>
      </Box>
      <Box width="90%" height="10%" radius="17px 17px 17px 17px">
        <Text size="1rem" color="black">
          내 정보 입력하기
        </Text>
      </Box>
    </PageLayout>
  );
};
