import { TextProps } from "@/interfaces/text";
import styled from "styled-components";

export const Text = styled.p<TextProps>`
  color: ${(props) => `${props.color}`};
  font-size: ${(props) => `${props.size}`};
  margin: 0;
  text-decoration: ${(props) =>
    props.decoration ? `${props.decoration}` : "none"};
`;
