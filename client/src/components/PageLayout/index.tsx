import * as S from "@/components/PageLayout/PageLayout.styled";
import { WrapperProps } from "@/interfaces/wrapper";

export const PageLayout = (props: WrapperProps) => {
  return (
    <S.Wrapper
      $gap={props.$gap}
      $justifyContent={props.$justifyContent}
      height={props.height}
      $isScroll={props.$isScroll}
    >
      {props.children}
    </S.Wrapper>
  );
};
