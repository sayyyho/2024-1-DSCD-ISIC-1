import React from "react";
import * as S from "./Grid.styled";

export const Grid = (props: { children: React.ReactNode }) => {
  return <S.Grid>{props.children}</S.Grid>;
};
