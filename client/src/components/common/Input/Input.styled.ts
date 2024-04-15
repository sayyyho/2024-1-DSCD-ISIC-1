import styled from "styled-components";
import { InputProps } from "@/interfaces/input";

export const Input = styled.input<InputProps>`
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  border-radius: ${(props) => (props.radius ? `${props.radius}` : 0)};
`;
