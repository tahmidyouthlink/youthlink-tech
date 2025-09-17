"use client";

import Image from "next/image";
import styles from "@/app/(withLayout)/our-work/styles.module.css";

export default function WorkParallax({ gsap, useGSAP }) {
  useGSAP(
    () => {
      const tl = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: "#work-samples",
          start: `top center`,
          end: `bottom top`,
          once: true,
        },
        defaults: { autoAlpha: 0, duration: 0.5, ease: "power1.inOut" },
      });

      const handleTimelineCompletion = () => {
        tl.kill();

        gsap.to("#back-mountain", { scrollTrigger: { scrub: 1 }, scale: 1.5 });
        gsap.to("#human", { scrollTrigger: { scrub: 1 }, scale: 0.65 });
        gsap.to("#mountain-left", { scrollTrigger: { scrub: 1 }, x: -500 });
        gsap.to("#mountain-right", { scrollTrigger: { scrub: 1 }, x: 500 });
        gsap.to("#cloud-left", { scrollTrigger: { scrub: 1 }, x: -200 });
        gsap.to("#cloud-right", { scrollTrigger: { scrub: 1 }, x: 200 });
        gsap.to("#work-parallax h2", { scrollTrigger: { scrub: 1 }, y: 200 });
      };

      tl.set("#work-parallax", { autoAlpha: 1 })
        .from("#back-mountain", { y: 200 })
        .from("#human", { y: 200 })
        .from("#mountain-left", { x: -500 })
        .from("#mountain-right", { x: 500 }, "<")
        .from("#cloud-left", { x: -200 })
        .from("#cloud-right", { x: 200 }, "<")
        .from("#work-parallax h2", {
          y: 200,
          onComplete: () => handleTimelineCompletion(),
        });
      // .set(
      //   "#back-mountain, #human, #mountain-left, #mountain-right, #cloud-left, #cloud-right, #work-parallax h2",
      //   {
      //     autoAlpha: 1,
      //     x: 0,
      //     y: 0,
      //   },
      // );
    },
    { dependencies: [gsap] },
  );

  return (
    <div
      id="work-parallax"
      className={`${styles.parallax} invisible relative flex min-h-dvh items-center justify-center overflow-hidden`}
    >
      <Image
        id="back-mountain"
        src="/work/parallax/back-mountain.jpg"
        alt="back-mountain"
        width={0}
        height={0}
        sizes="(max-width: 1280px) 100dvh, 100dvw"
      />
      <h2 className="relative -mb-32 max-w-3xl text-center text-6xl font-semibold text-neutral-50">
        Believe in your dreams,{" "}
        <span className="bg-[linear-gradient(to_right,theme(colors.orange.300),theme(colors.yellow.200))] bg-clip-text text-transparent">
          make them come true.
        </span>
      </h2>
      <Image
        id="human"
        src="/work/parallax/human.png"
        alt="human"
        width={0}
        height={0}
        sizes="(max-width: 1280px) 100dvh, 100dvw"
      />
      <Image
        id="cloud-left"
        src="/work/parallax/clouds-left.png"
        alt="cloud-left"
        width={0}
        height={0}
        sizes="(max-width: 1280px) 100dvh, 100dvw"
      />
      <Image
        id="cloud-right"
        src="/work/parallax/clouds-right.png"
        alt="cloud-right"
        width={0}
        height={0}
        sizes="(max-width: 1280px) 100dvh, 100dvw"
      />
      <Image
        id="mountain-left"
        src="/work/parallax/front-mountain-left.png"
        alt="mountain-left"
        width={0}
        height={0}
        sizes="(max-width: 1280px) 100dvh, 100dvw"
      />
      <Image
        id="mountain-right"
        src="/work/parallax/front-mountain-right.png"
        alt="mountain-right"
        width={0}
        height={0}
        sizes="(max-width: 1280px) 100dvh, 100dvw"
      />
    </div>
  );
}
