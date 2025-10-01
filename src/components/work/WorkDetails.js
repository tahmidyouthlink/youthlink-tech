import { useState } from "react";
import Link from "next/link";

export default function WorkDetails({
  gsap,
  useGSAP,
  selectedOption,
  setSelectedOption,
}) {
  const [isViewAllClicked, setIsViewAllClicked] = useState(false);

  useGSAP(
    () => {
      if (isViewAllClicked) {
        gsap.to(
          "#work-details-inside-wrapper h1, #work-details-inside-wrapper p, #work-details-inside-wrapper a, #work-details-inside-wrapper button, #works-details-quotes h3",
          {
            y: -50,
            autoAlpha: 0,
            stagger: { amount: 0.5 },
          },
        );
        gsap.to("#work-details-cover img", {
          scale: 0.9,
          autoAlpha: 0,
          onComplete: () => {
            gsap.set("#work-samples", { display: "flex" });
            const detailsImg = document.querySelector(
              "#work-details-cover img",
            );
            const imgCardElement = document.querySelector(
              "#work-samples .samples-container .sample-card:not(:has(img)) div:first-child",
            );
            imgCardElement.appendChild(detailsImg);

            const appendedEl = imgCardElement.querySelector("img");
            appendedEl.style.position = "absolute";
            appendedEl.style.height = "100%";

            gsap.set("#work-details", { display: "none" });
            gsap.set("#work-samples .samples-container", { autoAlpha: 0 });
            gsap.set("#work-samples .samples-container .sample-card", {
              autoAlpha: 1,
            });
            setSelectedOption("samples");
            setIsViewAllClicked(false);
          },
        });
      } else if (selectedOption.label === "details") {
        const tl = gsap.timeline({
          delay: 0.5,
          scrollTrigger: {
            trigger: "#work-details",
            start: `top center`,
            end: `bottom top`,
            once: true,
          },
          defaults: { duration: 0.5, ease: "power1.inOut" },
        });

        tl.set("#work-details", { pointerEvents: "auto" })
          .set("#work-details-inside-wrapper section:first-child", {
            autoAlpha: 1,
          })
          .set("#work-hero", { display: "none" })
          .set("#work-samples", { display: "none" })
          .fromTo(
            "#work-details-inside-wrapper h1",
            { autoAlpha: 0, x: -50 },
            { autoAlpha: 1, x: 0 },
          )
          .fromTo(
            "#work-details-inside-wrapper p",
            { autoAlpha: 0, x: -50 },
            { autoAlpha: 1, x: 0 },
            "<0.25",
          )
          .fromTo(
            "#work-details-inside-wrapper a",
            { autoAlpha: 0, x: 50 },
            { autoAlpha: 1, x: 0 },
          )
          .fromTo(
            "#work-details-inside-wrapper button",
            { autoAlpha: 0, x: 50 },
            { autoAlpha: 1, x: 0 },
            "<0.15",
          )
          .fromTo(
            "#works-details-quotes h3",
            { autoAlpha: 0, x: -50 },
            { autoAlpha: 1, x: 0 },
          );

        const headingElements = document.querySelectorAll(
          "#works-details-quotes h3",
        );

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
      }
    },
    { dependencies: [gsap, isViewAllClicked, selectedOption] },
  );

  return (
    <div
      id="work-details"
      className="pointer-events-none hidden min-h-lvh w-fit items-center justify-center px-5 pb-20 pt-[92px] text-white sm:px-8 lg:px-12 xl:mx-auto xl:max-w-[1200px] xl:px-0"
    >
      <div id="work-details-outside-wrapper" className="w-full">
        <div
          id="work-details-inside-wrapper"
          className="relative z-[1] flex max-w-full flex-col gap-y-10 lg:grid lg:grid-cols-2 lg:gap-x-16 xl:grid-cols-5"
        >
          <section className="invisible lg:col-span-1 lg:w-auto xl:col-span-3">
            <div className="min-h-[calc(100lvh-40lvh-92px-40px)] max-lg:space-y-16 sm:min-h-[calc(100lvh-50lvh-92px-40px)] lg:flex lg:min-h-[calc(100lvh-92px)] lg:flex-col lg:justify-center lg:max-xl:gap-y-40 xl:justify-around">
              <div
                className="gradient-text text-xl font-semibold uppercase text-neutral-700 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] sm:text-4xl xl:text-5xl/[1.25]"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedOption.work?.title || "Title for the selected work",
                }}
              />
              <div className="space-y-5">
                <p>
                  Become a part of our journey. Let&apos;s conquer the world
                  together.
                </p>
                <div className="flex items-center gap-2.5">
                  <Link
                    href="/contact-us"
                    className="rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] px-5 py-2.5 text-sm font-medium text-white transition-[background-position] duration-700 ease-in-out hover:bg-[235%_100%]"
                  >
                    Let&apos;s start{" "}
                    <span className="max-sm:hidden">a project</span>
                  </Link>
                  <button
                    onClick={() => setIsViewAllClicked(true)}
                    className="rounded-full px-5 py-2.5 text-sm font-medium text-neutral-600 ring-2 ring-orange-400"
                  >
                    View all work
                  </button>
                </div>
              </div>
            </div>
            <div
              id="works-details-quotes"
              className="flex min-h-[33.33lvh] flex-col gap-y-[55lvh] [&_h3:first-child]:mt-[10dvw]"
              dangerouslySetInnerHTML={{
                __html: selectedOption.work?.details,
              }}
            />
          </section>
          <section
            id="work-details-cover"
            className="max-lg:order-first lg:sticky lg:top-1/2 lg:col-span-1 lg:h-[50lvh] lg:w-auto lg:max-xl:-translate-y-1/2 xl:bottom-0 xl:top-[92px] xl:col-span-2 xl:h-[calc(100lvh-92px-80px)]"
          ></section>
        </div>
      </div>
    </div>
  );
}
