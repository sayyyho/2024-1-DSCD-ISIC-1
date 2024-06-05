import { isAxiosError } from "axios";
import { instance } from "./axios";

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};

export const getInfo = async () => {
  try {
    const response = await instance.get(`/accounts/profile/`, { headers });
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};

// form

/* 
award_detail : "환경 데이터 분석 경진대회에서 최우수상을 수상했습니다."
award_part : "백엔드 관련"
club_detail : "교내 데이터 분석 동아리에서 활동하며 다양한 데이터 분석 프로젝트를 진행했습니다."
club_part : "백엔드 관련"
double_major : "데이터사이언스연계전공"
grades : "4.0 이상"
id : 1
major : "정보통신공학과"
project_detail : "온라인 소매 데이터를 분석하여 고객 세분화 및 타겟 마케팅 전략을 개발했습니다. 주요 사용 기술은 Python, SQL, 그리고 R이며, 데이터 전처리부터 통계적 분석, 예측 모델링까지 전 과정을 담당했습니다."
project_part : "없음"
skills : "파이썬, 장고"
user : 1

*/
