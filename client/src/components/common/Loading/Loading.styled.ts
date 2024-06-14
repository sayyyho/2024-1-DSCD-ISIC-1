import styled, { keyframes } from "styled-components";

const runAnimation = keyframes`
  0% { transform: translateX(0%); }
  25% { transform: translateX(10%); }
  50% { transform: translateX(0%); }
  75% { transform: translateX(-10%); }
 100% { transform: translateX(0%); }
`;

export const LoadingLayout = styled.div`
    display: flex;
    width: 75%;
    height: 50%
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
`;

export const LoadingImg = styled.img`
  width: 30%;
  animation: ${runAnimation} 1s infinite;
`;
