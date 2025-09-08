// src/components/Header.js
"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GlassSurface from "../reactbits/GlassSurface";

const NavbarContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: black;
  transition: background-color 0.3s ease;
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-left: 2rem;
`;

const NavAnchor = styled.a`
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <NavbarContainer $scrolled={scrolled}>
      <Nav
        style={{
          backgroundColor: "transparent",
          background: "transparent",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <NavLinks>
          <NavItem>
            <Link href="/" legacyBehavior passHref>
              <NavAnchor className={pathname === "/" ? "active" : ""}>
                <GlassSurface
                  width={100}
                  height={50}
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
                  Home
                </GlassSurface>
              </NavAnchor>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/projects" legacyBehavior passHref>
              <NavAnchor className={pathname === "/projects" ? "active" : ""}>
                <GlassSurface
                  width={100}
                  height={50}
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
                  Projects
                </GlassSurface>
              </NavAnchor>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavAnchor className={pathname === "/contact" ? "active" : ""}>
                <GlassSurface
                  width={100}
                  height={50}
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
                  Contact
                </GlassSurface>
              </NavAnchor>
            </Link>
          </NavItem>
        </NavLinks>
        <NavLinks>
          <NavItem>
            <Link href="/resume" legacyBehavior passHref>
              <NavAnchor className={pathname === "/resume" ? "active" : ""}>
                <GlassSurface
                  width={100}
                  height={50}
                  borderRadius={24}
                  borderWidth={0.5}
                  displace={0.9}
                  distortionScale={-180}
                  redOffset={0}
                  greenOffset={10}
                  blueOffset={20}
                  brightness={50}
                  opacity={0.9}
                >
                  Resume
                </GlassSurface>
              </NavAnchor>
            </Link>
          </NavItem>
        </NavLinks>
      </Nav>
    </NavbarContainer>
  );
}

export default Header;
