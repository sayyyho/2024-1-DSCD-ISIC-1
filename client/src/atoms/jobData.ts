import { atom } from "recoil";
import { JobRecommendation } from "@/apis/getJobs";

export const jobData = atom({
  key: "jobData",
  default: [] as JobRecommendation[],
});
