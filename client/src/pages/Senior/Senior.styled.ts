import { gridProps } from "@/components/common/Grid";
import styled from "styled-components";

export const Grid = styled.div<gridProps>`
  display: grid;
  width: 100%;
  grid-template-columns: 65% 35%;
  grid-template-rows: auto auto;
  padding: ${(props) => props.$padding || "0"};
  text-align: ${(props) => props.$center || "left"};
  align-items: start;
  gap: 10px; /* 옵션: 그리드 아이템 간의 간격을 설정합니다 */
`;
