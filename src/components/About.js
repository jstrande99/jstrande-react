import React from "react";
import styled from "styled-components";
import GlassSurface from "../reactbits/GlassSurface";

const AboutSection = styled.section`
  position: relative;
  padding: 5rem 0;
  background-color: transparent;
  color: white;
  overflow: hidden;
  content-visibility: auto;
  contain-intrinsic-size: 1000px;
`;

// background is provided globally in App.js

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 2rem;
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 75%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ContentContainer = styled.div`
  flex: 2;
`;

const Bio = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: white;
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  padding: 100px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 0;
  transition: all 0.4s ease;
  position: relative;

  &:hover img {
    transform: translateX(-10px);
  }

  &:hover span {
    display: block;
    opacity: 1;
    transform: translateX(10px);
  }

  img {
    max-width: 60px;
    transition: transform 0.4s ease;
  }

  span {
    margin-left: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    display: none;
    color: #fff;
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;
    transform: translateX(-40px);
  }
`;

function About() {
  return (
    <AboutSection id="about">
      <Container>
        <ImageContainer>
          <ProfileImage src="/Images/headShot.png" alt="Your Name" />
        </ImageContainer>
        <ContentContainer>
          <Bio>
            I'm a full-stack developer with a passion for continuous learning.
            With deep expertise in JavaScript, React, and modern web development
            technologies, I'm driven by creativity, logic, and the constant need
            to explore new things.
          </Bio>
          <Bio>
            My journey as a developer has led me to master a variety of
            programming languages and frameworks, and I love crafting intuitive,
            efficient, and elegant solutions for complex problems. When I'm not
            coding, I enjoy keeping fit and playing guitar.
          </Bio>
        </ContentContainer>
      </Container>
      <BadgeGrid>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg"
              alt="JavaScript"
              style={{
                filter: "invert(100%) brightness(100%) saturate(100%)",
              }}
            />
            <span>JavaScript</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
              alt="React"
            />
            <span>React</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
              alt="SQL"
            />
            <span>SQL</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
              alt="CSS3"
            />
            <span>CSS3</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain-wordmark.svg"
              alt="Java"
            />
            <span>Java</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg"
              alt="NodeJS"
            />
            <span>NodeJS</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg"
              alt="Git"
              style={{
                filter: "invert(100%) brightness(100%) saturate(100%)",
              }}
            />
            <span>Git</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
              alt="GitHub"
              style={{
                filter: "invert(100%) brightness(100%) saturate(100%)",
              }}
            />
            <span>GitHub</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg"
              alt="npm"
            />
            <span>NPM</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
              alt="NextJS"
              style={{
                filter: "invert(100%) brightness(100%) saturate(100%)",
              }}
            />
            <span>NextJS</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
              alt="C"
            />
            <span>C</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
              alt="C++"
            />
            <span>C++</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
              alt="Python"
            />
            <span>Python</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
              alt="SQL"
            />
            <span>SQL</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original-wordmark.svg"
              alt="Firebase"
            />
            <span>Firebase</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain-wordmark.svg"
              alt="HTML5"
            />
            <span>HTML5</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
              alt="AWS"
            />
            <span>AWS</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
              alt="Google Cloud"
            />
            <span>G Cloud</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg"
              alt="TensorFlow"
            />
            <span>TensorFlow</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg"
              alt="Bootstrap"
            />
            <span>Bootstrap</span>
          </GlassSurface>
        </Badge>
        <Badge>
          <GlassSurface
            width={200}
            height={80}
            borderRadius={24}
            // backgroundOpacity={0.1}
            // saturation={1}
            // blur={10}
            borderWidth={0.5}
            displace={0.9}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.9}
            // mixBlendMode="screen"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg"
              alt="Pytorch"
            />
            <span>Pytorch</span>
          </GlassSurface>
        </Badge>
      </BadgeGrid>
    </AboutSection>
  );
}

export default About;
