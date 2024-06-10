import { PageLayout } from "@/components/PageLayout";
import { Box } from "../Box";
import { Text } from "../Text";
import LoadingImg from "@/assets/images/loading.png";

export const Loading = () => {
  return (
    <PageLayout>
      <Box width="50%" $backgroundColor="transparent">
        <img src={LoadingImg} alt="" />
        <Text color="black" size="20px" $padding="30px">
          반영완료 !!
        </Text>
      </Box>
    </PageLayout>
  );
};
