import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = styled.section`
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

const ContactContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	position: relative;
	z-index: 1;
`;

const ContactInfo = styled.div`
	flex: 1;
	min-width: 300px;
	margin-right: 2rem;
`;

const ContactForm = styled.form`
	flex: 1;
	min-width: 300px;
`;

const Heading = styled.h2`
	font-size: 2.5rem;
	font-weight: 700;
	margin-bottom: 2rem;
	color: #fff;
`;

const Subheading = styled.h3`
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 1rem;
	color: #ddd;
`;

const Text = styled.p`
	font-size: 1.1rem;
	color: #fff;
	margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
	margin-top: 2rem;
	display: flex;
	gap: 1rem;
`;

const SocialLink = styled.a`
	font-size: 1.5rem;
	color: #ffd791;
	transition: color 0.3s ease;

	&:hover {
		color: #0056b3;
	}
`;

const Input = styled.input`
	width: 100%;
	padding: 0.75rem;
	margin-bottom: 1rem;
	font-size: 1rem;
	background-color: transparent !important;
	border: 2px solid transparent !important;
	background-image: linear-gradient(black, black),
		linear-gradient(90deg, #ffd791, #694901) !important;
	background-origin: border-box !important;
	background-clip: padding-box, border-box !important;
	border-radius: 10px;
	color: #ffd791;
`;

const TextArea = styled.textarea`
	width: 100%;
	padding: 0.75rem;
	margin-bottom: 1rem;
	border-radius: 4px;
	font-size: 1rem;
	min-height: 150px;
	background-color: transparent !important;
	border: 2px solid transparent !important;
	background-image: linear-gradient(black, black),
		linear-gradient(90deg, #ffd791, #694901) !important;
	background-origin: border-box !important;
	background-clip: padding-box, border-box !important;
	border-radius: 10px;
	color: #ffd791;
`;

const SubmitButton = styled.button`
	background-color: transparent !important;
	border: 2px solid transparent !important;
	background-image: linear-gradient(black, black),
		linear-gradient(90deg, #ffd791, #694901) !important;
	background-origin: border-box !important;
	background-clip: padding-box, border-box !important;
	border-radius: 10px;
	padding: 0.75rem 1.5rem;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.3s ease;
	color: #ffd791;

	&:hover {
		background-image: linear-gradient(black, black),
			linear-gradient(90deg, #694901, #ffd791) !important;
		color: white;
	}
`;

function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const contactRef = useRef(null);
	const canvasRef = useRef(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		setFormData({ name: "", email: "", message: "" });
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		let particlesArray = [];
		const numberOfParticles = 120;

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
				this.opacity = 0.05;
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
						ctx.strokeStyle = `rgba(255, 255, 255, 0.05)`;
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
		<ContactSection id="contact" ref={contactRef}>
			<StarCanvas ref={canvasRef} />
			<ContactContainer>
				<ContactInfo>
					<Heading>Get in Touch</Heading>
					<Text>
						I'm always open to new opportunities and collaborations. Feel free
						to reach out!
					</Text>
					<Subheading>Contact Information</Subheading>
					<Text>
						Email:{" "}
						<a href="mailto:jordan.strande@example.com">
							StrandeJordan@gmail.com
						</a>
					</Text>
					<SocialLinks>
						<SocialLink
							href="https://github.com/jstrande99"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-github"></i>
						</SocialLink>
						<SocialLink
							href="https://www.linkedin.com/in/jordan-strande/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-linkedin"></i>
						</SocialLink>
						<SocialLink
							href="https://twitter.com/jordanstrande"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-twitter"></i>
						</SocialLink>
					</SocialLinks>
				</ContactInfo>
				<ContactForm onSubmit={handleSubmit}>
					<Subheading>Send Me a Message</Subheading>
					<Input
						type="text"
						name="name"
						placeholder="Your Name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
					<Input
						type="email"
						name="email"
						placeholder="Your Email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<TextArea
						name="message"
						placeholder="Your Message"
						value={formData.message}
						onChange={handleChange}
						required
					/>
					<SubmitButton type="submit">Send Message</SubmitButton>
				</ContactForm>
			</ContactContainer>
		</ContactSection>
	);
}

export default Contact;
