import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function WorkSamples({
  gsap,
  useGSAP,
  Flip,
  selectedOption,
  setSelectedOption,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWorkIndex, setSelectedWorkIndex] = useState(null);

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
  const categories = [
    "All",
    "Digital Marketing",
    "E-Commerce",
    "Data Strategy",
    "Digital Transformation",
    "Content Management",
  ];

  useGSAP(
    () => {
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
            "#samples-categories p, #work-samples .samples-container .sample-card, #samples-left-nav-btn, #samples-right-nav-btn",
            { y: 0 },
          )
          .set("#work-samples .samples-container .sample-card img", {
            scale: 1,
            autoAlpha: 1,
          })
          .set("#work-hero", { display: "none" })
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
            "#samples-categories p",
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
          .fromTo(
            "#work-samples .samples-container .sample-card",
            {
              zIndex: 0,
              rotation: 0,
              marginLeft: -192,
              stagger: { amount: 0.5 },
            },
            {
              zIndex: 0,
              rotation: -24,
              marginLeft: (i) => (i === 0 ? 0 : -32),
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
      }

      if (selectedOption === "samples" && selectedWorkIndex !== null) {
        const tl = gsap.timeline({
          defaults: { duration: 0.5, ease: "power1.inOut" },
        });

        const handleSectionTransition = () => {
          if (typeof document !== "undefined") {
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
            appendedEl.style.height = "calc(100dvh-92px-80px)";
            appendedEl.style.width = "100%";
            appendedEl.style.transitionDelay = "0ms";

            setSelectedOption({
              label: "details",
              work: { img: imgSrcs[selectedWorkIndex] },
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
            "#samples-left-nav-btn, #samples-right-nav-btn, #samples-inside-wrapper > h2, #samples-categories p, #samples-cta > p, #samples-cta > a",
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
    { dependencies: [gsap, selectedOption, selectedWorkIndex] },
  );

  useGSAP(
    () => {
      if (selectedOption === "samples" && selectedWorkIndex === null) {
        const tl = gsap.timeline({
          defaults: { stagger: 0.1, duration: 0.5, ease: "power1.inOut" },
        });

        tl.to("#work-samples .samples-container .sample-card", {
          autoAlpha: (i) => (i >= currentIndex ? 1 : 0),
        }).to(
          "#work-samples .samples-container .inner-wrapper",
          {
            x: -(currentIndex * (192 - 32)),
          },
          "<",
        );
      }
    },
    { dependencies: [currentIndex, gsap, selectedOption, selectedWorkIndex] },
  );

  return (
    <div className="absolute left-0 top-0 w-full overflow-hidden">
      <div
        id="work-samples"
        className="flex min-h-dvh items-center justify-center px-5 pt-[92px] text-white sm:px-8 lg:px-12 xl:mx-auto xl:max-w-[1200px] xl:px-0"
      >
        <div id="samples-outside-wrapper" className="relative w-full">
          <div id="samples-inside-wrapper" className="invisible w-full">
            <h2 className="max-w-5xl text-6xl font-semibold text-neutral-700">
              When you believe in your dreams,{" "}
              <span className="bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500))] bg-clip-text text-transparent">
                we make them come true.
              </span>
            </h2>
            <div id="samples-categories" className="mt-8 max-w-xl">
              <p className="mb-4 text-neutral-600">
                Sectors in which we&apos;ve worked on:
              </p>
              <div className="flex h-fit w-[33.3dvw] flex-wrap gap-3">
                {categories.map((category, categoryIndex) => {
                  return (
                    <p
                      className={`rounded-full ${categoryIndex === 0 ? "bg-neutral-700 text-neutral-100 ring-neutral-500" : "bg-neutral-200 hover:bg-neutral-300"} cursor-pointer select-none px-3.5 py-1.5 text-xs text-[#272727] ring-1 ring-neutral-300 backdrop-blur-xl transition-[background-color,color] duration-500 ease-in-out`}
                      key={categoryIndex}
                    >
                      {category}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="-mt-14 flex gap-20">
              <div id="samples-cta" className="grow self-end">
                <p className="my-5 max-w-sm">
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
              <div className="samples-container relative mt-14 max-w-[40dvw]">
                <div className="inner-wrapper flex [&:has(img:hover)_:not(div:hover)_img]:grayscale">
                  {imgSrcs.map((src, index) => {
                    return (
                      <div
                        key={"story-hero-img-" + src + index}
                        className={`sample-card relative origin-left rotate-[var(--rotate)] transition-[transform,width,height,filter] delay-150 duration-500 ease-in-out [&:has(div>img:hover)>div:has(img)]:min-w-80 [&:has(div>img:hover)>div:not(:has(img))]:delay-[500ms] [&:has(div>img:hover)>h4]:opacity-100 [&:has(div>img:hover)>h4]:delay-[500ms] [&:has(div>img:hover)]:z-[1] [&:has(div>img:hover)]:-translate-y-3 [&:has(div>img:hover)_div:not(:has(img))]:opacity-100`}
                        onClick={() => setSelectedWorkIndex(index)}
                      >
                        <div className="relative size-48 min-w-48 cursor-pointer transition-[transform,width,min-width,height] delay-150 duration-500 ease-in-out">
                          <Image
                            src={src}
                            alt={`Image ${index + 1}`}
                            fill
                            sizes="350px"
                            className="absolute inset-0 rounded-xl object-cover transition-[filter] delay-150 duration-500 ease-in-out"
                          />
                        </div>
                        <div className="absolute -top-5 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-full rotate-45 bg-[linear-gradient(to_right,theme(colors.yellow.200),theme(colors.yellow.200))] opacity-0 transition-opacity duration-300 ease-in-out"></div>
                        <div className="absolute -top-6 left-0 w-80 -translate-y-full space-y-3 opacity-0 transition-opacity duration-300 ease-in-out">
                          <div className="flex gap-2 text-xs">
                            <p className="pointer-events-none rounded-full bg-[linear-gradient(to_right,theme(colors.orange.200),theme(colors.orange.200))] p-3 text-center text-neutral-700">
                              Content Management
                            </p>
                            <p className="pointer-events-none rounded-full bg-[linear-gradient(to_right,theme(colors.orange.200),theme(colors.orange.200))] p-3 text-center text-neutral-700">
                              Data Strategy
                            </p>
                          </div>
                          <h4 className="pointer-events-none rounded-md bg-[linear-gradient(to_right,theme(colors.yellow.200),theme(colors.yellow.200))] p-2 text-center text-neutral-700">
                            How we&apos;ve initiated Bangladesh&apos;s first
                            fashion e-commerce business
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Left navigation button */}
                <div
                  id="samples-left-nav-btn"
                  className={`absolute left-0 top-1/2 z-[1] flex size-[74px] -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] opacity-100 transition-[background-position] delay-75 duration-700 ease-in-out ${currentIndex === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-white hover:bg-[235%_100%]"}`}
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
                  className={`absolute right-0 top-1/2 z-[1] flex size-[74px] -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] opacity-100 transition-[background-position] delay-75 duration-700 ease-in-out ${currentIndex + 3 >= imgSrcs.length ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-white hover:bg-[235%_100%]"}`}
                  onClick={() =>
                    currentIndex + 3 < imgSrcs.length &&
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
