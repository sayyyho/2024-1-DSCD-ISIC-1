import * as S from "./Input.styled";
import { InputProps } from "@/interfaces/input";

export const Input = (props: InputProps) => {
  return (
    <S.Input
      width={props.width}
      height={props.height}
      placeholder={props.defaultString}
      type={props.type}
      radius={props.radius}
    ></S.Input>
  );
};
