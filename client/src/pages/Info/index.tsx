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
import { Loading } from "@/components/common/Loading";
import { Complete } from "@/components/common/Complete";
import { Box } from "@/components/common/Box";
import { useNavigate } from "react-router-dom";

export const Info = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<MultiValue<Option>>([]);
  const [selectedGrades, setSelectedGrades] = useState<Option | null>(null);
  const [selectedAward, setSelectedAward] = useState<MultiValue<Option>>(null);
  const [selectedClub, setSelectedClub] = useState<MultiValue<Option>>(null);
  const [selectedProject, setSelectedProject] =
    useState<MultiValue<Option>>(null);
  const [status, setStatus] = useState<number>(204);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "completed"
  >("idle");
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
      const data = await getInfo({
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      });
      if (data.status === 200) {
        setStatus(200);
        console.log(data);
        const skillsArray = data.data.skills
          .split(", ")
          .map((skill) => ({ value: skill, label: skill }));
        setData(data.data);
        setSelectedSkills(skillsArray);
        setSelectedGrades({
          value: data.data.grades,
          label: data.data.grades,
        });
        const AwardsArray = data.data.award_part
          .split(", ")
          .map((award) => ({ value: award, label: award }));
        setSelectedAward(AwardsArray);

        const ClubArray = data.data.club_part
          .split(", ")
          .map((club) => ({ value: club, label: club }));
        setSelectedClub(ClubArray);

        const ProjectArray = data.data.project_part
          .split(", ")
          .map((project) => ({ value: project, label: project }));

        setSelectedProject(ProjectArray);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handleProjectChange = (newValue: MultiValue<Option>) => {
    setSelectedProject(newValue);
  };

  const handleClubChange = (newValue: MultiValue<Option>) => {
    setSelectedClub(newValue);
  };

  const handleAwardChange = (newValue: MultiValue<Option>) => {
    setSelectedAward(newValue);
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
    setSubmitStatus("submitting");
    const skillsString = selectedSkills.map((skill) => skill.label).join(", ");
    const awardsString = selectedAward.map((award) => award.label).join(", ");
    const clubsString = selectedClub.map((club) => club.label).join(", ");
    const projectsString = selectedProject
      .map((project) => project.label)
      .join(", ");
    const updatedData = {
      ...data,
      skills: skillsString,
      grades: selectedGrades ? selectedGrades.label : "",
      award_part: awardsString,
      club_part: clubsString,
      project_part: projectsString,
    };
    // console.log(updatedData);
    try {
      if (status === 204) {
        await postInfo(updatedData, {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        });
        setStatus(200);
      } else {
        setData(updatedData);
        setStatus(200);
        await patchInfo(updatedData, {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        });
        // console.log(res);
      }
      setSubmitStatus("completed");
      setTimeout(() => {
        setSubmitStatus("idle");
        navigate("/home");
        window.location.reload();
      }, 1250);
    } catch (error) {
      console.error(error);
    }
  };

  if (submitStatus === "submitting") {
    return <Loading>정보를 저장 중이에요...</Loading>;
  }

  if (submitStatus === "completed") {
    return <Complete />;
  }

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
        <Box width="100%" margin="0 0 1rem 0" $backgroundColor="transparent">
          <Text
            color="black"
            size="16px"
            $selfProps="flex-start"
            $margin="0 0 0.25rem 0"
          >
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
            defaultString="주전공을 입력해주세요."
          />
        </Box>
        <Box
          width="100%"
          margin="0 0 1rem 0"
          $backgroundColor="transparent"
          $gap="0.3rem"
        >
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
            defaultString="복수전공을 입력해주세요. 없으면 X를 입력해주세요."
          />
        </Box>
        <Box
          width="100%"
          margin="0 0 1rem 0"
          $backgroundColor="transparent"
          $gap="0.3rem"
        >
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
        </Box>
        <Box
          width="100%"
          margin="0 0 1rem 0"
          $backgroundColor="transparent"
          $gap="0.3rem"
        >
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
        </Box>
        <Box
          width="100%"
          margin="0 0 1rem 0"
          $backgroundColor="transparent"
          $gap="0.3rem"
        >
          <Text color="black" size="16px" $selfProps="flex-start">
            수상이력
          </Text>
          <Select
            isMulti
            value={selectedAward}
            onChange={handleAwardChange}
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
        </Box>
        <Box
          width="100%"
          margin="0 0 1rem 0"
          $backgroundColor="transparent"
          $gap="0.3rem"
        >
          <Text color="black" size="16px" $selfProps="flex-start">
            동아리 활동
          </Text>
          <Select
            isMulti
            value={selectedClub}
            onChange={handleClubChange}
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
        </Box>
        <Box
          width="100%"
          margin="0 0 1rem 0"
          $backgroundColor="transparent"
          $gap="0.3rem"
        >
          <Text color="black" size="16px" $selfProps="flex-start">
            프로젝트 경험
          </Text>
          <Select
            isMulti
            value={selectedProject}
            onChange={handleProjectChange}
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
        </Box>
        <Button
          margin="15px 0 3rem 0px"
          width="100%"
          height="50px"
          backgroundColor="#4D3E3E"
          radius="5px"
          color="white"
          onClick={handleSubmit}
          isCursor={true}
        >
          저장하기
        </Button>
      </Wrapper>
    </PageLayout>
  );
};
