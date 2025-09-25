"use client";

import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import WorkHero from "@/components/work/WorkHero";
import WorkSamples from "@/components/work/WorkSamples";
import WorkDetails from "@/components/work/WorkDetails";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

export default function OurWork() {
  const [selectedOption, setSelectedOption] = useState("hero");

  return (
    <main id="work-main" className="relative min-h-dvh bg-neutral-100">
      <WorkDetails
        gsap={gsap}
        useGSAP={useGSAP}
        selectedOption={selectedOption}
      />
      <WorkSamples
        gsap={gsap}
        useGSAP={useGSAP}
        Flip={Flip}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <WorkHero
        gsap={gsap}
        useGSAP={useGSAP}
        Flip={Flip}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </main>
  );
}
