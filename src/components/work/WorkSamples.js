import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function WorkSamples({
  gsap,
  useGSAP,
  Draggable,
  Flip,
  selectedOption,
  setSelectedOption,
  cardMesurements,
}) {
  const {
    SMALL_CARD_WIDTH,
    SMALL_CARD_OFFSET,
    LARGE_CARD_WIDTH,
    LARGE_CARD_OFFSET,
  } = cardMesurements;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWorkIndex, setSelectedWorkIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const works = [
    {
      imgSrc: "/work/cards/beast.jpg",
      title: "Beast Mode Activation: Igniting Digital Power Beyond Limits",
      categories: ["Digital Marketing", "E-Commerce", "Data Strategy"],
      details: `
        <h3>We help you make <span class="gradient">strategic digital choices</span> that unlock long-term value and business success. Our team stays focused on your needs.</h3>
        <h3>Using proven methods like <span class="gradient">BHAG and OGSM</span>, we deliver measurable outcomes that drive growth. Goals guide our every move.</h3>
        <h3>With our <span class="gradient">RESI approach</span>, we align teams and guide your organization toward sustainable results. Success requires strong collaboration.</h3>
        <h3>We help you make <span class="gradient">strategic digital choices</span> that unlock long-term value and business success. Our team stays focused on your needs.</h3>
        <h3>Using proven methods like <span class="gradient">BHAG and OGSM</span>, we deliver measurable outcomes that drive growth. Goals guide our every move.</h3>
        <h3>With our <span class="gradient">RESI approach</span>, we align teams and guide your organization toward sustainable results. Success requires strong collaboration.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/crow.webp",
      title: "Crow Funding Revolution: Redefining Growth & Community Impact",
      categories: ["E-Commerce", "Data Strategy", "Digital Marketing"],
      details: `
        <h3>We help you make <span class="gradient">strategic digital choices</span> that empower communities and unlock exponential business growth.</h3>
        <h3>Our methods <span class="gradient">fuse data-driven insights</span> with people-centric strategies to deliver results that matter.</h3>
        <h3>Through <span class="gradient">BHAG and OGSM frameworks</span>, every funding strategy aligns with tangible outcomes and scalable success.</h3>
        <h3>We create ecosystems that <span class="gradient">combine creativity with analytics</span>, reshaping how crowdfunding drives innovation.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/snatch.jpg",
      title: "Snatch App Development: Capturing Innovation in Every Swipe",
      categories: ["Digital Transformation", "E-Commerce"],
      details: `
        <h3>With <span class="gradient">Snatch</span>, we engineered seamless app experiences designed for speed, usability, and growth.</h3>
        <h3>We applied <span class="gradient">RESI principles</span> to align teams across design, development, and deployment.</h3>
        <h3>Using <span class="gradient">goal-driven methods</span>, we delivered measurable improvements in retention, engagement, and performance.</h3>
        <h3>Snatch represents <span class="gradient">the next frontier of digital transformation</span>, where mobile innovation meets customer delight.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/eighteen.jpg",
      title: "Eighteen Magazine Launch: A Bold Leap into Digital Storytelling",
      categories: ["Digital Marketing", "Data Strategy"],
      details: `
        <h3>We helped <span class="gradient">Eighteen Magazine</span> disrupt the publishing space with a launch strategy rooted in innovation.</h3>
        <h3>By leveraging <span class="gradient">OGSM frameworks</span>, we built campaigns that drive readership and retention.</h3>
        <h3>Our <span class="gradient">data-driven storytelling</span> amplified reach and impact across multiple platforms.</h3>
        <h3>This launch was not just about a magazine—it was <span class="gradient">the start of a content movement</span>.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/milton-glaser.jpg",
      title:
        "Milton Glaser Tribute Campaign: Where Creativity Meets Digital Brilliance",
      categories: ["Digital Marketing", "Customer Experience"],
      details: `
        <h3>We honored <span class="gradient">Milton Glaser’s legacy</span> through a campaign blending creativity and strategy.</h3>
        <h3>Our team used <span class="gradient">BHAG & OGSM</span> methods to ensure the tribute left a lasting global impact.</h3>
        <h3>We crafted <span class="gradient">story-driven digital campaigns</span> that celebrated his influence on art, design, and culture.</h3>
        <h3>This project became a <span class="gradient">case study in meaningful marketing</span>—driving both engagement and inspiration.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/noir.jpg",
      title: "Noir Analytics Platform: Illuminating Data in the Dark",
      categories: ["Data Strategy", "Digital Transformation", "E-Commerce"],
      details: `
        <h3><span class="gradient">Noir</span> transformed raw data into actionable strategies with cutting-edge analytics.</h3>
        <h3>We applied <span class="gradient">RESI collaboration methods</span> to align teams and drive clarity in decision-making.</h3>
        <h3>Our <span class="gradient">goal-oriented approach</span> helped businesses unlock insights hidden in the data shadows.</h3>
        <h3>Noir is where <span class="gradient">data meets creativity</span>, enabling smart, sustainable growth.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/edm.jpg",
      title:
        "Bangladesh’s First Fashion E-Commerce Revolution: Setting New Trends",
      categories: [
        "E-Commerce",
        "Digital Transformation",
        "Customer Experience",
      ],
      details: `
        <h3>We pioneered <span class="gradient">Bangladesh’s first fashion e-commerce movement</span>, changing how people shop.</h3>
        <h3>By using <span class="gradient">BHAG and OGSM methods</span>, we aligned strategies with business objectives for exponential growth.</h3>
        <h3>Our <span class="gradient">customer-first approach</span> reshaped user experience, setting new industry benchmarks.</h3>
        <h3>This project proved how <span class="gradient">digital disruption</span> can redefine an entire market.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/wet.webp",
      title: "Wet App: Forecasting Tomorrow with Smart Digital Solutions",
      categories: [
        "Digital Transformation",
        "Data Strategy",
        "E-Commerce",
        "Innovation",
      ],
      details: `
        <h3>The <span class="gradient">Wet App</span> pushed weather forecasting into the digital future.</h3>
        <h3>We integrated <span class="gradient">data-driven insights</span> with user-centric design for maximum adoption.</h3>
        <h3>Our <span class="gradient">goal-focused execution</span> delivered accurate forecasts and sustainable user engagement.</h3>
        <h3>This app embodies <span class="gradient">innovation meeting necessity</span>, where data guides everyday life.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/faces.jpg",
      title: "Faces of the World Exhibition: Showcasing Stories Beyond Borders",
      categories: ["Digital Marketing", "Innovation"],
      details: `
        <h3><span class="gradient">Faces of the World</span> was more than an exhibition—it was a global conversation.</h3>
        <h3>We applied <span class="gradient">strategic frameworks</span> to amplify cultural stories and connect diverse audiences.</h3>
        <h3>Our <span class="gradient">RESI collaboration</span> brought together teams across continents.</h3>
        <h3>The exhibition created <span class="gradient">lasting digital and cultural impact</span>, building bridges across borders.</h3>
      `,
    },
  ];

  const filteredWorks =
    selectedCategory === "All" || selectedCategory === null
      ? works
      : works.filter((work) => work.categories.includes(selectedCategory));

  const categories = [
    "All",
    ...new Set(works.flatMap((work) => work.categories)),
  ];

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: "(max-width: 639px)",
          isSmallTablet: "(min-width: 640px) and (max-width: 767px)",
          isMediumTablet: "(min-width: 768px) and (max-width: 1023px)",
          isLargeTablet: "(min-width: 1024px) and (max-width: 1279px)",
          isDesktop: "(min-width: 1280px)",
        },
        (ctx) => {
          const { isMobile, isDesktop } = ctx.conditions;
          const cardWidth = isMobile ? SMALL_CARD_WIDTH : LARGE_CARD_WIDTH;
          const cardOffset = isMobile ? SMALL_CARD_OFFSET : LARGE_CARD_OFFSET;

          if (selectedOption === "samples" && selectedWorkIndex === null) {
            const tl = gsap.timeline({
              delay: 1,
              scrollTrigger: {
                trigger: "#work-samples",
                start: `top center`,
                end: `bottom top`,
                once: true,
              },
              defaults: { duration: 0.5, ease: "power1.inOut" },
            });

            tl.set("#samples-inside-wrapper", { autoAlpha: 1 })
              .set(
                "#samples-categories button, #samples-categories h5, #work-samples .samples-container .sample-card, #samples-left-nav-btn, #samples-right-nav-btn",
                { y: 0 },
              )
              .set("#work-samples .samples-container .sample-card", {
                zIndex: 0,
                rotation: 0,
                marginLeft: -cardWidth,
              })
              .set("#work-samples .samples-container .sample-card img", {
                scale: 1,
                autoAlpha: 1,
              })
              .set("#work-hero", { display: "none" })
              .set("#work-details-inside-wrapper section:first-child", {
                autoAlpha: 0,
              })
              .set("#work-details", { display: "none" })
              .set("#work-samples #hero-cards-container", { display: "none" })
              .fromTo(
                "#work-samples h2",
                {
                  autoAlpha: 0,
                  y: 35,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                },
              )
              .fromTo(
                "#samples-categories button, #samples-categories h5",
                {
                  autoAlpha: 0,
                  x: -25,
                  stagger: { amount: 0.5 },
                },
                {
                  autoAlpha: 1,
                  x: 0,
                  stagger: { amount: 0.5 },
                },
                "<",
              )
              .to(
                "#work-samples .samples-container",
                {
                  autoAlpha: 1,
                },
                "<",
              )
              .fromTo(
                "#work-samples .samples-container .sample-card",
                {
                  zIndex: 0,
                  rotation: 0,
                  marginLeft: -cardWidth,
                  stagger: { amount: 0.5 },
                },
                {
                  zIndex: 0,
                  rotation: -24,
                  marginLeft: (i) => (i === 0 ? 0 : -(cardOffset / 3)),
                  stagger: { amount: 0.5 },
                },
                "<",
              )
              .fromTo(
                "#samples-left-nav-btn",
                {
                  autoAlpha: 0,
                  x: "-125%",
                },
                {
                  autoAlpha: 1,
                  x: "-50%",
                },
                "<0.25",
              )
              .fromTo(
                "#samples-right-nav-btn",
                {
                  autoAlpha: 0,
                  x: "125%",
                },
                {
                  autoAlpha: 1,
                  x: "50%",
                },
                "<0.25",
              )
              .fromTo(
                "#samples-cta p, #samples-cta a",
                {
                  autoAlpha: 0,
                  y: 35,
                  stagger: { amount: 0.5 },
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  stagger: { amount: 0.5 },
                },
                "<0.25",
              );

            // Drag/swipe support on smaller screens only
            if (!isDesktop) {
              const containerEl = document.querySelector(
                "#work-samples .samples-container",
              );
              const cardCount = filteredWorks.length;
              const padding = cardOffset + 40;
              const totalWidth =
                cardWidth +
                (cardCount - 1) * (cardWidth - cardOffset) +
                padding * 2;

              requestAnimationFrame(() => {
                const visibleWidth = containerEl.offsetWidth;
                const maxDrag = Math.max(totalWidth - visibleWidth, 0);

                gsap.set(containerEl, {
                  paddingLeft: padding,
                  paddingRight: padding,
                });

                Draggable.create(containerEl, {
                  type: "x",
                  inertia: true,
                  edgeResistance: 0.5,
                  dragResistance: 0.15,
                  bounds: { minX: -maxDrag, maxX: 0 },
                  cursor: "grab",
                  activeCursor: "grabbing",
                  throwProps: true,
                });
              });
            }
          }

          if (selectedOption === "samples" && selectedWorkIndex !== null) {
            const tl = gsap.timeline({
              defaults: { duration: 0.5, ease: "power1.inOut" },
            });

            const handleSectionTransition = () => {
              if (typeof document !== "undefined") {
                gsap.set(
                  "#work-details-inside-wrapper h1, #work-details-inside-wrapper p, #work-details-inside-wrapper a, #work-details-inside-wrapper button, #works-details-quotes h3",
                  {
                    y: 0,
                    autoAlpha: 0,
                  },
                );

                const selectedSampleCards = [
                  ...document.querySelectorAll(
                    "#work-samples .samples-container .sample-card",
                  ),
                ][selectedWorkIndex];
                const selectedSampleCardImg =
                  selectedSampleCards.querySelector("img");
                const state = Flip.getState(selectedSampleCardImg);
                const detailsCoverContainer =
                  document.getElementById("work-details-cover");
                detailsCoverContainer.appendChild(selectedSampleCardImg);

                const appendedEl = document.querySelector(
                  "#work-details #work-details-cover > img",
                );
                appendedEl.style.position = isDesktop ? "absolute" : "relative";
                appendedEl.style.height = isDesktop
                  ? "100%"
                  : isMobile
                    ? "40lvh"
                    : "50lvh";
                appendedEl.style.width = "100%";
                appendedEl.style.transitionDelay = "0ms";

                setSelectedOption({
                  label: "details",
                  work: filteredWorks[selectedWorkIndex],
                });
                setSelectedWorkIndex(null);
                Flip.from(state, {
                  delay: 0.25,
                  duration: 0.5,
                  ease: "power1.inOut",
                });
              }
            };

            tl.set("#work-samples .samples-container .sample-card", {
              zIndex: (i) => (i === selectedWorkIndex ? 1 : 0),
            })
              .set("#work-details", { display: "flex" })
              .to(
                "#samples-left-nav-btn, #samples-right-nav-btn, #samples-inside-wrapper > h2, #samples-categories button, #samples-categories h5, #samples-cta > p, #samples-cta > a",
                {
                  y: -50,
                  autoAlpha: 0,
                  stagger: {
                    amount: 0.5,
                  },
                  duration: 0.5,
                  ease: "power1.inOut",
                },
              )
              .to(
                "#work-samples .samples-container .sample-card",
                {
                  autoAlpha: (i) => (i === selectedWorkIndex ? 1 : 0),
                  duration: 0.5,
                  ease: "power1.out",
                  onComplete: () => handleSectionTransition(),
                },
                "<",
              );
          }
        },
      );
    },
    { dependencies: [gsap, selectedOption, selectedWorkIndex] },
  );

  useGSAP(
    () => {
      if (selectedOption === "samples" && selectedWorkIndex === null) {
        const mm = gsap.matchMedia();
        mm.add(
          {
            isMobile: "(max-width: 639px)",
            isSmallTablet: "(min-width: 640px) and (max-width: 767px)",
            isMediumTablet: "(min-width: 768px) and (max-width: 1023px)",
            isLargeTablet: "(min-width: 1024px) and (max-width: 1279px)",
            isDesktop: "(min-width: 1280px)",
          },
          (ctx) => {
            const { isMobile, isDesktop } = ctx.conditions;
            const cardWidth = isMobile ? SMALL_CARD_WIDTH : LARGE_CARD_WIDTH;
            const cardOffset = isMobile ? SMALL_CARD_OFFSET : LARGE_CARD_OFFSET;
            const tl = gsap.timeline({
              defaults: { stagger: 0.1, duration: 0.5, ease: "power1.inOut" },
            });

            if (isDesktop) {
              tl.to("#work-samples .samples-container .sample-card", {
                autoAlpha: (i) => (i >= currentIndex ? 1 : 0),
              }).to(
                "#work-samples .samples-container .inner-wrapper",
                {
                  x: -(currentIndex * (cardWidth - cardOffset / 3)),
                },
                "<",
              );
            }
          },
        );
      }
    },
    { dependencies: [currentIndex, gsap, selectedOption, selectedWorkIndex] },
  );

  useGSAP(
    () => {
      if (
        selectedOption === "samples" &&
        selectedWorkIndex === null &&
        selectedCategory !== null
      ) {
        const mm = gsap.matchMedia();
        mm.add(
          {
            isMobile: "(max-width: 639px)",
            isSmallTablet: "(min-width: 640px) and (max-width: 767px)",
            isMediumTablet: "(min-width: 768px) and (max-width: 1023px)",
            isLargeTablet: "(min-width: 1024px) and (max-width: 1279px)",
            isDesktop: "(min-width: 1280px)",
          },
          (ctx) => {
            const { isMobile } = ctx.conditions;
            const cardWidth = isMobile ? SMALL_CARD_WIDTH : LARGE_CARD_WIDTH;
            const cardOffset = isMobile ? SMALL_CARD_OFFSET : LARGE_CARD_OFFSET;

            gsap.fromTo(
              "#work-samples .samples-container .sample-card",
              {
                autoAlpha: 0,
                rotation: 0,
                marginLeft: -cardWidth,
                stagger: 0.1,
                duration: 0.5,
                ease: "power1.inOut",
              },
              {
                autoAlpha: 1,
                rotation: -24,
                marginLeft: (i) => (i === 0 ? 0 : -(cardOffset / 3)),
                stagger: 0.1,
                duration: 0.5,
                ease: "power1.inOut",
              },
            );
          },
        );
      }
    },
    {
      dependencies: [gsap, selectedCategory, selectedOption, selectedWorkIndex],
    },
  );

  return (
    <div className="absolute left-0 top-0 w-full overflow-hidden">
      <div
        id="work-samples"
        className="flex min-h-dvh items-center justify-center px-5 pt-[92px] text-white sm:px-8 lg:px-12 xl:mx-auto xl:max-w-[1200px] xl:px-0"
      >
        <div id="samples-outside-wrapper" className="relative w-full">
          <div id="samples-inside-wrapper" className="invisible w-full">
            <h2 className="max-w-5xl text-2xl font-semibold text-neutral-700 sm:text-4xl lg:text-6xl">
              When you believe in your dreams,{" "}
              <span className="bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500))] bg-clip-text text-transparent">
                we make them come true.
              </span>
            </h2>
            <div id="samples-categories" className="mt-8 xl:max-w-xl">
              <h5 className="mb-4 text-neutral-600">
                Sectors in which we&apos;ve worked on:
              </h5>
              <div className="flex h-fit flex-wrap gap-3 xl:max-w-lg">
                {categories.map((category, categoryIndex) => {
                  return (
                    <button
                      className={`rounded-full ${(selectedCategory === null && categoryIndex === 0) || category === selectedCategory ? "bg-neutral-700 text-neutral-100 ring-neutral-500" : "bg-neutral-200 hover:bg-neutral-300"} select-none px-3.5 py-1.5 text-[11px]/[1] text-[#272727] ring-1 ring-neutral-300 backdrop-blur-xl transition-[background-color,color] duration-500 ease-in-out sm:text-xs`}
                      key={"list-category-" + category + categoryIndex}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-28 flex gap-8 max-xl:flex-col sm:mt-36 sm:gap-16 xl:mt-0 xl:gap-20">
              <div id="samples-cta" className="grow self-end max-xl:order-last">
                <p className="my-5 max-w-72 sm:max-w-sm">
                  Every great success begins with belief—let us help transform
                  your vision into reality.
                </p>
                <Link
                  href="#"
                  className={`block w-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] px-5 py-2.5 text-sm font-medium text-white transition-[background-position] duration-700 ease-in-out hover:bg-[235%_100%]`}
                >
                  Reach out to us
                </Link>
              </div>
              <div
                className="samples-container relative max-w-xl sm:mt-14"
                style={{
                  "--small-card-width": `${SMALL_CARD_WIDTH}px`,
                  "--large-card-width": `${LARGE_CARD_WIDTH}px`,
                }}
              >
                <div className="inner-wrapper flex [&:has(img:hover)_:not(div:hover)_img]:grayscale">
                  {filteredWorks.map((work, index) => {
                    return (
                      <div
                        key={"work-sample-card-" + work.title + index}
                        className={`sample-card relative shrink-0 origin-left [&:has(div>img:hover)>div:has(img)]:w-[calc(var(--small-card-width)*1.33334)] sm:[&:has(div>img:hover)>div:has(img)]:w-[calc(var(--large-card-width)*1.66667)] [&:has(div>img:hover)>div:not(:has(img))]:delay-[500ms] [&:has(div>img:hover)>h4]:opacity-100 [&:has(div>img:hover)>h4]:delay-[500ms] [&:has(div>img:hover)]:z-[1] [&:has(div>img:hover)]:-translate-y-3 [&:has(div>img:hover)_div:not(:has(img))]:opacity-100`}
                        onClick={() => setSelectedWorkIndex(index)}
                      >
                        <div className="relative size-[var(--small-card-width)] cursor-pointer transition-[transform,width,min-width,height] delay-150 duration-500 ease-in-out sm:size-[var(--large-card-width)]">
                          <Image
                            src={work.imgSrc}
                            alt={work.title}
                            fill
                            sizes="350px"
                            className="absolute inset-0 rounded-xl object-cover transition-[filter] delay-150 duration-500 ease-in-out"
                          />
                        </div>
                        <div className="absolute -top-5 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-full rotate-45 bg-[linear-gradient(to_right,theme(colors.yellow.200),theme(colors.yellow.200))] opacity-0 transition-opacity duration-300 ease-in-out"></div>
                        <div className="pointer-events-none absolute -top-6 left-0 w-80 -translate-y-full space-y-3 opacity-0 transition-opacity duration-300 ease-in-out">
                          <div className="flex gap-2 text-xs">
                            {work.categories.map((category, categoryIndex) => (
                              <p
                                key={
                                  "work-category-" + category + categoryIndex
                                }
                                className="pointer-events-none text-nowrap rounded-full bg-[linear-gradient(to_right,theme(colors.orange.200),theme(colors.orange.200))] p-3 text-center text-neutral-700"
                              >
                                {category}
                              </p>
                            ))}
                          </div>
                          <h4 className="pointer-events-none w-[calc(var(--small-card-width)*1.33334)] rounded-md bg-[linear-gradient(to_right,theme(colors.yellow.200),theme(colors.yellow.200))] p-2 text-center text-neutral-700 sm:w-[calc(var(--large-card-width)*1.66667)]">
                            {work.title}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Left navigation button */}
                <div
                  id="samples-left-nav-btn"
                  className={`absolute left-0 top-1/2 z-[1] flex size-[74px] -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] opacity-100 transition-[background-position] delay-75 duration-700 ease-in-out max-xl:hidden ${currentIndex === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-white hover:bg-[235%_100%]"}`}
                  onClick={() =>
                    currentIndex > 0 &&
                    setCurrentIndex((prevIndex) => prevIndex - 3)
                  }
                >
                  <FaChevronLeft className="h-5 object-contain text-neutral-100 transition-[color] duration-500 ease-in-out" />
                </div>
                {/* Right navigation button */}
                <div
                  id="samples-right-nav-btn"
                  className={`absolute right-0 top-1/2 z-[1] flex size-[74px] -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] opacity-100 transition-[background-position] delay-75 duration-700 ease-in-out max-xl:hidden ${currentIndex + 3 >= filteredWorks.length ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-white hover:bg-[235%_100%]"}`}
                  onClick={() =>
                    currentIndex + 3 < filteredWorks.length &&
                    setCurrentIndex((prevIndex) => prevIndex + 3)
                  }
                >
                  <FaChevronRight className="h-5 object-contain text-neutral-100 transition-[color] duration-500 ease-in-out" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
