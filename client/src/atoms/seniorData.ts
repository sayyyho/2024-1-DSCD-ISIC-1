import { atom } from "recoil";
import { SeniorRecommendation } from "@/apis/getSenior";

export const seniorData = atom({
  key: "seniorData",
  default: [] as SeniorRecommendation[],
});
