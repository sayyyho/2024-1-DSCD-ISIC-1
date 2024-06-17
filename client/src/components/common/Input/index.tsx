import * as S from "./Input.styled";
import { InputProps } from "@/interfaces/input";

export const Input = (props: InputProps) => {
  return (
    <S.Input
      width={props.width}
      height={props.height}
      placeholder={props.defaultString}
      $type={props.$type}
      $radius={props.$radius}
      name={props.name}
      onChange={props.onChange}
      value={props.value}
      required={props.$isRequired}
    ></S.Input>
  );
};
