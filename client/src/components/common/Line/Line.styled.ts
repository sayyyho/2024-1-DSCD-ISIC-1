import styled from "styled-components";
import { LineProps } from "@/interfaces/line";

export const Line = styled.div<LineProps>`
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  background-color: ${(props) => `${props.color}`};
`;
