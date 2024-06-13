import styled from "styled-components";
import theme from "@/theme";
import { ButtonProps } from "@/interfaces/button";

export const Button = styled.button.attrs<ButtonProps>((props) => ({
  disabled: props.$status ? true : false,
}))<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: ${(props) =>
    props.backgroundColor
      ? `${props.backgroundColor}`
      : `${theme.colors.btnDefault}`};
  background-color: ${(props) => props.$status && `#9F5757`};
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  margin: ${(props) => (props.margin ? `${props.margin}` : 0)};
  padding: ${(props) => (props.padding ? `${props.padding}` : 0)};
  border-radius: ${(props) => (props.radius ? `${props.radius}` : 0)};
  color: ${(props) => (props.color ? `${props.color}` : "black")};
  color: ${(props) => props.$status && `white`};
  cursor: ${(props) => props.isCursor && `pointer`};
`;
