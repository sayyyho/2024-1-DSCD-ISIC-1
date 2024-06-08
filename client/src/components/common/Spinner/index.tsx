import * as S from "./Spinner.styled";
import { Text } from "../Text";

export const Spinner = (props: { children?: string }) => {
  return (
    <S.Wrapper>
      <S.Spinner />
      <Text size="20px" color="black">
        {props.children ? props.children : "정보를 불러오고 있습니다..."}
      </Text>
    </S.Wrapper>
  );
};
