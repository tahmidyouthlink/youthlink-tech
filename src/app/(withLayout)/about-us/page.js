"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function OurWork() {
  return (
    <main className="bg-neutral-100">
      <AboutHero gsap={gsap} useGSAP={useGSAP} />
      <AboutStory gsap={gsap} useGSAP={useGSAP} ScrollTrigger={ScrollTrigger} />
    </main>
  );
}
