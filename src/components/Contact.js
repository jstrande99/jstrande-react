// src/components/Contact.js
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = styled.section`
	padding: 5rem 0;
	background-color: #f8f9fa;
`;

const ContactContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
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
	color: #333;
`;

const Subheading = styled.h3`
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 1rem;
	color: #444;
`;

const Text = styled.p`
	font-size: 1.1rem;
	color: #333;
	margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
	margin-top: 2rem;
	display: flex;
	gap: 1rem;
`;

const SocialLink = styled.a`
	font-size: 1.5rem;
	color: #007bff;
	transition: color 0.3s ease;

	&:hover {
		color: #0056b3;
	}
`;

const Input = styled.input`
	width: 100%;
	padding: 0.75rem;
	margin-bottom: 1rem;
	border: 1px solid #ced4da;
	border-radius: 4px;
	font-size: 1rem;
	color: #333;
`;

const TextArea = styled.textarea`
	width: 100%;
	padding: 0.75rem;
	margin-bottom: 1rem;
	border: 1px solid #ced4da;
	border-radius: 4px;
	font-size: 1rem;
	min-height: 150px;
	color: #333;
`;

const SubmitButton = styled.button`
	background-color: #007bff;
	color: white;
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 4px;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #0056b3;
	}
`;

function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const contactRef = useRef(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here (e.g., send data to a server)
		console.log("Form submitted:", formData);
		// Reset form after submission
		setFormData({ name: "", email: "", message: "" });
	};

	return (
		<ContactSection id="contact" ref={contactRef}>
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
