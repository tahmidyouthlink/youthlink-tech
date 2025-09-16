import Image from "next/image";
import backgroundImg from "public/about/snow-hiking.jpg";

export default function AboutHero({ gsap, useGSAP }) {
  useGSAP(
    () => {
      const tl = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: "#about-hero",
          start: `top center`,
          end: `bottom top`,
          once: true,
        },
        defaults: { autoAlpha: 0, duration: 0.5, ease: "power1.inOut" },
      });

      const handleTimelineCompletion = () => {
        tl.kill();

        const scrubTl = gsap.timeline({
          delay: 0.5,
          scrollTrigger: {
            trigger: "#about-hero",
            start: `top top`,
            end: `center top`,
            scrub: true,
          },
          defaults: { duration: 0.5, ease: "power1.inOut" },
        });

        scrubTl.to("#about-hero-text", {
          y: -200,
          autoAlpha: 0,
          scale: 1.5,
        });
      };

      tl.set("#about-hero", { autoAlpha: 1 })
        .from("#about-hero-bg", { scale: 1.5 })
        .from("#about-hero-text", {
          y: 200,
          onComplete: () => handleTimelineCompletion(),
        });
    },
    { dependencies: [gsap] },
  );

  return (
    <div
      id="about-hero"
      className="invisible relative flex min-h-dvh items-center justify-center overflow-hidden after:absolute after:bottom-0 after:left-0 after:right-0 after:z-[1] after:h-52 after:translate-y-1/4 after:bg-[linear-gradient(to_top,#f5f5f5,#f5f5f5,transparent)] after:content-['']"
    >
      <Image
        id="about-hero-bg"
        src={backgroundImg}
        alt="snow-hiking-background"
        className="absolute inset-0 h-dvh w-dvw object-cover"
      />
      <h1
        id="about-hero-text"
        className="relative max-w-3xl text-center text-3xl font-semibold text-white sm:text-6xl"
      >
        Believe in your dreams,{" "}
        <span className="bg-[linear-gradient(to_right,theme(colors.orange.300),theme(colors.yellow.200))] bg-clip-text text-transparent">
          make them come true.
        </span>
      </h1>
    </div>
  );
}
