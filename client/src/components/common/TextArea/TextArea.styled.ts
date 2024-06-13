import styled from "styled-components";
import { InputProps } from "@/interfaces/input";

export const TextArea = styled.textarea<InputProps>`
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  border-radius: ${(props) => (props.$radius ? `${props.$radius}` : 0)};
  border: hsl(0, 0%, 80%) solid 1px;
`;
