import styled from "styled-components";
import { gridProps } from "./index";

export const Grid = styled.div<gridProps>`
  padding: 10px;
  width: 100%;
  display: grid;
  margin: 15px 0;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  place-items: ${(props) => `${props.$center}`};
`;
