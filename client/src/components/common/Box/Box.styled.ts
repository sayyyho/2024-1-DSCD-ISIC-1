import styled from "styled-components";
import { BoxProps } from "@/interfaces/box";
import theme from "@/theme";

export const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${(props) =>
    props.$flexDirection ? `${props.$flexDirection}` : "column"};
  align-items: center;
  justify-content: ${(props) =>
    props.$justifyProps ? `${props.$justifyProps}` : "center"};
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  margin: ${(props) => (props.margin ? `${props.margin}` : 0)};
  border: ${(props) => (props.border ? `${props.border}` : 0)};
  padding: ${(props) => (props.$padding ? `${props.$padding}` : 0)};
  background-color: ${(props) =>
    props.$backgroundColor
      ? `${props.$backgroundColor}`
      : `${theme.colors.boxSub}`};
  border-radius: ${(props) => (props.radius ? `${props.radius}` : 0)};
  box-shadow: ${(props) => (props.$shadow ? `${props.$shadow}` : 0)};
  gap: ${(props) => (props.$gap ? `${props.$gap}` : 0)};
  /* 17px 17px */
`;
