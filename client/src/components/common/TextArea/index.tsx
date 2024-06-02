import * as S from "./TextArea.styled";
import { InputProps } from "@/interfaces/input";

export const TextArea = (props: InputProps) => {
  return (
    <S.TextArea
      width={props.width}
      height={props.height}
      placeholder={props.defaultString}
      $radius={props.$radius}
    />
  );
};
