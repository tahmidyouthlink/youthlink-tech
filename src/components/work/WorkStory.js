// import Image from "next/image";
import { useState, useRef, useEffect } from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import lottie from "lottie-web";
import styles from "@/app/(withLayout)/our-work/styles.module.css";

export default function WorkStory({ gsap, useGSAP, ScrollTrigger }) {
  // const [dotLottie, setDotLottie] = useState(null);
  // const [lottieInstance, setLottieInstance] = useState(null);
  // const animationRef = useRef(null);
  const [lottieAnimation, setLottieAnimation] = useState(null);
  const lottieRef = useRef(null);

  console.log("chk lottieAnimation", lottieAnimation);

  useEffect(() => {
    const lottieAnimationInstance = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      // animationData: animationData,
      path: "/work/lottie/work-connection.json",
    });

    setLottieAnimation(lottieAnimationInstance);

    return () => lottieAnimationInstance.destroy();
  }, [setLottieAnimation]);

  useGSAP(
    () => {
      if (typeof document !== "undefined") {
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

        // console.log("chk headingElements", headingElements);

        headingElements.forEach((heading) => {
          const chars = heading.querySelectorAll(".scroll-text");

          console.log("chk chars", chars);

          gsap.from(chars, {
            scrollTrigger: {
              trigger: chars,
              start: "top 70%",
              end: "top 30%",
              scrub: true,
              // markers: true,
            },
            opacity: 0.2,
            stagger: 0.1,
          });
        });

        console.log("chk inside useGSAP", {
          lottieRef,
          lottieAnimation,
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

        // ScrollTrigger.create({
        //   trigger: lottieRef.current,
        //   scrub: true,
        //   // pin: true,
        //   start: "top center",
        //   end: "bottom top",
        //   onUpdate: (self) => {
        //     lottieAnimation?.goToAndStop(
        //       lottieAnimation?.totalFrames * self.progress,
        //       true,
        //     );
        //   },
        // });
      }
    },
    { dependencies: [gsap, lottieAnimation] },
  );

  // console.log("chk dotLottie", dotLottie);

  return (
    <div id="work-story" className={`${styles.story} relative mt-20 min-h-dvh`}>
      {/* <Image
        src="/work/abstracts/top-left-bottom-right.jpg"
        width={0}
        height={0}
        sizes="(max-width: 1280px) 100dvh, 100dvw"
        className="absolute inset-0 h-dvh w-dvw object-cover opacity-20"
      /> */}
      {/* <DotLottieReact
        // onConfigReady={(lottie) => setLottieInstance(lottie)}
        id="work-connection-lottie"
        dotLottieRefCallback={(dotLottieInstance) =>
          setDotLottie(dotLottieInstance)
        }
        className="absolute inset-0 h-dvh w-dvw opacity-20"
        src="/work/lottie/work-connection.lottie"
      /> */}
      {/* <h3 className="absolute left-14 top-10 max-w-xl text-5xl/[1.2] font-semibold text-neutral-600">
              <span className="bg-[linear-gradient(to_right,theme(colors.orange.500),theme(colors.yellow.400))] bg-clip-text text-transparent">
                Empowering
              </span>{" "}
              businesses through digital excellence.
            </h3> */}
      <div
        // id="work-connection-lottie"
        ref={lottieRef}
        className="sticky left-0 top-0 h-dvh w-full opacity-20"
      ></div>
      {/* <div
        // id="work-connection-lottie"
        // ref={lottieRef}
        className="sticky left-0 top-0 h-dvh w-full bg-red-500 opacity-20"
      ></div> */}
      <div className="story-texts relative -mt-[100dvh] flex min-h-full flex-col items-end justify-center gap-[30dvw] px-5 py-32 sm:px-8 lg:px-12 xl:mx-auto xl:max-w-[1200px] xl:px-0">
        <h3 className="max-w-2xl text-3xl font-semibold text-neutral-600">
          Creative solutions that make an{" "}
          <span className="bg-[linear-gradient(to_right,theme(colors.orange.500),theme(colors.yellow.400))] bg-clip-text text-transparent">
            impact
          </span>{" "}
          in the digital space. We{" "}
          <span className="bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500))] bg-clip-text text-transparent">
            design, develop, and optimize
          </span>{" "}
          websites and applications for maximum engagement. Your success is our{" "}
          <span className="bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500))] bg-clip-text text-transparent">
            priority
          </span>{" "}
          , and we deliver results.
        </h3>
        <h3 className="max-w-2xl text-3xl font-semibold text-neutral-600">
          Creative solutions that make an{" "}
          <span className="bg-[linear-gradient(to_right,theme(colors.orange.500),theme(colors.yellow.400))] bg-clip-text text-transparent">
            impact
          </span>{" "}
          in the digital space. We{" "}
          <span className="bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500))] bg-clip-text text-transparent">
            design, develop, and optimize
          </span>{" "}
          websites and applications for maximum engagement. Your success is our{" "}
          <span className="bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500))] bg-clip-text text-transparent">
            priority
          </span>{" "}
          , and we deliver results.
        </h3>
        <h3 className="max-w-2xl text-3xl font-semibold text-neutral-600">
          Creative solutions that make an{" "}
          <span className="bg-[linear-gradient(to_right,theme(colors.orange.500),theme(colors.yellow.400))] bg-clip-text text-transparent">
            impact
          </span>{" "}
          in the digital space. We{" "}
          <span className="bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500))] bg-clip-text text-transparent">
            design, develop, and optimize
          </span>{" "}
          websites and applications for maximum engagement. Your success is our{" "}
          <span className="bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500))] bg-clip-text text-transparent">
            priority
          </span>{" "}
          , and we deliver results.
        </h3>
      </div>
    </div>
  );
}
