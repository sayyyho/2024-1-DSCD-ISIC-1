import * as S from "@/components/PageLayout/PageLayout.styled";

interface Props {
  children?: React.ReactNode;
}

export const PageLayout = (props: Props) => {
  return <S.Wrapper>{props.children}</S.Wrapper>;
};
