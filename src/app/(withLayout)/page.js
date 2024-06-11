"use client";

import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";

register();

export default function Home() {
    const swiperElRef = useRef(null);
    const videoRef = useRef(null);
    const overlayRef = useRef(null);
    const contentsRef = useRef([]);
    const contents = [
        {
            heading: "Transforming Ideas into Digital Reality",
            buttonText: "Our Work",
        },
        {
            heading: "Innovative Solutions, Tailored for You",
            buttonText: "Our Services",
        },
        {
            heading: "Digital Solutions for Every Sector",
            buttonText: "Industries",
        },
    ];
    const INDIVIDUAL_VIDEO_LENGTH_IN_SECONDS = 5;

    useEffect(() => {
        // When user changes the slide
        swiperElRef.current.addEventListener("swiperslidechange", (event) => {
            const [swiper] = event.detail;

            // Disable release on edges feature to avoid undesired scrolling outside the slides section
            setTimeout(() => {
                swiper.params.mousewheel.releaseOnEdges = false;

                // Reset the video's current time to play the clip that matches with slide
                videoRef.current.currentTime =
                    swiper.activeIndex * INDIVIDUAL_VIDEO_LENGTH_IN_SECONDS;
                videoRef.current.play();

                // Hide the text contents
                contentsRef.current.map((contentRef, contentIndex) => {
                    Array.from(contentRef.children).forEach((child) => {
                        contentIndex === swiper.activeIndex &&
                            (child.style.opacity = "100%");
                        contentIndex === swiper.activeIndex &&
                            (child.style.transform = "translateY(0)");
                    });
                });
            }, 400);
        });

        // When user the slide transition starts
        swiperElRef.current.addEventListener(
            "swiperslidechangetransitionstart",
            () => {
                // Hide the text contents
                contentsRef.current.map((contentRef) => {
                    Array.from(contentRef.children).forEach((child) => {
                        child.style.opacity = "0";
                        child.style.transform = "translateY(40px)";
                    });
                });
            },
        );

        // When user reaches the last slide
        swiperElRef.current.addEventListener("swiperreachend", (event) => {
            const [swiper] = event.detail;

            // Enable release on edges feature to allow users to scroll beyond the slides section
            setTimeout(() => {
                swiper.params.mousewheel.releaseOnEdges = true;
            }, 500);
        });
    }, []);

    return (
        <main>
            {/* Slide container */}
            <swiper-container
                ref={swiperElRef}
                slides-per-view="1"
                grab-cursor="true"
                speed="700"
                effect="fade"
                pagination="true"
                pagination-clickable="true"
                direction="vertical"
                mousewheel="true"
                mousewheel-release-on-edges="true"
                touch-release-on-edges="true"
            >
                {/* Video as background */}
                <video
                    className="absolute inset-0 z-[-2] h-dvh w-full object-cover"
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                >
                    <source src="/videos/home-hero.mp4" type="video/mp4" />
                </video>
                {/* Black overlay in between video and content */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-[-1] h-dvh w-full bg-black/60 transition-[background-color] duration-[400ms] ease-out"
                />
                {/* For each content, create a slide */}
                {contents.map((content, index) => {
                    return (
                        // Slide
                        <swiper-slide key={index}>

                            {/* Content section */}
                            <div
                                ref={(element) => (contentsRef.current[index] = element)}
                                className="xl:max-w-[1200px] content-end px-5 pb-10 pt-20 text-white sm:px-8 lg:px-12 xl:mx-auto  xl:px-0 min-h-dvh"
                            >
                                {/* Heading */}
                                <h1
                                    className={`${index === 0 ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"} text-balance text-[1.8125rem]/[1.1] font-bold transition-[opacity,transform] duration-700 ease-in-out min-[500px]:max-w-[80%] min-[500px]:text-[2rem]/[1.1] sm:text-[2.5rem]/[1.1] md:text-5xl/[1.1] lg:max-w-[600px]`}
                                >
                                    {content.heading}
                                </h1>
                                {/* Call-to-action button */}
                                <button
                                    className={`${index === 0 ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"} mt-8 w-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[opacity,transform,background-position] delay-75 duration-700 ease-in-out hover:bg-[50%_100%] sm:mb-12`}
                                >
                                    {content.buttonText}
                                </button>
                            </div>
                        </swiper-slide>
                    );
                })}
            </swiper-container>
        </main>
    );
}