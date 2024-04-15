import * as S from "./Line.styled";
import { LineProps } from "@/interfaces/line";

export const Line = (props: LineProps) => {
  return (
    <S.Line
      width={props.width}
      height={props.height}
      color={props.color}
    ></S.Line>
  );
};
