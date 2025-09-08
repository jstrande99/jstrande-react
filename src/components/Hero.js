"use client";
import React from "react";
import styled from "styled-components";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import GlassSurface from "../reactbits/GlassSurface";

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: transparent;
  color: white;
  overflow: hidden;

  @media (max-width: 576px) {
    padding: 0 1rem;
    height: 90vh;
  }
`;

// background is provided globally in App.js

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 1rem;
  position: relative;
  z-index: 1;

  @media (max-width: 576px) {
    padding: 0 0.5rem;
  }
`;

const Name = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 4rem;
  }

  @media (max-width: 576px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.lightText};

  @media (min-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 576px) {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: transparent !important;
  // border: 2px solid transparent !important;
  // background-image: linear-gradient(black, black),
  //   linear-gradient(90deg, #ffd791, #694901) !important;
  // background-origin: border-box !important;
  // background-clip: padding-box, border-box !important;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  color: white;

  // &:hover {
  //   // background-image: linear-gradient(black, black),
  //   //   linear-gradient(90deg, #ffd791, #ffd791) !important;
  //   // color: #ffd791;
  // }

  @media (max-width: 576px) {
    padding: 0.6rem 1.4rem;
  }
`;

const StyledTypewriter = styled.span`
  color: #ffffff;
`;

function Hero() {
  return (
    <HeroSection id="home">
      <HeroContent>
        <Name>Hello, I'm Jordan</Name>
        <Subtitle>
          I'm a{" "}
          <StyledTypewriter>
            <Typewriter
              words={[
                "AI Developer",
                "Designer",
                "Problem Solver",
                "Engineer",
                "Full Stack Engineer",
                "Co-Founder",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </StyledTypewriter>
        </Subtitle>
        <Link href="/contact" legacyBehavior>
          <CTAButton>
            <GlassSurface width={150} height={50} borderRadius={24}>
              Get in Touch
            </GlassSurface>
          </CTAButton>
        </Link>
      </HeroContent>
    </HeroSection>
  );
}

export default Hero;
