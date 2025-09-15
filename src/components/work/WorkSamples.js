import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function WorkSamples({
  gsap,
  useGSAP,
  selectedOption,
  setSelectedOption,
}) {
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
      if (selectedOption === "samples") {
        const tl = gsap.timeline({
          delay: 1,
          scrollTrigger: {
            trigger: "#work-samples",
            start: `top center`,
            end: `bottom top`,
            toggleActions: "restart reset restart reset",
            once: true,
          },
          defaults: { autoAlpha: 0, duration: 0.5, ease: "power1.inOut" },
        });

        tl.set("#samples-inside-wrapper", { autoAlpha: 1 })
          .set("#work-samples #cards-container", { display: "hidden" })
          .set("#samples-container .sample-card", {
            autoAlpha: 1,
            rotate: 0,
            marginLeft: -192,
          })
          .from("#work-samples h2", { y: 35 })
          .from(
            "#samples-categories p",
            { x: -25, stagger: { amount: 0.5 } },
            "<",
          )
          .to(
            "#samples-container .sample-card",
            {
              autoAlpha: 1,
              rotate: -24,
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
          .from(
            "#samples-cta p, #samples-cta a",
            {
              y: 35,
              stagger: { amount: 0.5 },
            },
            "<0.25",
          );
      }
    },
    { dependencies: [gsap, selectedOption] },
  );

  return (
    <div className="overflow-hidden">
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
            <div id="samples-cta" className="-mt-14 flex gap-20">
              <div className="grow self-end">
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
              <div
                id="samples-container"
                className="relative mt-14 max-w-[40dvw]"
              >
                <div className="flex [&:has(img:hover)_:not(div:hover)_img]:grayscale">
                  {imgSrcs.map((src, index) => {
                    return (
                      <div
                        key={"story-hero-img-" + src + index}
                        className={`sample-card relative origin-left rotate-[var(--rotate)] transition-[transform,width,height,filter] delay-150 duration-500 ease-in-out [&:has(img:hover)>div]:delay-[500ms] [&:has(img:hover)>h4]:opacity-100 [&:has(img:hover)>h4]:delay-[500ms] [&:has(img:hover)>img]:min-w-80 [&:has(img:hover)]:z-[1] [&:has(img:hover)]:-translate-y-3 [&:has(img:hover)_div]:opacity-100`}
                      >
                        <Image
                          src={src}
                          alt={`Image ${index + 1}`}
                          width={0}
                          height={0}
                          sizes="350px"
                          className="size-48 min-w-48 cursor-pointer rounded-xl object-cover transition-[transform,width,min-width,height,filter] delay-150 duration-500 ease-in-out"
                        />
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
                  className={`absolute left-0 top-1/2 z-[1] flex size-[74px] -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] opacity-100 transition-[opacity,transform,background-position] delay-75 duration-700 ease-in-out ${9 < 2 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-white hover:bg-[235%_100%]"}`}
                >
                  <FaChevronLeft className="h-5 object-contain text-neutral-100 transition-[color] duration-500 ease-in-out" />
                </div>
                {/* Right navigation button */}
                <div
                  id="samples-right-nav-btn"
                  className={`absolute right-0 top-1/2 z-[1] flex size-[74px] -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] opacity-100 transition-[opacity,transform,background-position] delay-75 duration-700 ease-in-out ${9 < 2 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-white hover:bg-[235%_100%]"}`}
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
