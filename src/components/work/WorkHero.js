import { useRef } from "react";
import Image from "next/image";

const imgSrcs = [
  "/work/cards/beast.jpg",
  "/work/cards/crow.webp",
  "/work/cards/snatch.jpg",
  "/work/cards/eighteen.jpg",
  "/work/cards/milton-glaser.jpg",
  "/work/cards/noir.jpg",
  "/work/cards/edm.jpg",
  "/work/cards/wet.webp",
  "/work/cards/faces.jpg",
];
const rotate = [-24, -18, -12, -6, 0, 6, 12, 18, 24];

export default function WorkHero({ gsap, useGSAP, Flip, setSelectedOption }) {
  const sampleTl = useRef(null);
  const storyTl = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: "#work-hero",
          start: `top center`,
          end: `bottom top`,
          toggleActions: "restart reset restart reset",
        },
        defaults: { autoAlpha: 0, duration: 0.5, ease: "power1.inOut" },
      });

      tl.set("#work-hero", { autoAlpha: 1 })
        // .set("#cards-container, .hero-card, #work-hero p, #work-hero button", { autoAlpha: 1 })
        .set("#cards-container", { marginRight: -192 })
        .from("#work-hero h1", { y: 35 })
        .from(
          "#cards-container",
          { y: "50dvh", rotate: 60, duration: 0.75 },
          "<",
        )
        .fromTo(
          ".hero-card",
          {
            autoAlpha: 1,
            rotate: 0,
            marginLeft: -192,
            stagger: { amount: 0.5 },
          },
          {
            autoAlpha: 1,
            rotate: (i) => rotate[i],
            marginLeft: -96,
            stagger: { amount: 0.5 },
          },
        )
        .fromTo(
          "#cards-container",
          { autoAlpha: 1, marginRight: -192 },
          { autoAlpha: 1, marginRight: -96 },
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

      storyTl.current = gsap.timeline({
        paused: true,
        defaults: { duration: 0.5, ease: "power1.inOut", delay: 0 },
      });

      const handleSectionTransition = () => {
        if (typeof document !== "undefined") {
          const heroCardsContainer = document.getElementById("cards-container");
          const state = Flip.getState(heroCardsContainer);
          const samplesBottomContainer = document.getElementById(
            "samples-outside-wrapper",
          );
          samplesBottomContainer.appendChild(heroCardsContainer);

          const appendedEl = document.querySelector(
            "#work-samples #cards-container",
          );
          appendedEl.style.position = "absolute";
          appendedEl.style.bottom = "0";
          appendedEl.style.right = "96px";
          // appendedEl.style.height = "208px";
          // appendedEl.style.width = "208px";

          setSelectedOption("samples");
          Flip.from(state, {
            duration: 1,
            ease: "power1.inOut",
          });
        }
      };

      sampleTl.current
        // .to(".hero-card", {
        //   marginLeft: -192,
        //   stagger: { amount: 0.5 },
        // })
        .to("#work-hero h1, #work-hero p, #work-hero button", {
          y: "-100dvh",
          autoAlpha: 0,
        })
        // .to("#cards-container", { y: "50%" }, "<")
        // .set(".hero-card", { delay: 0 })
        // .to(".hero-card img", {
        //   height: 192,
        //   width: 192,
        // })
        .to(
          ".hero-card",
          {
            rotate: 0,
            marginLeft: -192,
            delay: 0,
            onComplete: () => handleSectionTransition(),
          },
          "<",
        );

      storyTl.current
        .to("#work-hero h1, #work-hero p", {
          y: -50,
          autoAlpha: 0,
          stagger: { amount: 0.5 },
        })
        .to(
          ".hero-card, #work-hero button",
          {
            x: 50,
            autoAlpha: 0,
            stagger: { amount: 0.5 },
            onComplete: () => setSelectedOption("story"),
          },
          "<",
        );
    },
    { dependencies: [Flip, gsap, setSelectedOption] },
  );

  return (
    <div
      id="work-hero"
      className="invisible -mt-[100dvh] flex min-h-dvh items-center justify-center overflow-hidden pt-[92px]"
    >
      <div>
        <h1 className="mx-auto mb-14 max-w-2xl text-center text-6xl font-semibold text-neutral-700 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]">
          Providing the{" "}
          <span className="bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500))] bg-clip-text text-transparent">
            Ultimate
          </span>{" "}
          Solution Needed.
        </h1>
        <div
          id="cards-container"
          className="flex items-center justify-center [&:has(img:hover)_:not(div:hover)_img]:grayscale"
        >
          {imgSrcs.map((src, index) => {
            return (
              <div
                key={"work-hero-img" + src + index}
                className={`hero-card relative rotate-[var(--rotate)] space-y-2 [&:has(img:hover)>div]:opacity-100 [&:has(img:hover)>div]:delay-[500ms] [&:has(img:hover)>h4]:opacity-100 [&:has(img:hover)>h4]:delay-[500ms] [&:has(img:hover)>img]:w-80 [&:has(img:hover)]:z-[1] [&:has(img:hover)]:-translate-y-3`}
              >
                <Image
                  key={index}
                  src={src}
                  alt={`Image ${index + 1}`}
                  width={0}
                  height={0}
                  sizes="350px"
                  className="size-48 cursor-pointer rounded-xl object-cover transition-[filter] delay-150 duration-500 ease-in-out"
                />
                <div className="absolute -top-5 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-full rotate-45 bg-[linear-gradient(to_right,theme(colors.yellow.200),theme(colors.yellow.200))] opacity-0 transition-opacity duration-300 ease-in-out"></div>
                <h4 className="pointer-events-none absolute -top-6 left-0 w-80 -translate-y-full rounded-md bg-[linear-gradient(to_right,theme(colors.yellow.200),theme(colors.yellow.200))] p-2 text-center text-neutral-700 opacity-0 transition-opacity duration-300 ease-in-out">
                  How we&apos;ve initiated Bangladesh&apos;s first fashion
                  e-commerce business
                </h4>
              </div>
            );
          })}
        </div>
        <p className="mb-5 mt-20 text-center">
          Become a part of our journey. Let&apos;s conquer the world together.
        </p>
        <div className="flex justify-center gap-5">
          <button
            // onClick={() => setSelectedOption("samples")}
            onClick={() => sampleTl.current?.play()}
            className={`rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] px-5 py-2.5 text-sm font-medium text-white transition-[background-position] duration-700 ease-in-out hover:bg-[235%_100%]`}
          >
            Glimpse of our work
          </button>
          <button
            // onClick={() => setSelectedOption("story")}
            onClick={() => storyTl.current?.play()}
            className={`px-5 py-2.5 text-sm font-medium transition-[color] duration-300 ease-in-out hover:text-yellow-600`}
          >
            How we do it
          </button>
        </div>
      </div>
    </div>
  );
}
