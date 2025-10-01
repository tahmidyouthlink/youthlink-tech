import { useState, useRef, useEffect } from "react";
import styles from "@/app/(withLayout)/our-work/styles.module.css";

export default function WorkStory({ gsap, useGSAP, ScrollTrigger }) {
  const services = [
    {
      heading: "Define",
      description:
        "Understanding your goals, challenges, and path to lasting success.",
      options: [
        {
          heading: "Digital Strategy",
          details: `
          <h3>We help you make <strong>strategic digital choices</strong> that unlock long-term value and business success. Our team stays focused on your needs.</h3>
          <h3>Using proven methods like <strong>BHAG and OGSM</strong>, we deliver measurable outcomes that drive growth. Goals guide our every move.</h3>
          <h3>With our <strong>RESI approach</strong>, we align teams and guide your organization toward sustainable results. Success requires strong collaboration.</h3>
        `,
        },
        {
          heading: "Platform Consulting",
          details: `
          <h3>We modernize your digital environment to be <strong>scalable, efficient, and future-ready</strong>. Technology drives your growth.</h3>
          <h3>Our consulting services reduce <strong>complexity and platform costs</strong> while boosting performance. Efficiency is our priority.</h3>
          <h3>With 23+ years of experience, we <strong>strategically blend legacy systems</strong> with modern technology. Experience delivers smart solutions.</h3>
        `,
        },
        {
          heading: "AI Consulting",
          details: `
          <h3>We guide you through <strong>AI integration</strong> to unlock automation, personalization, and smarter decisions. AI transforms your business.</h3>
          <h3>Our focus is on <strong>business value and operational efficiency</strong> using cutting-edge AI models. Innovation leads the way.</h3>
          <h3>Stay ahead of the curve with <strong>expert AI consulting</strong> tailored to your goals. We keep you competitive.</h3>
        `,
        },
      ],
    },
    {
      heading: "Experience",
      description:
        "Bring your brand to life and create memorable digital experiences at scale.",
      options: [
        {
          heading: "Customer Centric Design",
          details: `
          <h3>Designing around the <strong>customer journey</strong> leads to higher engagement and loyalty. Customers always come first.</h3>
          <h3>We identify pain points through <strong>data and interviews</strong> and design seamless digital experiences. Listening is key to success.</h3>
          <h3>Boost conversion and growth with our <strong>customer-first approach</strong> to design. We build lasting relationships.</h3>
        `,
        },
        {
          heading: "Brand Driven Design",
          details: `
          <h3>We build <strong>distinctive digital identities</strong> that capture your brand essence. Your brand tells a story.</h3>
          <h3>Using insights and data, we <strong>differentiate your brand</strong> in a crowded digital landscape. Stand out from the crowd.</h3>
          <h3>Every design choice supports <strong>strategic positioning and user impact</strong>. Strategy drives design decisions.</h3>
        `,
        },
        {
          heading: "Creative Development",
          details: `
          <h3>We deliver <strong>scalable front-end solutions</strong> that maintain brand consistency across channels. Consistency builds trust.</h3>
          <h3>With composable design and headless tools, we ensure <strong>future-proof user experiences</strong>. Future-ready is essential.</h3>
          <h3>Our approach combines <strong>creativity and technology</strong> to support conversion-driven growth. Innovation meets art.</h3>
        `,
        },
      ],
    },
    {
      heading: "Deploy",
      description: "Building and managing digital tools to grow your business.",
      options: [
        {
          heading: "Ecommerce",
          details: `
          <h3>We empower businesses with <strong>custom eCommerce strategies</strong> for growth and performance. Growth is our mission.</h3>
          <h3>From platform selection to SEO, we build <strong>user-centric shopping experiences</strong>. User focus drives results.</h3>
          <h3>Our technology-agnostic approach ensures <strong>flexibility and future-readiness</strong>. Adaptability is the key.</h3>
        `,
        },
        {
          heading: "PIM / Master Data Management",
          details: `
          <h3>Gain control over product data with <strong>reliable PIM and MDM systems</strong>. Data is a valuable asset.</h3>
          <h3>We simplify data architecture to enable <strong>efficiency and consistency</strong>. Simplicity drives success.</h3>
          <h3>Our services align your data with <strong>industry standards</strong> and drive better decisions. Standards improve quality.</h3>
        `,
        },
        {
          heading: "AI driven Expert systems",
          details: `
          <h3>Answer complex questions faster with <strong>AI-powered expert systems</strong>. Speed enhances decision-making.</h3>
          <h3>We train models using your data to create <strong>intelligent virtual assistants</strong>. Smart assistants boost efficiency.</h3>
          <h3>Our solutions enhance decision-making and <strong>reduce operational costs</strong>. Efficiency lowers expenses.</h3>
        `,
        },
        {
          heading: "Digital Experience Platforms (CMS)",
          details: `
          <h3>Deliver <strong>personalized experiences</strong> across all customer touchpoints with DXPs. Personalization drives engagement.</h3>
          <h3>We integrate content, analytics, and automation to create <strong>unified digital journeys</strong>. Integration simplifies management.</h3>
          <h3>DXPs help you <strong>make data-driven decisions</strong> that improve engagement and ROI. Data fuels growth.</h3>
        `,
        },
      ],
    },
    {
      heading: "Attract",
      description: "Grow your platform and turn visitors into loyal customers.",
      options: [
        {
          heading: "Search Engine Marketing",
          details: `
          <h3>Improve your visibility with <strong>data-driven SEO and SEA strategies</strong>. Visibility increases opportunities.</h3>
          <h3>We turn your search engine challenges into <strong>competitive strengths</strong>. Strength wins market share.</h3>
          <h3>Our SEM services drive <strong>sustainable traffic and conversion growth</strong>. Sustainability is essential.</h3>
        `,
        },
        {
          heading: "Conversion Rate Optimisation (CRO)",
          details: `
          <h3>We use <strong>data-driven A/B testing</strong> to improve your conversion rates. Testing drives improvements.</h3>
          <h3>Our CRO experts focus on <strong>continuous optimization and real-time insights</strong>. Insights guide change.</h3>
          <h3>Maximize ROI by <strong>removing friction in user journeys</strong>. Smooth journeys increase sales.</h3>
        `,
        },
        {
          heading: "Performance Marketing Campaigns",
          details: `
          <h3>Launch <strong>high-impact campaigns</strong> on Google, Facebook, Amazon, and more. Impact drives results.</h3>
          <h3>Every action, creative, and strategy is <strong>optimized for measurable performance</strong>. Performance is measured closely.</h3>
          <h3>We combine <strong>engineering and marketing</strong> to scale your results efficiently. Efficiency scales growth.</h3>
        `,
        },
        {
          heading: "Marketplaces",
          details: `
          <h3>Expand your reach with <strong>automated marketplace integrations</strong>. Reach more customers.</h3>
          <h3>We simplify product feed management for <strong>Amazon, eBay, and beyond</strong>. Management made easy.</h3>
          <h3>Boost cross-border growth with <strong>seamless data and inventory syncing</strong>. Syncing saves time.</h3>
        `,
        },
      ],
    },
    {
      heading: "Measure",
      description:
        "Optimize your digital presence by analysing data and providing actionable insights",
      options: [
        {
          heading: "Conversion Rate Optimisation",
          details: `
          <h3>Achieve <strong>measurable growth</strong> through continuous CRO improvement. Growth is always possible.</h3>
          <h3>Analyze user behavior, test ideas, and <strong>optimize digital performance</strong>. Data drives decisions.</h3>
          <h3>Empower your team with <strong>real-time dashboards and actionable insights</strong>. Insights empower success.</h3>
        `,
        },
      ],
    },
  ];
  const [activeOptionIndexes, setActiveOptionIndexes] = useState(
    services.map(() => 0), // initialize with 0 for each service
  );
  const [lottieAnimation, setLottieAnimation] = useState(null);
  const lottieRef = useRef(null);

  useEffect(() => {
    let lottieAnimationInstance;
    let isMounted = true;

    import("lottie-web").then(({ default: lottie }) => {
      if (!isMounted) return;

      lottieAnimationInstance = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/work/lottie/work-connection.json",
      });

      setLottieAnimation(lottieAnimationInstance);
    });

    return () => {
      isMounted = false;
      if (lottieAnimationInstance) lottieAnimationInstance.destroy();
    };
  }, []);

  useGSAP(
    () => {
      if (typeof document !== "undefined" && !!lottieAnimation) {
        const headingElements = document.querySelectorAll("#work-story h3");

        headingElements.forEach((heading) => {
          const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              // Handle normal text (words without extra styling)
              const text = node.textContent || "";
              const fragment = document.createDocumentFragment();

              text.split(" ").forEach((word, index) => {
                const wordSpan = document.createElement("span");
                wordSpan.className = "word-wrapper";

                word.split("").forEach((char) => {
                  const charSpan = document.createElement("span");
                  charSpan.className = "scroll-text";
                  charSpan.textContent = char;
                  wordSpan.appendChild(charSpan);
                });

                fragment.appendChild(wordSpan);

                // Preserve spaces after words
                if (index < text.split(" ").length - 1) {
                  fragment.appendChild(document.createTextNode(" "));
                }
              });

              node.replaceWith(fragment);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              // Handle existing <strong> elements (words with gradient text)
              const element = node;

              const text = element.textContent || "";
              const wordSpan = document.createElement("span");
              wordSpan.className = "gradient word-wrapper scroll-text";

              text.split("").forEach((char) => {
                const charSpan = document.createElement("span");
                charSpan.className = "";
                charSpan.textContent = char;
                wordSpan.appendChild(charSpan);
              });

              element.replaceWith(wordSpan); // Replace original <span> with the wrapped version
            }
          };

          // Process all child nodes of the <h3> element
          Array.from(heading.childNodes).forEach(processNode);
        });

        headingElements.forEach((heading) => {
          const chars = heading.querySelectorAll(".scroll-text");

          gsap.from(chars, {
            scrollTrigger: {
              trigger: chars,
              start: "top 70%",
              end: "top 30%",
              scrub: true,
            },
            opacity: 0.2,
            stagger: 0.1,
          });
        });

        gsap.to(lottieRef.current, {
          scrollTrigger: {
            trigger: "#work-story",
            scrub: true,
            // pin: true,
            start: "top center",
            end: "bottom top",
            onUpdate: (self) => {
              lottieAnimation?.goToAndStop(
                lottieAnimation?.totalFrames * self.progress,
                true,
              );
            },
          },
        });
      }
    },
    { dependencies: [gsap, lottieAnimation, activeOptionIndexes] },
  );

  return (
    <div id="work-story" className={`${styles.story} relative mt-20 min-h-dvh`}>
      <div
        ref={lottieRef}
        className="sticky left-0 top-0 h-dvh w-full opacity-20"
      ></div>
      <div className="story-texts relative -mt-[100dvh] flex min-h-full flex-col items-end justify-center gap-[25dvw] px-5 py-32 sm:px-8 lg:px-12 xl:mx-auto xl:max-w-[1200px] xl:px-0">
        {services.map((service, serviceIndex) => {
          const activeIndex = activeOptionIndexes[serviceIndex];

          return (
            <div key={serviceIndex}>
              <div className="relative flex h-full justify-center bg-cover pb-20 text-neutral-600 xl:pt-36">
                <div className="z-[1] max-w-full gap-x-32 space-y-28 px-5 sm:px-8 lg:px-12 xl:mx-auto xl:flex xl:max-w-[1200px] xl:space-y-0 xl:px-0">
                  <section className="h-fit space-y-11 sm:mr-32 md:mr-52 lg:mr-0 lg:w-2/3 xl:sticky xl:top-40 xl:w-[420px]">
                    <div className="space-y-2">
                      <h2 className="text-4xl font-semibold max-xl:line-clamp-2 sm:text-5xl">
                        {service.heading}
                      </h2>
                      <p className="text-lg text-neutral-500 max-xl:line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                    <div className="space-y-4 text-neutral-400">
                      {service.options.map((option, optionIndex) => {
                        return (
                          <div
                            key={optionIndex}
                            className={`flex h-16 max-w-96 cursor-pointer items-center rounded-md border-2 bg-white/10 px-5 backdrop-blur-xl transition-[border-color] duration-400 ease-in-out ${optionIndex === activeIndex ? "border-orange-300 text-neutral-600" : "border-neutral-200 hover:border-orange-300 hover:text-neutral-600"}`}
                            onClick={() => {
                              // Update active option index for this service only
                              setActiveOptionIndexes((prev) => {
                                const newIndexes = [...prev];
                                newIndexes[serviceIndex] = optionIndex;
                                return newIndexes;
                              });
                            }}
                          >
                            <h4 className="text-xl font-bold transition-[color] duration-400 ease-in-out">
                              {option.heading}
                            </h4>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                  <section
                    className="services-details relative flex min-h-full flex-col gap-[40lvh] sm:ml-32 md:ml-52 lg:ml-72 xl:ml-0 xl:w-3/5 xl:items-end xl:justify-center xl:gap-[80lvh]"
                    dangerouslySetInnerHTML={{
                      __html: service.options[activeIndex]?.details,
                    }}
                  ></section>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
