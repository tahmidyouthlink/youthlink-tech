import Link from "next/link";

export default function WorkDetails({ gsap, useGSAP, selectedOption }) {
  useGSAP(
    () => {
      if (selectedOption.label === "details") {
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
          .from("#work-details-inside-wrapper h1", { autoAlpha: 0, x: -50 })
          .from(
            "#work-details-inside-wrapper p",
            { autoAlpha: 0, x: -50 },
            "<0.25",
          )
          .from("#work-details-inside-wrapper a", { autoAlpha: 0, x: 50 })
          .from(
            "#work-details-inside-wrapper button",
            { autoAlpha: 0, x: 50 },
            "<0.15",
          )
          .from("#works-details-quotes h3", { autoAlpha: 0, x: -50 });

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
      }
    },
    { dependencies: [gsap, selectedOption] },
  );

  return (
    <div
      id="work-details"
      className="pointer-events-none hidden min-h-dvh w-fit items-center justify-center px-5 pb-20 pt-[92px] text-white sm:px-8 lg:px-12 xl:mx-auto xl:max-w-[1200px] xl:px-0"
    >
      <div id="work-details-outside-wrapper" className="w-full">
        <div
          id="work-details-inside-wrapper"
          className="relative z-[1] max-w-full gap-x-16 space-y-24 px-5 sm:px-8 lg:px-12 xl:mx-auto xl:grid xl:max-w-[1200px] xl:grid-cols-5 xl:space-y-0 xl:px-0"
        >
          <section className="invisible sm:ml-32 md:ml-52 lg:ml-72 xl:col-span-3 xl:ml-0 xl:w-auto">
            <div className="flex min-h-[calc(100dvh-92px)] flex-col justify-around">
              <h1 className="text-4xl font-semibold uppercase text-neutral-700 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] xl:text-5xl/[1.25]">
                How we&apos;ve initiated{" "}
                <span className="bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500))] bg-clip-text text-transparent">
                  our country&apos;s first
                </span>{" "}
                fashion e-commerce business
              </h1>
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
                    Let&apos;s start a project
                  </Link>
                  <button className="rounded-full px-5 py-2.5 text-sm font-medium text-neutral-600 ring-2 ring-orange-400">
                    View all work
                  </button>
                </div>
              </div>
            </div>
            <div
              id="works-details-quotes"
              className="flex flex-col gap-y-[40dvw] [&_h3:first-child]:mt-[10dvw]"
              dangerouslySetInnerHTML={{
                __html: `<h3>We help you make <span class="gradient">strategic digital choices</span> that unlock long-term value and business success. Our team stays focused on your needs.</h3>
              <h3>Using proven methods like <span class="gradient">BHAG and OGSM</span>, we deliver measurable outcomes that drive growth. Goals guide our every move.</h3>
              <h3>With our <span class="gradient">RESI approach</span>, we align teams and guide your organization toward sustainable results. Success requires strong collaboration.</h3>
              <h3>We help you make <span class="gradient">strategic digital choices</span> that unlock long-term value and business success. Our team stays focused on your needs.</h3>
              <h3>Using proven methods like <span class="gradient">BHAG and OGSM</span>, we deliver measurable outcomes that drive growth. Goals guide our every move.</h3>
              <h3>With our <span class="gradient">RESI approach</span>, we align teams and guide your organization toward sustainable results. Success requires strong collaboration.</h3>
              <h3>We help you make <span class="gradient">strategic digital choices</span> that unlock long-term value and business success. Our team stays focused on your needs.</h3>
              <h3>Using proven methods like <span class="gradient">BHAG and OGSM</span>, we deliver measurable outcomes that drive growth. Goals guide our every move.</h3>
              <h3>With our <span class="gradient">RESI approach</span>, we align teams and guide your organization toward sustainable results. Success requires strong collaboration.</h3>`,
              }}
            />
          </section>
          <section
            id="work-details-cover"
            className="h-[calc(100dvh-92px-80px)] sm:mr-32 md:mr-52 lg:mr-0 lg:w-2/3 xl:sticky xl:bottom-0 xl:top-[92px] xl:col-span-2 xl:w-auto"
          ></section>
        </div>
      </div>
    </div>
  );
}
