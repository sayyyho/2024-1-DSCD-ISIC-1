import { useState } from "react";
import Select, { StylesConfig } from "react-select";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { Wrapper } from "@/components/common/Wrapper";
import { Text } from "@/components/common/Text";
import { Input } from "@/components/common/Input";
import { skills } from "@/constant/options";
import { grades } from "@/constant/options";
import { fileds } from "@/constant/options";
import { TextArea } from "@/components/common/TextArea";
import { Option } from "@/constant/options";
import { Button } from "@/components/common/Button";
import BACK from "@/assets/images/back.svg";

export const Info = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const customStyles: StylesConfig<Option, false> = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  return (
    <PageLayout $justifyContent="start">
      <Header>
        <img
          src={BACK}
          alt="뒤로가기"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(-1);
          }}
        />
      </Header>
      <Text color="black" size="36px">
        내 정보 입력하기
      </Text>
      <Wrapper
        width="85%"
        $gap="5px"
        $isFlex={true}
        $flexDirection="column"
        $margin="30px 0px 0px 0px"
        $padding="15px"
      >
        <Text color="black" size="16px" $selfProps="flex-start">
          주전공
        </Text>
        <Input
          width="98%"
          height="35px"
          $type="text"
          $radius="6px"
          name="username"
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          복수전공
        </Text>
        <Input
          width="98%"
          height="35px"
          $type="text"
          $radius="6px"
          name="username"
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          학점
        </Text>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={grades}
          styles={customStyles}
        ></Select>
        <Text color="black" size="16px" $selfProps="flex-start">
          보유기술
        </Text>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={skills}
          styles={customStyles}
        ></Select>

        <Text color="black" size="16px" $selfProps="flex-start">
          수상이력
        </Text>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={fileds}
          styles={customStyles}
        ></Select>
        <TextArea
          width="98%"
          height="100px"
          defaultString="세부 설명을 입력해주세요."
          $radius="6px"
        ></TextArea>
        <Text color="black" size="16px" $selfProps="flex-start">
          동아리 활동
        </Text>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={fileds}
          styles={customStyles}
        ></Select>
        <TextArea
          width="98%"
          height="100px"
          defaultString="세부 설명을 입력해주세요."
          $radius="6px"
        ></TextArea>
        <Text color="black" size="16px" $selfProps="flex-start">
          프로젝트 경험
        </Text>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={fileds}
          styles={customStyles}
        ></Select>
        <TextArea
          width="98%"
          height="100px"
          defaultString="세부 설명을 입력해주세요."
          $radius="6px"
        ></TextArea>
        <Button
          margin="20px 0px 0px 0px"
          width="100%"
          height="50px"
          backgroundColor="#4D3E3E"
          radius="5px"
          color="white"
        >
          저장하기
        </Button>
      </Wrapper>
    </PageLayout>
  );
};
