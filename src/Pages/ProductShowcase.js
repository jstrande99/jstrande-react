import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Style/ProductShowcase.css";

const ProductShowcase = () => {
    const el = document.documentElement;
    const canvasRef = useRef();
    const contextRef = useRef();
    const frameCount = 148;
    const scrollMultiplier = 2;
    const [textVisible, setTextVisible] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(1);

    // const currentFrame = (index) =>
    //     `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
    //         .toString()
    //         .padStart(4, "0")}.jpg`;
    const currentFrame = useCallback(
        (index) =>
            `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
                .toString()
                .padStart(4, "0")}.jpg`,
        []
    );

    // const preloadImages = () => {
    //     Array.from({ length: frameCount - 1 }).forEach(
    //         (_, i) => (new Image().src = currentFrame(i + 1))
    //     );
    // };
    const preloadImages = useCallback(() => {
        Array.from({ length: frameCount - 1 }).forEach(
            (_, i) => (new Image().src = currentFrame(i + 1))
        );
    }, [currentFrame, frameCount]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;

        const img = new Image();
        img.onload = () => {
            canvas.width = 579; // Adjusted width (half of 1158)
            canvas.height = 385; // Adjusted height (half of 770)
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = currentFrame(currentImgIndex);

        const updateImage = (index) => {
            img.src = currentFrame(index);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        const firstSection = document.querySelector(".firstSection");
        const textSection = document.querySelector(".textSection");
        const imageSection = document.querySelector(".canvasSection");
        const descriptionSection = document.querySelector(".Description");

        const handleScroll = () => {
            const scrollTop = el.scrollTop;
            const maxScrollTop = el.scrollHeight - window.innerHeight;
            let frameIndex = 0;
            const viewportWidth = window.innerWidth;

            if (scrollTop <= 500) {
                firstSection.style.display = "flex";
                firstSection.style.fontSize = `${scrollTop * 4 + 50}px`;
                if (viewportWidth < 800) {
                    firstSection.style.fontSize = `${
                        scrollTop * 4 + 50 * 0.8
                    }px`;
                    descriptionSection.style.whiteSpace = "wrap";
                }
                firstSection.style.position = "fixed";
                textSection.style.position = "static";
                imageSection.style.position = "static";
                textSection.style.display = "none";
                imageSection.style.display = "none";
                firstSection.style.whiteSpace = "nowrap";
                setTextVisible(false);
            } else {
                frameIndex = Math.max(
                    0,
                    Math.floor(
                        ((scrollTop - 500) / maxScrollTop) *
                            frameCount *
                            scrollMultiplier
                    )
                );
                firstSection.style.display = "none";
                textSection.style.position = "static";
                imageSection.style.position = "fixed";
                textSection.style.display = "none";
                imageSection.style.display = "block";
                setTextVisible(false);
            }

            if (scrollTop >= 1650) {
                firstSection.style.display = "none";
                textSection.style.position = "fixed";
                textSection.style.display = "block";
                imageSection.style.position = "static";
                imageSection.style.display = "none";
                textSection.style.display = "flex";
                textSection.style.whiteSpace = "nowrap";
                setTextVisible(true);
            }

            setCurrentImgIndex(frameIndex + 1);
            requestAnimationFrame(() => updateImage(frameIndex + 1));
        };

        window.addEventListener("scroll", handleScroll);
        preloadImages();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [
        textVisible,
        el.scrollHeight,
        el.scrollTop,
        preloadImages,
        currentFrame,
        currentImgIndex,
    ]);

    return (
        <div className="showcaseContainer">
            <section
                className="firstSection"
                style={{ display: textVisible ? "none" : "flex" }}
            >
                <div className={`firstTextContainer`}>
                    <h1>Airpods</h1>
                    <p className="Description">
                        Products seen here are strictly for the website effects
                        and are not for sale.{" "}
                    </p>
                </div>
            </section>
            <section className="canvasSection" style={{ display: "none" }}>
                <canvas ref={canvasRef} id="hero-lightpass" />
            </section>
            <section
                className="textSection"
                style={{ display: textVisible ? "block" : "none" }}
            >
                <div className="firstTextContainer">
                    <h1 className="FindYourSound">Find Your Sound</h1>
                    <a
                        href="https://www.apple.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p>Shop Here</p>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ProductShowcase;
