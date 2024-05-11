import styled from "styled-components";
import { TextProps } from "@/interfaces/text";

export const Text = styled.p<TextProps>`
  color: ${(props) => `${props.color}`};
  font-size: ${(props) => `${props.size}`};
  margin: 0;
  padding: ${(props) => (props.padding ? `${props.padding}` : 0)};
  & > span {
    display: block;
  }
  text-decoration: ${(props) =>
    props.decoration ? `${props.decoration}` : "none"};
  text-align: left;
`;
