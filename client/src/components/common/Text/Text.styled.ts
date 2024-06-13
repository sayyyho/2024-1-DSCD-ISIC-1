import styled from "styled-components";
import { TextProps } from "@/interfaces/text";

export const Text = styled.p<TextProps>`
  color: ${(props) => `${props.color}`};
  font-size: ${(props) => `${props.size}`};
  margin: 0;
  padding: ${(props) => (props.$padding ? `${props.$padding}` : 0)};
  & > span {
    display: block;
  }
  text-decoration: ${(props) =>
    props.$decoration ? `${props.$decoration}` : "none"};
  text-align: ${(props) => (props.$isLeft ? "left" : "center")};
  align-self: ${(props) => `${props.$selfProps}`};
  margin: ${(props) => (props.$margin ? `${props.$margin}` : 0)};
  justify-self: ${(props) => `${props.$justifySelf}`};
  line-height: ${(props) => (props.$lineHeight ? `${props.$lineHeight}` : "1")};
`;
