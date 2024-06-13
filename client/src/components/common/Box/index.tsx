import { BoxProps } from "@/interfaces/box";
import * as S from "./Box.styled";

export const Box = (props: BoxProps) => {
  return (
    <S.Box
      width={props.width}
      height={props.height}
      margin={props.margin}
      border={props.border}
      $padding={props.$padding}
      radius={props.radius}
      color={props.color}
      fontSize={props.fontSize}
      $backgroundColor={props.$backgroundColor}
      $flexDirection={props.$flexDirection}
      $justifyProps={props.$justifyProps}
      $shadow={props.$shadow}
      $gap={props.$gap}
    >
      {props.children}
    </S.Box>
  );
};
