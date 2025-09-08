"use client";

import React from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { GlobalStyle, theme } from "../src/styles";
import Header from "../src/components/Header";
import LiquidEther from "../src/reactbits/LiquidEther";
import ScrollToTop from "../src/components/ScrollToTop";
import StyledRegistry from "./styled-registry";

const BackgroundLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  background: #000;
`;

const ContentLayer = styled.div`
  position: relative;
  z-index: 1;
`;

export default function Providers({ children }) {
  const [mouseForce, setMouseForce] = React.useState(30);
  const [cursorSize, setCursorSize] = React.useState(100);

  React.useEffect(() => {
    const updateInteractiveParams = () => {
      const isLargeViewport = window.matchMedia("(min-width: 3000px)").matches;
      setMouseForce(isLargeViewport ? 45 : 30);
      setCursorSize(isLargeViewport ? 140 : 100);
    };

    updateInteractiveParams();
    window.addEventListener("resize", updateInteractiveParams);
    return () => window.removeEventListener("resize", updateInteractiveParams);
  }, []);
  return (
    <StyledRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BackgroundLayer>
          <LiquidEther
            colors={["#ffdf00", "#b09400", "#c9bc04"]}
            mouseForce={mouseForce}
            cursorSize={cursorSize}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={0.5}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.4}
          />
        </BackgroundLayer>
        <ContentLayer>
          <ScrollToTop />
          <Header />
          <main>{children}</main>
        </ContentLayer>
      </ThemeProvider>
    </StyledRegistry>
  );
}
