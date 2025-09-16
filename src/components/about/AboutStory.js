import { useState, useRef, useEffect } from "react";

export default function AboutStory({ gsap, useGSAP, ScrollTrigger }) {
  const quotes = [
    '<h3>We help you make <span class="gradient">strategic digital choices</span> that unlock long-term value and business success. Our team stays focused on your needs.</h3>',
    '<h3>Using proven methods like <span class="gradient">BHAG and OGSM</span>, we deliver measurable outcomes that drive growth. Goals guide our every move.</h3>',
    '<h3>With our <span class="gradient">RESI approach</span>, we align teams and guide your organization toward sustainable results. Success requires strong collaboration.</h3>',
    '<h3>We modernize your digital environment to be <span class="gradient">scalable, efficient, and future-ready</span>. Technology drives your growth.</h3>',
    '<h3>Our consulting services reduce <span class="gradient">complexity and platform costs</span> while boosting performance. Efficiency is our priority.</h3>',
    '<h3>With 23+ years of experience, we <span class="gradient">strategically blend legacy systems</span> with modern technology. Experience delivers smart solutions.</h3>',
    '<h3>We guide you through <span class="gradient">AI integration</span> to unlock automation, personalization, and smarter decisions. AI transforms your business.</h3>',
    '<h3>Our focus is on <span class="gradient">business value and operational efficiency</span> using cutting-edge AI models. Innovation leads the way.</h3>',
  ];
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
        path: "/about/group-meeting.json",
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
        const headingElements = document.querySelectorAll("#about-story h3");

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
              // Handle existing <span> elements (words with gradient text)
              const element = node;
              const originalClass = element.className;

              const text = element.textContent || "";
              const wordSpan = document.createElement("span");
              wordSpan.className = `${originalClass} word-wrapper scroll-text`; // Keep gradient styling

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
            trigger: "#about-story",
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
    { dependencies: [gsap, lottieAnimation] },
  );

  return (
    <div id="about-story" className="relative mt-20 min-h-dvh pb-20">
      <div
        ref={lottieRef}
        className="sticky left-0 top-0 h-dvh w-full opacity-20"
      ></div>
      <section className="relative -mt-[100dvh] min-h-full space-y-[90dvw] px-5 py-32 sm:space-y-[75dvw] sm:px-8 lg:space-y-[70dvw] lg:px-12 xl:mx-auto xl:max-w-[1200px] xl:space-y-[25dvw] xl:px-0">
        {quotes.map((quote, quoteIndex) => (
          <div
            key={quoteIndex}
            className={`gradient-texts-wrapper text-2xl font-semibold text-neutral-600 sm:text-3xl lg:text-4xl [&_h3>span.gradient]:bg-[linear-gradient(to_right,theme(colors.orange.500),theme(colors.yellow.400))] [&_h3>span.gradient]:bg-clip-text [&_h3>span.gradient]:text-transparent [&_h3]:w-[90%] [&_h3]:sm:w-3/4 ${quoteIndex % 2 === 0 ? "[&_h3]:ml-auto" : "[&_h3]:mr-auto"}`}
            dangerouslySetInnerHTML={{
              __html: quote,
            }}
          />
        ))}
      </section>
    </div>
  );
}
