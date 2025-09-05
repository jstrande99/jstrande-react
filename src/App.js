// src/App.js
import React from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { GlobalStyle, theme } from "./styles";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import LiquidEther from "./reactbits/LiquidEther";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BackgroundLayer>
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={14}
          cursorSize={80}
          isViscous={false}
          viscous={24}
          iterationsViscous={12}
          iterationsPoisson={12}
          resolution={0.38}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.35}
          autoIntensity={1.6}
          takeoverDuration={0.25}
          autoResumeDelay={1500}
          autoRampDuration={0.6}
        />
      </BackgroundLayer>
      <ContentLayer>
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
      </ContentLayer>
    </ThemeProvider>
  );
}

export default App;
