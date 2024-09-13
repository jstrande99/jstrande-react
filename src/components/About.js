// src/components/About.js
import React from "react";
import styled from "styled-components";

const AboutSection = styled.section`
	padding: 5rem 0;
	background-color: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
	display: flex;
	align-items: center;

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		flex-direction: row;
		align-items: flex-start;
	}
`;

const ImageContainer = styled.div`
	flex: 1;

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		margin-bottom: 0;
		margin-right: 2rem;
		height: 100vh;
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

const SectionTitle = styled.h2`
	font-size: 2.5rem;
	margin-bottom: 1.5rem;
	color: ${({ theme }) => theme.colors.primary};
`;

const Bio = styled.p`
	font-size: 1.1rem;
	line-height: 1.8;
	margin-bottom: 1.5rem;
	color: ${({ theme }) => theme.colors.text};
`;

const HighlightsList = styled.ul`
	list-style-type: none;
	padding: 0;
`;

const HighlightItem = styled.li`
	font-size: 1.1rem;
	margin-bottom: 0.5rem;
	color: ${({ theme }) => theme.colors.text};

	&:before {
		content: "•";
		color: ${({ theme }) => theme.colors.primary};
		font-weight: bold;
		display: inline-block;
		width: 1em;
		margin-left: -1em;
	}
`;

function About() {
	return (
		<AboutSection id="about">
			<Container>
				<ImageContainer>
					<ProfileImage src="/Images/Realheadshot.png" alt="Your Name" />
				</ImageContainer>
				<ContentContainer>
					<SectionTitle>About Me</SectionTitle>
					<Bio>
						As a graduate from Colorado State University with a Bachelor's
						degree in Applied Computer Science, I bring a robust foundation in
						Software Development to the table. My academic journey has equipped
						me with a diverse skill set and a deep understanding of computer
						science principles, positioning me as a well-prepared and
						enthusiastic entrant to the software development industry.
					</Bio>
					<Bio>
						My expertise spans a wide range of programming paradigms, from
						low-level languages to high-level application development. This
						versatility, combined with my strong problem-solving abilities and
						collaborative mindset, enables me to approach complex challenges
						with confidence and creativity.
					</Bio>
					<HighlightsList>
						<HighlightItem>
							Proficient in C, Assembly, Java, Javascript, React, C++, and
							Python
						</HighlightItem>
						<HighlightItem>25+ successfully launched sites/apps.</HighlightItem>
						<HighlightItem>
							Strong grasp of advanced algorithms and data structures
						</HighlightItem>
						<HighlightItem>
							Experienced in software design and architecture principles
						</HighlightItem>
						<HighlightItem>
							Skilled in problem-solving and analytical thinking
						</HighlightItem>
						<HighlightItem>
							Excellent communication and teamwork abilities
						</HighlightItem>
						<HighlightItem>
							Adept at time management and meeting project deadlines
						</HighlightItem>
					</HighlightsList>
				</ContentContainer>
			</Container>
		</AboutSection>
	);
}

export default About;
