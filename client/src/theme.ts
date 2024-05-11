import { DefaultTheme } from "styled-components";
import "styled-components";

declare module "styled-components" {
  export type DefaultColorKey =
    | "white"
    | "black"
    | "main"
    | "sub"
    | "boxSub"
    | "btnDefault"
    | "btnSelect"
    | "confirm";

  export interface DefaultTheme {
    colors: {
      [key in DefaultColorKey]: string;
    };
    boxShadow: string;
  }
}

const colors = {
  white: "#ffffff",
  black: "#000000",
  main: "#FEF9EB",
  sub: "#F3E1B0",
  btnDefault: "#4D3E3E",
  btnSelect: "#bed1cf",
  boxSub: "rgba(107, 119, 154, 0.05)",
  confirm: "#ffe4c9",
};
const theme: DefaultTheme = {
  colors,
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
};
export default theme;
