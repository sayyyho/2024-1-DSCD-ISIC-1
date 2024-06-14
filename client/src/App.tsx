// import { useState } from 'react'
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import theme from "./theme";

function setScreenSize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

const App = () => {
  useEffect(() => {
    setScreenSize();
  });
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
