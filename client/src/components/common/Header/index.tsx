import * as S from "./Header.styled";
import { HeaderProps } from "@/interfaces/header";

export const Header = (props: HeaderProps) => {
  return <S.Header alignProps={props.alignProps}>{props.children}</S.Header>;
};
