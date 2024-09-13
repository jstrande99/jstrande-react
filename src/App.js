// src/App.js
import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Header />
			<main>
				<Hero />
				<About />
				<Projects />
				<Contact />
			</main>
			<Footer />
		</ThemeProvider>
	);
}

export default App;
