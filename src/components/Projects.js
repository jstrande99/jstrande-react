// src/components/Projects.js
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ProjectsSection = styled.section`
	padding: 5rem 0;
	background-color: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
`;

const SectionTitle = styled.h2`
	font-size: 2.5rem;
	text-align: center;
	margin-bottom: 3rem;
	color: ${({ theme }) => theme.colors.primary};
`;

const ProjectGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 2rem;
`;

const ProjectCard = styled(motion.div)`
	background-color: transparent;
	width: 100%;
	height: 400px;
	perspective: 1000px;
`;

const CardInner = styled(motion.div)`
	position: relative;
	width: 100%;
	height: 100%;
	text-align: center;
	transition: transform 0.6s;
	transform-style: preserve-3d;
`;

const CardFace = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	overflow: hidden;
`;

const CardFront = styled(CardFace)`
	background-color: ${({ theme }) => theme.colors.white};
`;

const CardBack = styled(CardFace)`
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	transform: rotateY(180deg);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem;
`;

const ProjectIframeContainer = styled.div`
	width: 100%;
	height: 200px;
	overflow: hidden;
	position: relative;
`;

const ProjectIframe = styled.iframe`
	width: 1280px; // Standard desktop width
	height: 800px; // Approximate height for 16:10 aspect ratio
	border: none;
	pointer-events: none;
	transform: scale(0.3);
	transform-origin: 0 0;
	position: absolute;
	top: 0;
	left: 0;
`;

const ProjectContent = styled.div`
	padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
	font-size: 1.5rem;
	margin-bottom: 0.5rem;
	color: ${({ theme }) => theme.colors.text};
`;

const ProjectTitleBack = styled.h3`
	font-size: 1.5rem;
	margin-bottom: 0.5rem;
	color: ${({ theme }) => theme.colors.white};
`;

const ProjectDescription = styled.p`
	font-size: 1rem;
	color: ${({ theme }) => theme.colors.lightText};
	margin-bottom: 1rem;
`;

const TagContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: 1rem;
`;

const Tag = styled.span`
	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.white};
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	font-size: 0.875rem;
	margin-right: 0.5rem;
	margin-bottom: 0.5rem;
`;

const ProjectLink = styled.a`
	display: inline-block;
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.primary};
	padding: 0.75rem 1.5rem;
	border-radius: 4px;
	font-size: 1rem;
	text-decoration: none;
	transition: background-color 0.3s ease;
	margin-top: 1rem;

	&:hover {
		background-color: black;
		border: 1px solid ${({ theme }) => theme.colors.white};
		color: ${({ theme }) => theme.colors.white};
	}
`;

const projects = [
	{
		id: 0,
		title: "SpinFlow AI",
		description: "AI powered assistant for small and large companies.",
		link: "https://app.spinflow.ai",
		tags: [
			"React",
			"Firebase",
			"Python",
			"Node.js",
			"Render Severs",
			"Firebase Cloud Functions",
			"REST-API",
			"Built Solo",
		],
	},
	{
		id: 1,
		title: "TJ's Sportsbar & Grill",
		description:
			"A full-stack restaurant website for hosting social events and services.",
		link: "https://tjssportsbarlakewood.com/",
		tags: ["React", "Node.js", "Firebase"],
	},
	{
		id: 2,
		title: "3D E-commerce Platform",
		description:
			"Strande Designs. A showcase of 3D elements, in both a website and E-commerce site.",
		link: "https://strandedesigns.netlify.app",
		tags: ["React", "THREE.js", "CSS", "Blender", "Firebase"],
	},
	{
		id: 3,
		title: "Coaching Pro App",
		description: "Sports team tracking system.",
		link: "https://coachingpro.netlify.app/",
		tags: ["React", "Firebase", "AWS"],
	},
	{
		id: 4,
		title: "Tail Trails App",
		description: "Pet health and location tracking system via QR codes.",
		link: "https://tailtrails.netlify.app/",
		tags: ["React", "Firebase", "Firebase Cloud Functions"],
	},
	{
		id: 5,
		title: "Intelli AI Software Engineer",
		description:
			"One stop shop for developing any React JS site or element. With built in compiler.",
		link: "https://dreamy-platypus-ai.netlify.app/",
		tags: ["React", "Firebase", "REST-API", "Render Servers"],
	},
	{
		id: 6,
		title: "Sibling Kinect",
		description:
			"Site to assist children in need find help for them and their family.",
		link: "https://sibling-kinect.netlify.app",
		tags: ["React", "Firebase"],
	},
];

function Projects() {
	const [hoveredCard, setHoveredCard] = useState(null);

	return (
		<ProjectsSection id="projects">
			<Container>
				<SectionTitle>My Projects</SectionTitle>
				<ProjectGrid>
					{projects.map((project) => (
						<ProjectCard
							key={project.id}
							onMouseEnter={() => setHoveredCard(project.id)}
							onMouseLeave={() => setHoveredCard(null)}
						>
							<CardInner
								animate={{ rotateY: hoveredCard === project.id ? 180 : 0 }}
								transition={{ duration: 0.6 }}
							>
								<CardFront>
									<ProjectIframeContainer>
										<ProjectIframe src={project.link} title={project.title} />
									</ProjectIframeContainer>
									<ProjectContent>
										<ProjectTitle>{project.title}</ProjectTitle>
										<ProjectDescription>
											{project.description}
										</ProjectDescription>
									</ProjectContent>
								</CardFront>
								<CardBack>
									<ProjectTitleBack>{project.title}</ProjectTitleBack>
									<TagContainer>
										{project.tags.map((tag, index) => (
											<Tag key={index}>{tag}</Tag>
										))}
									</TagContainer>
									<ProjectLink
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
									>
										View Project
									</ProjectLink>
								</CardBack>
							</CardInner>
						</ProjectCard>
					))}
				</ProjectGrid>
			</Container>
		</ProjectsSection>
	);
}

export default Projects;
