import { useRef } from "react";
import Image from "next/image";

const cardRotations = [-24, -18, -12, -6, 0, 6, 12, 18, 24];

export default function WorkHero({
  gsap,
  useGSAP,
  Draggable,
  Flip,
  works,
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
  const sampleTl = useRef(null);

  useGSAP(
    () => {
      if (selectedOption === "hero") {
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
              delay: 0.5,
              scrollTrigger: {
                trigger: "#work-hero",
                start: `top center`,
                end: `bottom top`,
              },
              defaults: { autoAlpha: 0, duration: 0.5, ease: "power1.inOut" },
            });

            tl.set("#work-hero", { autoAlpha: 1 })
              .set("#hero-cards-container", {
                autoAlpha: 0,
                y: "50dvh",
                marginRight: -cardWidth,
              })
              .set(".hero-card", {
                autoAlpha: 1,
                rotation: 0,
                marginLeft: -cardWidth,
              })
              .from("#work-hero h1", { y: 35 })
              .fromTo(
                "#hero-cards-container",
                { autoAlpha: 0, y: "50dvh", rotation: 60, duration: 0.75 },
                { autoAlpha: 1, y: 0, rotation: 0, duration: 0.75 },
                "<",
              )
              .fromTo(
                ".hero-card",
                {
                  autoAlpha: 1,
                  rotation: 0,
                  marginLeft: -cardWidth,
                  stagger: { amount: 0.5 },
                },
                {
                  autoAlpha: 1,
                  rotation: (i) => (!isDesktop ? -12 : cardRotations[i]),
                  marginLeft: -cardOffset,
                  stagger: { amount: 0.5 },
                },
              )
              .fromTo(
                "#hero-cards-container",
                { autoAlpha: 1, marginRight: -cardWidth },
                { autoAlpha: 1, marginRight: -cardOffset },
                "<0.25",
              )
              .from("#work-hero p", { y: 35 })
              .from("#work-hero button", {
                x: -35,
                stagger: { amount: 0.35 },
              });

            sampleTl.current = gsap.timeline({
              paused: true,
              defaults: { duration: 0.5, ease: "power1.inOut", delay: 0 },
            });

            const handleSectionTransition = () => {
              if (typeof document !== "undefined") {
                const heroCardsContainer = document.getElementById(
                  "hero-cards-container",
                );
                const state = Flip.getState(heroCardsContainer);
                const samplesBottomContainer = document.querySelector(
                  isDesktop
                    ? "#work-samples #samples-outside-wrapper"
                    : "#work-samples .samples-container",
                );
                samplesBottomContainer.appendChild(heroCardsContainer);

                const appendedEl = document.querySelector(
                  "#work-samples #hero-cards-container",
                );
                appendedEl.style.position = "absolute";
                appendedEl.style.visibility = "visible";

                if (isDesktop) {
                  appendedEl.style.bottom = "0";
                  appendedEl.style.right = `${cardOffset}px`;
                } else {
                  appendedEl.style.top = "0";
                  appendedEl.style.left = "0";
                }

                setSelectedOption("samples");
                Flip.from(state, {
                  duration: 1,
                  ease: "power1.inOut",
                });
              }
            };

            sampleTl.current
              .to("#work-hero h1, #work-hero p, #work-hero button", {
                y: "-200dvh",
                autoAlpha: 0,
              })
              .fromTo(
                ".hero-card",
                {
                  rotation: (i) => (!isDesktop ? -12 : cardRotations[i]),
                  marginLeft: -cardOffset,
                },
                {
                  rotation: 0,
                  marginLeft: -cardWidth,
                  delay: 0,
                  onComplete: () => handleSectionTransition(),
                },
                "<",
              );

            // Drag/swipe support on smaller screens only
            if (!isDesktop) {
              const containerEl = document.getElementById(
                "hero-cards-container",
              );
              const cardCount = works.length;
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
          },
        );
      }
    },
    {
      dependencies: [
        Draggable,
        Flip,
        gsap,
        works,
        selectedOption,
        setSelectedOption,
      ],
    },
  );

  return (
    <div
      id="work-hero"
      className="invisible absolute left-0 top-0 flex min-h-dvh w-full items-center justify-center overflow-hidden pt-[92px]"
    >
      <div>
        <h1 className="mx-auto mb-14 max-w-2xl text-center text-3xl font-semibold text-neutral-700 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] sm:text-6xl">
          Providing the{" "}
          <span className="bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500))] bg-clip-text text-transparent">
            Ultimate
          </span>{" "}
          Solution Needed.
        </h1>
        <div
          id="hero-cards-container"
          className="flex items-center xl:justify-center [&:has(img:hover)_:not(div:hover)_img]:grayscale"
          style={{
            "--small-card-width": `${SMALL_CARD_WIDTH}px`,
            "--large-card-width": `${LARGE_CARD_WIDTH}px`,
          }}
        >
          {works.map((work, index) => {
            return (
              <div
                key={"work-hero-img" + work.title + work.imgSrc + index}
                className={`hero-card relative shrink-0 space-y-2 [&:has(img:hover)>div]:opacity-100 [&:has(img:hover)>div]:delay-[500ms] [&:has(img:hover)>h4]:opacity-100 [&:has(img:hover)>h4]:delay-[500ms] [&:has(img:hover)>img]:w-[calc(var(--small-card-width)*1.33334)] sm:[&:has(img:hover)>img]:w-[calc(var(--large-card-width)*1.66667)] [&:has(img:hover)]:z-[1] [&:has(img:hover)]:-translate-y-3`}
              >
                <Image
                  src={work.imgSrc}
                  alt={work.title}
                  width={0}
                  height={0}
                  sizes="350px"
                  className="size-[var(--small-card-width)] cursor-pointer rounded-xl object-cover transition-[filter,width] delay-150 duration-500 ease-in-out sm:size-[var(--large-card-width)]"
                />
                <div className="absolute -top-5 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-full rotate-45 bg-[linear-gradient(to_right,theme(colors.yellow.200),theme(colors.yellow.200))] opacity-0 transition-opacity duration-300 ease-in-out"></div>
                <h4
                  className="pointer-events-none absolute -top-6 left-0 w-[calc(var(--small-card-width)*1.33334)] -translate-y-full rounded-md bg-[linear-gradient(to_right,theme(colors.yellow.200),theme(colors.yellow.200))] p-2 text-center text-neutral-700 opacity-0 transition-opacity duration-300 ease-in-out max-sm:text-[11px]/[1.25] sm:w-[calc(var(--large-card-width)*1.66667)]"
                  dangerouslySetInnerHTML={{
                    __html: work.title.replace(/<\/?[^>]+(>|$)/g, ""),
                  }}
                ></h4>
              </div>
            );
          })}
        </div>
        <p className="mb-5 mt-20 text-center max-sm:mx-5">
          Become a part of our journey. Let&apos;s conquer the world together.
        </p>
        <button
          onClick={() => sampleTl.current?.play()}
          className={`mx-auto block rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] px-5 py-2.5 text-sm font-medium text-white transition-[background-position] duration-700 ease-in-out hover:bg-[235%_100%]`}
        >
          Get a glimpse of our work
        </button>
      </div>
    </div>
  );
}
