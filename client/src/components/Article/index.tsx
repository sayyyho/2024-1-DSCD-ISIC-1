import * as S from "./Article.styled";
import { Divider } from "../Divider";
import { Text } from "../common/Text";
import { Link } from "react-router-dom";
export const Artice = () => {
  return (
    <S.ArticleWrapper>
      <Divider>
        <Text color="black" size="0.8rem">
          다른 방법을 찾으시나요?
        </Text>
      </Divider>
      <S.Span>
        <Text color="black" size="0.8rem">
          아이디가 없으신가요?
        </Text>
        <Text color="black" size="0.8rem" $decoration="underline">
          <Link to={"/signUp"} style={{ color: "black" }}>
            회원가입 하기
          </Link>
        </Text>
      </S.Span>
      <S.Footer>
        <Text color="black" size="0.5rem">
          dev by ISIC
        </Text>
      </S.Footer>
    </S.ArticleWrapper>
  );
};
