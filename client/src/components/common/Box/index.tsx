import { BoxProps } from "@/interfaces/box";
import * as S from "./Box.styled";

export const Box = (props: BoxProps) => {
  return (
    <S.Box
      width={props.width}
      height={props.height}
      margin={props.margin}
      padding={props.padding}
      radius={props.radius}
      color={props.color}
      fontSize={props.fontSize}
      backgroundColor={props.backgroundColor}
    >
      {props.children}
    </S.Box>
  );
};
