import * as S from "./Select.styled";
import { InputProps } from "@/interfaces/input";

export const Select = (props: InputProps) => {
  return (
    <S.Select width={props.width} height={props.height} $radius={props.$radius}>
      (
      {props.$dropType === "grade" ? (
        <>
          <option value="none">학점을 선택해주세요.</option>
          <option value="4.0">4.0 이상</option>
          <option value="3.5~4.0">3.5 이상 4.0 미만</option>
          <option value="3.0~3.5">3.0 이상 3.5 미만</option>
          <option value="3.0">3.0 미만</option>
        </>
      ) : (
        <>
          <option value="none">관련 분야를 선택해 주세요.</option>
          <option value="pd">기획 및 디자인</option>
          <option value="front">프론트엔드 개발</option>
          <option value="back">백엔드 개발</option>
          <option value="data">데이터 분석</option>
          <option value="ai">인공지능</option>
          <option value="etc">해당 없음</option>
        </>
      )}
      )
    </S.Select>
  );
};
