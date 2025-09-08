"use client";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = styled.section`
  position: relative;
  padding: 5rem 0;
  background-color: transparent;
  color: white;
  overflow: hidden;
  content-visibility: auto;
  contain-intrinsic-size: 1000px;
  min-height: 100vh;
  display: flex;
  align-items: center;

  @media (max-width: 576px) {
    padding: 3rem 0 2rem;
    min-height: 80vh;
  }
`;

// background is provided globally in App.js

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 576px) {
    padding: 0 1rem;
    gap: 1.25rem;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  min-width: 300px;
  margin-right: 2rem;

  @media (max-width: 576px) {
    margin-right: 0;
  }
`;

const ContactForm = styled.form`
  flex: 1;
  min-width: 300px;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #fff;

  @media (max-width: 576px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const Subheading = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ddd;

  @media (max-width: 576px) {
    font-size: 1.125rem;
  }
`;

const Text = styled.p`
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 1rem;

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const SocialLinks = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;

  @media (max-width: 576px) {
    margin-top: 1rem;
  }
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

  @media (max-width: 576px) {
    padding: 0.65rem;
  }
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

  @media (max-width: 576px) {
    padding: 0.65rem;
    min-height: 120px;
  }
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

  @media (max-width: 576px) {
    padding: 0.65rem 1.25rem;
  }
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // eslint-disable-next-line
  const contactRef = useRef(null);
  // eslint-disable-next-line
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    // Background handled by LiquidEther now.
  }, []);

  return (
    <ContactSection id="contact" ref={sectionRef}>
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
            <a href="mailto:jordan.strande@jordanstrande.com">
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
