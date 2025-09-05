// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { GlobalStyle, theme } from "./styles";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
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
          colors={["#ffdf00", "#b09400", "#c9bc04"]}
          mouseForce={30}
          cursorSize={100}
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
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <About />
                </>
              }
            />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </ContentLayer>
    </ThemeProvider>
  );
}

export default App;
