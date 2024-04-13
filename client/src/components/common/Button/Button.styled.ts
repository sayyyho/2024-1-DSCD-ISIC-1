import styled from "styled-components";
import theme from "@/theme";
import { ButtonProps } from "@/interfaces/button";

export const Button = styled.button<ButtonProps>`
  border: 0;
  background: ${theme.colors.btnDefault};
  background-color: ${(props) =>
    props.$status
      ? `${theme.colors.btnSelect}`
      : `${theme.colors[props.type]}`};
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  margin: ${(props) => (props.margin ? `${props.margin}` : 0)};
  padding: ${(props) => (props.padding ? `${props.padding}` : 0)};
  border-radius: ${(props) => (props.radius ? `${props.radius}` : 0)};
  color: ${(props) => (props.color ? `${props.color}` : "black")};
`;
