import styled from "styled-components";
import { gridProps } from "./index";

export const Grid = styled.div<gridProps>`
  padding: 0 20px;
  width: 100%;
  display: grid;
  margin: 15px 0;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  align-items: ${(props) => `${props.$alignItems}`};
`;

// place-items: ${(props) => `${props.$center}`};
