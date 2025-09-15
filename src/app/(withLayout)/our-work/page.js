"use client";

import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import WorkHero from "@/components/work/WorkHero";
import WorkSamples from "@/components/work/WorkSamples";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

export default function OurWork() {
  const [selectedOption, setSelectedOption] = useState("hero");

  return (
    <main id="work-main" className="bg-neutral-100">
      {/* {selectedOption !== "story" ? ( */}
      <WorkSamples
        gsap={gsap}
        useGSAP={useGSAP}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <WorkHero
        gsap={gsap}
        useGSAP={useGSAP}
        Flip={Flip}
        setSelectedOption={setSelectedOption}
      />
    </main>
  );
}
