import * as S from "./divider";
import { Line } from "../common/Line";

interface DividerProps {
  children: React.ReactNode;
}

export const Divider = (props: DividerProps) => {
  return (
    <S.Divider>
      <Line width="15%" height="1.5px" color="black"></Line>
      {props.children}
      <Line width="15%" height="1.5px" color="black"></Line>
    </S.Divider>
  );
};
