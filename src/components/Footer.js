// src/components/Footer.js
import React, { useRef } from "react";
import styled from "styled-components";

const FooterSection = styled.footer`
	padding: 2rem;
	background-color: #f8f9fa;
	text-align: center;
`;

const FooterText = styled.p`
	color: #694901;
	font-size: 1rem;
`;

function Footer() {
	const footerRef = useRef(null);

	return (
		<FooterSection ref={footerRef}>
			<FooterText>
				&copy; {new Date().getFullYear()} All rights reserved.
			</FooterText>
		</FooterSection>
	);
}

export default Footer;
