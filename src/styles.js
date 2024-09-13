// src/styles.js
import { createGlobalStyle } from "styled-components";

export const theme = {
	colors: {
		primary: "#694901",
		secondary: "#6c757d",
		background: "#f8f9fa",
		text: "#333333",
		lightText: "#6c757d",
		white: "#ffffff",
	},
	fonts: {
		main: "'Poppins', sans-serif",
		heading: "'Playfair Display', serif",
	},
	breakpoints: {
		mobile: "576px",
		tablet: "768px",
		desktop: "992px",
	},
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    margin-bottom: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .section-padding {
    padding: 5rem 2rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
`;
