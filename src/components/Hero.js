// src/components/Hero.js
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-scroll";

const HeroSection = styled.section`
	height: 100vh;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background: black;
	color: ${({ theme }) => theme.colors.white};
	overflow: hidden;
`;

const StarCanvas = styled.canvas`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const HeroContent = styled.div`
	max-width: 800px;
	padding: 0 1rem;
	position: relative;
	z-index: 1;
`;

const Name = styled.h1`
	font-size: 3rem;
	font-weight: 700;
	margin-bottom: 1rem;

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 4rem;
	}
`;

const Subtitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 400;
	margin-bottom: 2rem;

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 2rem;
	}
`;

const CTAButton = styled(Link)`
	display: inline-block;
	padding: 0.75rem 2rem;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	border-radius: 4px;
	font-weight: 500;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${({ theme }) => theme.colors.secondary};
	}
`;

const StyledTypewriter = styled.span`
	color: #0045e6;
`;

function Hero() {
	const canvasRef = useRef(null);
	// eslint-disable-next-line
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		let animationFrameId;
		let mouseX = 0;
		let mouseY = 0;

		// Set canvas size and update dimensions
		const setCanvasSize = () => {
			const { innerWidth, innerHeight } = window;
			canvas.width = innerWidth;
			canvas.height = innerHeight;
			setDimensions({ width: innerWidth, height: innerHeight });
		};

		// Create stars
		const createStars = () => {
			const numStars = 400;
			const stars = [];
			for (let i = 0; i < numStars; i++) {
				stars.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					radius: Math.random() * 1.5 + 0.5,
					originalX: Math.random() * canvas.width,
					originalY: Math.random() * canvas.height,
				});
			}
			return stars;
		};

		// Update star positions
		const updateStars = (stars) => {
			const maxDistance = 150;
			stars.forEach((star) => {
				const dx = mouseX - star.x;
				const dy = mouseY - star.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < maxDistance) {
					const angle = Math.atan2(dy, dx);
					const force = (maxDistance - distance) / maxDistance;
					star.x += Math.cos(angle) * force * 2;
					star.y += Math.sin(angle) * force * 2;
				} else {
					star.x += (star.originalX - star.x) * 0.05;
					star.y += (star.originalY - star.y) * 0.05;
				}
			});
		};

		// Draw stars
		const drawStars = (stars) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "white";
			stars.forEach((star) => {
				ctx.beginPath();
				ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
				ctx.fill();
			});
		};

		// Animation loop
		const animate = (stars) => {
			updateStars(stars);
			drawStars(stars);
			animationFrameId = requestAnimationFrame(() => animate(stars));
		};

		// Handle mouse movement
		const handleMouseMove = (event) => {
			mouseX = event.clientX;
			mouseY = event.clientY;
		};

		// Initialize
		const init = () => {
			setCanvasSize();
			const stars = createStars();
			animate(stars);
		};

		// Delay initialization slightly to ensure proper sizing
		const timer = setTimeout(init, 100);

		// Handle window resize
		const handleResize = () => {
			setCanvasSize();
			cancelAnimationFrame(animationFrameId);
			init();
		};

		window.addEventListener("resize", handleResize);
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			clearTimeout(timer);
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<HeroSection id="home">
			<StarCanvas ref={canvasRef} />
			<HeroContent>
				<Name>Hi, I'm Jordan Strande</Name>
				<Subtitle>
					I'm a{" "}
					<StyledTypewriter>
						<Typewriter
							words={["Developer", "Designer", "Problem Solver"]}
							loop={0}
							cursor
							cursorStyle="|"
							typeSpeed={70}
							deleteSpeed={50}
							delaySpeed={1000}
						/>
					</StyledTypewriter>
				</Subtitle>
				<CTAButton to="contact" smooth={true} duration={500}>
					Get in Touch
				</CTAButton>
			</HeroContent>
		</HeroSection>
	);
}

export default Hero;
