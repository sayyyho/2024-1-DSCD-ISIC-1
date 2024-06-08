import { ButtonProps } from "@/interfaces/button";
import * as S from "./Button.styled";

export const Button = (props: ButtonProps) => {
  return (
    <S.Button
      width={props.width}
      name={props.name}
      height={props.height}
      $status={props.$status}
      margin={props.margin}
      padding={props.padding}
      radius={props.radius}
      onClick={props.onClick}
      backgroundColor={props.backgroundColor}
      disabled={props.disabled}
      color={props.color}
      fontSize={props.fontSize}
      type={props.type}
      isCursor={props.isCursor}
    >
      {props.children}
    </S.Button>
  );
};
