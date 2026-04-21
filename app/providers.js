"use client";

import React from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { GlobalStyle, theme } from "../src/styles";
import Header from "../src/components/Header";
import LiquidEther from "../src/reactbits/LiquidEther";
import ScrollToTop from "../src/components/ScrollToTop";
import ScrollProgress from "../src/components/ScrollProgress";
import CursorSpotlight from "../src/components/CursorSpotlight";
import IntroOverlay from "../src/components/IntroOverlay";
import StyledRegistry from "./styled-registry";

const BackgroundLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
      ellipse at 20% 10%,
      rgba(107, 78, 30, 0.22),
      transparent 55%
    ),
    radial-gradient(ellipse at 80% 90%, rgba(201, 161, 74, 0.12), transparent 60%),
    #0a0806;
`;

const ContentLayer = styled.div`
  position: relative;
  z-index: 1;
`;

export default function Providers({ children }) {
  return (
    <StyledRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BackgroundLayer>
          <LiquidEther
            colors={["#c9a14a", "#6b4e1e", "#e6cfa1"]}
            mouseForce={0}
            cursorSize={0}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.3}
            autoIntensity={0.3}
            takeoverDuration={0}
            autoResumeDelay={0}
            autoRampDuration={0.4}
          />
        </BackgroundLayer>
        <ContentLayer>
          <ScrollProgress />
          <ScrollToTop />
          <CursorSpotlight />
          <Header />
          <main>{children}</main>
        </ContentLayer>
        <IntroOverlay />
      </ThemeProvider>
    </StyledRegistry>
  );
}
