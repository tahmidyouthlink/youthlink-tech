"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesParallax from "@/components/services/ServicesParallax";
import ServicesStory from "@/components/services/ServicesStory";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function OurWork() {
  return (
    <main className="bg-neutral-100">
      <ServicesParallax gsap={gsap} useGSAP={useGSAP} />
      <ServicesStory
        gsap={gsap}
        useGSAP={useGSAP}
        ScrollTrigger={ScrollTrigger}
      />
    </main>
  );
}
