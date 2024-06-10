import React from "react";
import * as S from "./Grid.styled";

export interface gridProps {
  children: React.ReactNode;
  $padding?: string;
  $center?: string;
}

export const Grid = (props: gridProps) => {
  return (
    <S.Grid $padding={props.$padding} $center={props.$center}>
      {props.children}
    </S.Grid>
  );
};
