import React, { useEffect, useRef } from "react";
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
	background-color: black;
	color: white;
	overflow: hidden;
`;

const CanvasBackground = styled.canvas`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
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

	@media (min-width: 768px) {
		font-size: 4rem;
	}
`;

const Subtitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 400;
	margin-bottom: 2rem;

	@media (min-width: 768px) {
		font-size: 2rem;
	}
`;

const CTAButton = styled(Link)`
	display: inline-block;
	padding: 0.75rem 2rem;
	background-color: transparent !important;
	border: 2px solid transparent !important;
	background-image: linear-gradient(black, black),
		linear-gradient(90deg, #ffd791, #694901) !important;
	background-origin: border-box !important;
	background-clip: padding-box, border-box !important;
	border-radius: 10px;
	cursor: pointer;
	font-weight: 500;
	transition: background-color 0.3s ease;
	color: white;

	&:hover {
		background-image: linear-gradient(black, black),
			linear-gradient(90deg, #ffd791, #ffd791) !important;
		color: #ffd791;
	}
`;

const StyledTypewriter = styled.span`
	color: #ffffff;
`;

function Hero() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		let particlesArray = [];
		const numberOfParticles = 120;

		// Set canvas dimensions
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		let mouse = {
			x: null,
			y: null,
			radius: 300, // Increased mouse radius for larger interaction area
		};

		window.addEventListener("mousemove", function (event) {
			mouse.x = event.x;
			mouse.y = event.y;
		});

		class Particle {
			constructor(x, y, directionX, directionY, size, color) {
				this.x = x;
				this.y = y;
				this.directionX = directionX;
				this.directionY = directionY;
				this.size = size;
				this.color = color;
				this.opacity = 0.1; // Start with low opacity
			}

			// Method to draw individual particles
			draw() {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
				ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
				ctx.fill();
			}

			// Update the particle position and opacity
			update() {
				// Reverse direction if the particle hits the edge of the screen
				if (this.x > canvas.width || this.x < 0) {
					this.directionX = -this.directionX;
				}
				if (this.y > canvas.height || this.y < 0) {
					this.directionY = -this.directionY;
				}

				// Move the particles faster
				this.x += this.directionX * 0.6;
				this.y += this.directionY * 0.6;

				// Check if mouse is near and adjust opacity
				let dx = mouse.x - this.x;
				let dy = mouse.y - this.y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < mouse.radius) {
					this.opacity = 1 - distance / mouse.radius; // Brighten as mouse gets closer
				} else {
					this.opacity = 0.1; // Stay dull if the mouse is far away
				}

				this.draw();
			}
		}

		// Initialize particles
		function init() {
			particlesArray = [];
			for (let i = 0; i < numberOfParticles; i++) {
				let size = Math.random() * 3 + 1;
				let x = Math.random() * canvas.width;
				let y = Math.random() * canvas.height;
				let directionX = Math.random() * 2 - 1;
				let directionY = Math.random() * 2 - 1;

				particlesArray.push(new Particle(x, y, directionX, directionY, size));
			}
		}

		// Animate particles
		function animate() {
			requestAnimationFrame(animate);
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			for (let i = 0; i < particlesArray.length; i++) {
				particlesArray[i].update();
			}
			connect();
		}

		// Connect particles with each other and the mouse
		function connect() {
			for (let a = 0; a < particlesArray.length; a++) {
				let particleA = particlesArray[a];

				// Connection with mouse
				let dxA = mouse.x - particleA.x;
				let dyA = mouse.y - particleA.y;
				let distanceA = Math.sqrt(dxA * dxA + dyA * dyA);
				if (distanceA < mouse.radius) {
					let opacityValue = 1 - distanceA / mouse.radius;
					ctx.strokeStyle = `rgba(0, 251, 255, ${opacityValue})`;
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(particleA.x, particleA.y);
					ctx.lineTo(mouse.x, mouse.y);
					ctx.stroke();
				}

				// Connection between particles
				for (let b = a + 1; b < particlesArray.length; b++) {
					let particleB = particlesArray[b];
					let dx = particleA.x - particleB.x;
					let dy = particleA.y - particleB.y;
					let distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < 150) {
						let opacityValue = 1 - distance / 150;
						let lineOpacity = Math.min(particleA.opacity, particleB.opacity); // Match the lowest opacity of the two particles

						// Make line opacity match the particle opacity
						ctx.strokeStyle = `rgba(255, 255, 255, ${
							lineOpacity * opacityValue
						})`;
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(particleA.x, particleA.y);
						ctx.lineTo(particleB.x, particleB.y);
						ctx.stroke();
					}
				}
			}
		}

		init();
		animate();

		window.addEventListener("resize", function () {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			mouse.radius = 300; // Keep larger mouse radius
			init();
		});

		window.addEventListener("mouseout", function () {
			mouse.x = undefined;
			mouse.y = undefined;
		});
	}, []);

	return (
		<HeroSection id="home">
			<CanvasBackground ref={canvasRef} />
			<HeroContent>
				<Name>Hello, I'm Jordan</Name>
				<Subtitle>
					I'm a{" "}
					<StyledTypewriter>
						<Typewriter
							words={["Developer", "Designer", "Problem Solver", "Engineer"]}
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
