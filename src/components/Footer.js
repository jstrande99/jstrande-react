// src/components/Footer.js
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

const FooterSection = styled.footer`
	padding: 2rem;
	background-color: #333;
	text-align: center;
`;

const FooterText = styled.p`
	color: #fff;
	font-size: 1rem;
`;

function Footer() {
	const footerRef = useRef(null);

	useEffect(() => {
		gsap.from(footerRef.current, {
			opacity: 0,
			y: 20,
			duration: 1,
			scrollTrigger: {
				trigger: footerRef.current,
				start: "top bottom",
			},
		});
	}, []);

	return (
		<FooterSection ref={footerRef}>
			<FooterText>
				&copy; {new Date().getFullYear()} Your Name. All rights reserved.
			</FooterText>
		</FooterSection>
	);
}

export default Footer;
