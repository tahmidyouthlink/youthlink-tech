"use client";

import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Flip } from "gsap/Flip";
import WorkHero from "@/components/work/WorkHero";
import WorkSamples from "@/components/work/WorkSamples";
import WorkDetails from "@/components/work/WorkDetails";

const SMALL_CARD_WIDTH = 100;
const SMALL_CARD_OFFSET = SMALL_CARD_WIDTH / 2;
const LARGE_CARD_WIDTH = 192;
const LARGE_CARD_OFFSET = LARGE_CARD_WIDTH / 2;

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, InertiaPlugin, Flip);

export default function OurWork() {
  const [selectedOption, setSelectedOption] = useState("hero");

  return (
    <main id="work-main" className="relative min-h-dvh bg-neutral-100">
      <WorkDetails
        gsap={gsap}
        useGSAP={useGSAP}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <WorkSamples
        gsap={gsap}
        useGSAP={useGSAP}
        Draggable={Draggable}
        Flip={Flip}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        cardMesurements={{
          SMALL_CARD_WIDTH,
          SMALL_CARD_OFFSET,
          LARGE_CARD_WIDTH,
          LARGE_CARD_OFFSET,
        }}
      />
      <WorkHero
        gsap={gsap}
        useGSAP={useGSAP}
        Draggable={Draggable}
        Flip={Flip}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        cardMesurements={{
          SMALL_CARD_WIDTH,
          SMALL_CARD_OFFSET,
          LARGE_CARD_WIDTH,
          LARGE_CARD_OFFSET,
        }}
      />
    </main>
  );
}
