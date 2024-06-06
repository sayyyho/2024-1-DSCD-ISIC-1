import { useState, useEffect, useCallback } from "react";
import Select, { StylesConfig, MultiValue } from "react-select";
import { getInfo, postInfo, patchInfo, Info as InfoType } from "@/apis/info";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/common/Header";
import { Wrapper } from "@/components/common/Wrapper";
import { Text } from "@/components/common/Text";
import { Input } from "@/components/common/Input";
import { skills, grades, fields, Option } from "@/constant/options";
import { TextArea } from "@/components/common/TextArea";
import { Button } from "@/components/common/Button";
import { Grid } from "@/components/common/Grid";
import { Box } from "@/components/common/Box";
import { useAuthHeader } from "@/hooks/useAuth";

export const Info = () => {
  const [header] = useState(useAuthHeader());
  const [selectedSkills, setSelectedSkills] = useState<MultiValue<Option>>([]);
  const [selectedGrades, setSelectedGrades] = useState<Option | null>(null);
  const [selectedAward, setSelectedAward] = useState<Option | null>(null);
  const [selectedClub, setSelectedClub] = useState<Option | null>(null);
  const [selectedProject, setSelectedProject] = useState<Option | null>(null);
  const [status, setStatus] = useState<number>(204);
  const [data, setData] = useState<InfoType>({
    award_detail: "",
    award_part: "",
    club_detail: "",
    club_part: "",
    double_major: "",
    grades: "",
    major: "",
    project_detail: "",
    project_part: "",
    skills: "",
  });

  const fetchData = useCallback(async () => {
    try {
      console.log("callback");
      const data = await getInfo(header);
      if (data.status === 200) {
        setStatus(200);
        const skillsArray = data.data.skills
          .split(", ")
          .map((skill) => ({ value: skill, label: skill }));
        setData(data.data);
        setSelectedSkills(skillsArray);
        setSelectedGrades({
          value: data.data.grades,
          label: data.data.grades,
        });
        setSelectedAward({
          value: data.data.award_part,
          label: data.data.award_part,
        });
        setSelectedClub({
          value: data.data.club_part,
          label: data.data.club_part,
        });
        setSelectedProject({
          value: data.data.project_part,
          label: data.data.project_part,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [header]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
    
  const customStyles: StylesConfig<Option, false> = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  const handleSkillsChange = (newValue: MultiValue<Option>) => {
    setSelectedSkills(newValue);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((cur: InfoType) => ({
      ...cur,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const skillsString = selectedSkills.map((skill) => skill.label).join(", ");
    const updatedData = {
      ...data,
      skills: skillsString,
      grades: selectedGrades ? selectedGrades.label : "",
      award_part: selectedAward ? selectedAward.label : "",
      club_part: selectedClub ? selectedClub.label : "",
      project_part: selectedProject ? selectedProject.label : "",
    };
    console.log(updatedData);
    try {
      if (status === 204) {
        await postInfo(updatedData, header);
        setStatus(200);
      } else {
        setData(updatedData);
        setStatus(200);
        await patchInfo(updatedData, header);
        // console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout $justifyContent="start">
      <Header />
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
          name="major"
          value={data.major}
          onChange={onChange}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          복수전공
        </Text>
        <Input
          width="98%"
          height="35px"
          $type="text"
          $radius="6px"
          name="double_major"
          value={data.double_major}
          onChange={onChange}
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          학점
        </Text>
        <Select
          value={selectedGrades}
          onChange={setSelectedGrades}
          options={grades}
          styles={customStyles}
          placeholder="학점을 선택해주세요."
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          보유기술
        </Text>
        <Select
          isMulti
          value={selectedSkills}
          onChange={handleSkillsChange}
          options={skills}
          styles={customStyles}
          placeholder="보유기술을 선택해주세요."
        />
        {selectedSkills.length > 0 && (
          <Grid>
            {selectedSkills.map((skill) => (
              <Box
                key={skill.value}
                height="40px"
                $backgroundColor="#9F5757"
                radius="10px"
              >
                <Text color="black" size="15px">
                  {skill.label}
                </Text>
              </Box>
            ))}
          </Grid>
        )}
        <Text color="black" size="16px" $selfProps="flex-start">
          수상이력
        </Text>
        <Select
          value={selectedAward}
          onChange={setSelectedAward}
          options={fields}
          styles={customStyles}
          placeholder="관련분야를 선택해주세요."
        />
        <TextArea
          width="98%"
          height="100px"
          name="award_detail"
          value={data.award_detail}
          onChange={onChange}
          defaultString="세부 설명을 입력해주세요."
          $radius="6px"
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          동아리 활동
        </Text>
        <Select
          value={selectedClub}
          onChange={setSelectedClub}
          options={fields}
          styles={customStyles}
          placeholder="관련분야를 선택해주세요."
        />
        <TextArea
          width="98%"
          height="100px"
          name="club_detail"
          value={data.club_detail}
          onChange={onChange}
          defaultString="세부 설명을 입력해주세요."
          $radius="6px"
        />
        <Text color="black" size="16px" $selfProps="flex-start">
          프로젝트 경험
        </Text>
        <Select
          value={selectedProject}
          onChange={setSelectedProject}
          options={fields}
          styles={customStyles}
          placeholder="관련분야를 선택해주세요."
        />
        <TextArea
          width="98%"
          height="100px"
          name="project_detail"
          value={data.project_detail}
          onChange={onChange}
          defaultString="세부 설명을 입력해주세요."
          $radius="6px"
        />
        <Button
          margin="20px 0px 0px 0px"
          width="100%"
          height="50px"
          backgroundColor="#4D3E3E"
          radius="5px"
          color="white"
          onClick={handleSubmit}
        >
          저장하기
        </Button>
      </Wrapper>
    </PageLayout>
  );
};
