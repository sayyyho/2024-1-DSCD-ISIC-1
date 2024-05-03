import styled from "styled-components";
import { BoxProps } from "@/interfaces/box";
import theme from "@/theme";

export const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  margin: ${(props) => (props.margin ? `${props.margin}` : 0)};
  padding: ${(props) => (props.padding ? `${props.padding}` : 0)};
  background-color: ${(props) =>
    props.backgroundColor
      ? `${props.backgroundColor}`
      : `${theme.colors.boxSub}`};
  border-radius: ${(props) => (props.radius ? `${props.radius}` : 0)};
  /* 17px 17px */
`;
