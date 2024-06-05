import * as S from "./Header.styled";
import { HeaderProps } from "@/interfaces/header";
import BACK from "@/assets/images/back.svg";
import { useNavigate } from "react-router-dom";

export const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <S.Header alignProps={props.alignProps}>
      <img
        src={BACK}
        alt="뒤로가기"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate(-1);
        }}
      />
    </S.Header>
  );
};
