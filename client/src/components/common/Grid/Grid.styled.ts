import styled from "styled-components";

export const Grid = styled.div`
  padding: 20px 0;
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
`;
