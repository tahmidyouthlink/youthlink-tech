"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkParallax from "@/components/work/WorkParallax";
import WorkStory from "@/components/work/WorkStory";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function OurWork() {
  return (
    <main className="bg-neutral-100">
      <WorkParallax gsap={gsap} useGSAP={useGSAP} />
      <WorkStory gsap={gsap} useGSAP={useGSAP} ScrollTrigger={ScrollTrigger} />
    </main>
  );
}
