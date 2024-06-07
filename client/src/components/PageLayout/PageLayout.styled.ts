import styled from "styled-components";
import { WrapperProps } from "@/interfaces/wrapper";

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}` : "100%")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => props.$justifyContent || "center"};
  row-gap: ${(props) => (props.$gap ? `${props.$gap}` : 0)};
`;
