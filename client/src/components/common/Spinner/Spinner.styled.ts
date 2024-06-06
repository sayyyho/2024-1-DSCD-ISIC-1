import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const spin = keyframes`
    to {
        transform: rotate(1turn);
    }
`;

export const Spinner = styled.div`
  width: 100px;
  height: 100px;
  border: 5px solid white;
  border-radius: 50%;
  border-top-color: royalblue;
  animation: ${spin} 0.8s infinite ease-in-out;
`;
