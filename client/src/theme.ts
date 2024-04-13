import { DefaultTheme } from "styled-components";
import "styled-components";

declare module "styled-components" {
  export type DefaultColorKey =
    | "white"
    | "black"
    | "main"
    | "sub"
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
  main: "#f2efe5",
  sub: "#f5f5f5",
  btnDefault: "#4D3E3E",
  btnSelect: "#bed1cf",
  confirm: "#ffe4c9",
};
const theme: DefaultTheme = {
  colors,
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
};
export default theme;
