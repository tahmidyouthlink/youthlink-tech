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
  const works = [
    {
      imgSrc: "/work/cards/beast.jpg",
      title: `<h1>How we unlocked <strong>Beast Mode</strong> to ignite digital power beyond limits</h1>`,
      categories: ["Digital Marketing", "E-Commerce", "Data Strategy"],
      details: `
        <h3>We help you make <strong>strategic digital choices</strong> that unlock long-term value and business success. Our team stays focused on your needs.</h3>
        <h3>Using proven methods like <strong>BHAG and OGSM</strong>, we deliver measurable outcomes that drive growth. Goals guide our every move.</h3>
        <h3>With our <strong>RESI approach</strong>, we align teams and guide your organization toward sustainable results. Success requires strong collaboration.</h3>
        <h3>We help you make <strong>strategic digital choices</strong> that unlock long-term value and business success. Our team stays focused on your needs.</h3>
        <h3>Using proven methods like <strong>BHAG and OGSM</strong>, we deliver measurable outcomes that drive growth. Goals guide our every move.</h3>
        <h3>With our <strong>RESI approach</strong>, we align teams and guide your organization toward sustainable results. Success requires strong collaboration.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/crow.webp",
      title: `<h1>How we redefined <strong>Crow Funding</strong> to spark growth and community impact</h1>`,
      categories: ["E-Commerce", "Data Strategy", "Digital Marketing"],
      details: `
        <h3>We help you make <strong>strategic digital choices</strong> that empower communities and unlock exponential business growth.</h3>
        <h3>Our methods <strong>fuse data-driven insights</strong> with people-centric strategies to deliver results that matter.</h3>
        <h3>Through <strong>BHAG and OGSM frameworks</strong>, every funding strategy aligns with tangible outcomes and scalable success.</h3>
        <h3>We create ecosystems that <strong>combine creativity with analytics</strong>, reshaping how crowdfunding drives innovation.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/snatch.jpg",
      title: `<h1>How we built <strong>Snatch</strong> to capture innovation in every swipe</h1>`,
      categories: ["Digital Transformation", "E-Commerce"],
      details: `
        <h3>With <strong>Snatch</strong>, we engineered seamless app experiences designed for speed, usability, and growth.</h3>
        <h3>We applied <strong>RESI principles</strong> to align teams across design, development, and deployment.</h3>
        <h3>Using <strong>goal-driven methods</strong>, we delivered measurable improvements in retention, engagement, and performance.</h3>
        <h3>Snatch represents <strong>the next frontier of digital transformation</strong>, where mobile innovation meets customer delight.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/eighteen.jpg",
      title: `<h1>How we launched <strong>Eighteen Magazine</strong> to leap boldly into digital storytelling</h1>`,
      categories: ["Digital Marketing", "Data Strategy"],
      details: `
        <h3>We helped <strong>Eighteen Magazine</strong> disrupt the publishing space with a launch strategy rooted in innovation.</h3>
        <h3>By leveraging <strong>OGSM frameworks</strong>, we built campaigns that drive readership and retention.</h3>
        <h3>Our <strong>data-driven storytelling</strong> amplified reach and impact across multiple platforms.</h3>
        <h3>This launch was not just about a magazine—it was <strong>the start of a content movement</strong>.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/milton-glaser.jpg",
      title: `<h1>How we created the <strong>Milton Glaser</strong> tribute campaign to blend creativity with brilliance</h1>`,
      categories: ["Digital Marketing", "Customer Experience"],
      details: `
        <h3>We honored <strong>Milton Glaser’s legacy</strong> through a campaign blending creativity and strategy.</h3>
        <h3>Our team used <strong>BHAG & OGSM</strong> methods to ensure the tribute left a lasting global impact.</h3>
        <h3>We crafted <strong>story-driven digital campaigns</strong> that celebrated his influence on art, design, and culture.</h3>
        <h3>This project became a <strong>case study in meaningful marketing</strong>—driving both engagement and inspiration.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/noir.jpg",
      title: `<h1>How we built <strong>Noir Analytics</strong> to illuminate data in the dark</h1>`,
      categories: ["Data Strategy", "Digital Transformation", "E-Commerce"],
      details: `
        <h3><strong>Noir</strong> transformed raw data into actionable strategies with cutting-edge analytics.</h3>
        <h3>We applied <strong>RESI collaboration methods</strong> to align teams and drive clarity in decision-making.</h3>
        <h3>Our <strong>goal-oriented approach</strong> helped businesses unlock insights hidden in the data shadows.</h3>
        <h3>Noir is where <strong>data meets creativity</strong>, enabling smart, sustainable growth.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/edm.jpg",
      title: `<h1>How we initiated <strong>Bangladesh’s first fashion e-commerce</strong> business to set new trends</h1>`,
      categories: [
        "E-Commerce",
        "Digital Transformation",
        "Customer Experience",
      ],
      details: `
        <h3>We pioneered <strong>Bangladesh’s first fashion e-commerce movement</strong>, changing how people shop.</h3>
        <h3>By using <strong>BHAG and OGSM methods</strong>, we aligned strategies with business objectives for exponential growth.</h3>
        <h3>Our <strong>customer-first approach</strong> reshaped user experience, setting new industry benchmarks.</h3>
        <h3>This project proved how <strong>digital disruption</strong> can redefine an entire market.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/wet.webp",
      title: `<h1>How we created the <strong>Wet App</strong> to forecast tomorrow with smart digital solutions</h1>`,
      categories: [
        "Digital Transformation",
        "Data Strategy",
        "E-Commerce",
        "Innovation",
      ],
      details: `
        <h3>The <strong>Wet App</span> pushed weather forecasting into the digital future.</h3>
        <h3>We integrated <strong>data-driven insights</span> with user-centric design for maximum adoption.</h3>
        <h3>Our <strong>goal-focused execution</span> delivered accurate forecasts and sustainable user engagement.</h3>
        <h3>This app embodies <strong>innovation meeting necessity</span>, where data guides everyday life.</h3>
      `,
    },
    {
      imgSrc: "/work/cards/faces.jpg",
      title: `<h1>How we showcased <strong>Faces of the World</strong> to tell stories beyond borders</h1>`,
      categories: ["Digital Marketing", "Innovation"],
      details: `
        <h3><strong>Faces of the World</span> was more than an exhibition—it was a global conversation.</h3>
        <h3>We applied <strong>strategic frameworks</span> to amplify cultural stories and connect diverse audiences.</h3>
        <h3>Our <strong>RESI collaboration</span> brought together teams across continents.</h3>
        <h3>The exhibition created <strong>lasting digital and cultural impact</span>, building bridges across borders.</h3>
      `,
    },
  ];
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
        works={works}
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
        works={works}
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
