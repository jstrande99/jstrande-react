import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const AboutSection = styled.section`
	position: relative;
	padding: 5rem 0;
	background-color: black;
	color: white;
	overflow: hidden;
`;

const StarCanvas = styled.canvas`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
`;

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
	background-color: transparent;
	border: 2px solid transparent;
	background-image: linear-gradient(black, black),
		linear-gradient(90deg, #ffd791, #694901);
	background-origin: border-box;
	background-clip: padding-box, border-box;
	border-radius: 10px;
	cursor: pointer;
	padding: 1rem;
	transition: all 0.4s ease;
	position: relative;
	overflow: hidden;

	&:hover img {
		transform: translateX(-10px); /* Slide image to the left */
	}

	&:hover span {
		display: block;
		opacity: 1;
		transform: translateX(10px); /* Slide text in */
	}

	img {
		max-width: 60px;
		transition: transform 0.4s ease; /* Smooth image sliding */
	}

	span {
		margin-left: 10px;
		font-size: 1.2rem;
		font-weight: bold;
		display: none;
		color: #fff;
		opacity: 0;
		transition: opacity 0.4s ease, transform 0.4s ease;
		transform: translateX(-40px); /* Initially hidden */
	}
`;

function About() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		let particlesArray = [];
		const numberOfParticles = 180;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		class Particle {
			constructor(x, y, directionX, directionY, size, color) {
				this.x = x;
				this.y = y;
				this.directionX = directionX;
				this.directionY = directionY;
				this.size = size;
				this.color = color;
				this.opacity = 0.05; // Set constant opacity to 0.4
			}

			draw() {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
				ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
				ctx.fill();
			}

			update() {
				if (this.x > canvas.width || this.x < 0) {
					this.directionX = -this.directionX;
				}
				if (this.y > canvas.height || this.y < 0) {
					this.directionY = -this.directionY;
				}

				this.x += this.directionX * 0.6;
				this.y += this.directionY * 0.6;

				this.draw();
			}
		}

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

		function animate() {
			requestAnimationFrame(animate);
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			for (let i = 0; i < particlesArray.length; i++) {
				particlesArray[i].update();
			}
			connect();
		}

		function connect() {
			for (let a = 0; a < particlesArray.length; a++) {
				for (let b = a + 1; b < particlesArray.length; b++) {
					let distance =
						(particlesArray[a].x - particlesArray[b].x) *
							(particlesArray[a].x - particlesArray[b].x) +
						(particlesArray[a].y - particlesArray[b].y) *
							(particlesArray[a].y - particlesArray[b].y);

					if (distance < (canvas.width / 7) * (canvas.height / 7)) {
						ctx.strokeStyle = `rgba(255, 255, 255, 0.05)`; // Set constant opacity for lines
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
						ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
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
			init();
		});

		return () => {
			window.removeEventListener("resize", init);
		};
	}, []);

	return (
		<AboutSection id="about">
			<StarCanvas ref={canvasRef} />
			<Container>
				<ImageContainer>
					<ProfileImage src="/Images/headshot.png" alt="Your Name" />
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
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg"
						alt="JavaScript"
					/>
					<span>JavaScript</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
						alt="React"
					/>
					<span>React</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
						alt="CSS3"
					/>
					<span>CSS3</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg"
						alt="Java"
					/>
					<span>Java</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg"
						alt="NodeJS"
					/>
					<span>NodeJS</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg"
						alt="Git"
						style={{
							filter: "invert(100%) brightness(100%) saturate(100%)",
						}}
					/>
					<span>Git</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
						alt="GitHub"
						style={{
							filter: "invert(100%) brightness(100%) saturate(100%)",
						}}
					/>
					<span>GitHub</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg"
						alt="npm"
					/>
					<span>NPM</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-line.svg"
						alt="NextJS"
						style={{
							filter: "invert(100%) brightness(100%) saturate(100%)",
						}}
					/>
					<span>NextJS</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
						alt="C"
					/>
					<span>C</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
						alt="C++"
					/>
					<span>C++</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
						alt="Python"
					/>
					<span>Python</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
						alt="SQL"
					/>
					<span>SQL</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original-wordmark.svg"
						alt="Firebase"
					/>
					<span>Firebase</span>
				</Badge>
				<Badge>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg"
						alt="HTML5"
					/>
					<span>HTML5</span>
				</Badge>
			</BadgeGrid>
		</AboutSection>
	);
}

export default About;
