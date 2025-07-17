import Link from "next/link";

export default function About() {
  return (
    <main className="relative bg-neutral-100">
      <div className="z-[1] min-h-dvh max-w-full items-center justify-center gap-x-16 space-y-7 px-5 pb-0 pt-[72px] sm:px-8 sm:pt-[80px] md:pb-12 md:pt-[84px] lg:px-12 lg:pb-0 lg:pt-[92px] xl:mx-auto xl:flex xl:max-w-[1200px] xl:space-y-0 xl:px-0 xl:pb-8">
        <section className="flex min-h-full items-center justify-center sm:mr-32 md:mr-52 lg:mr-0 lg:w-2/3 xl:w-1/2">
          <h2 className="mt-3 text-4xl font-bold text-neutral-700 max-xl:line-clamp-2 sm:text-6xl xl:text-7xl">
            About YouthLink
          </h2>
        </section>
        <section className="item-details relative sm:ml-32 md:ml-52 lg:ml-72 xl:ml-0 xl:w-3/5">
          <div className="space-y-4 text-justify">
            <p>
              YouthLink Tech is a dynamic digital agency that has been
              redefining the digital landscape since 2012. Forbes magazine
              recognized us as &quot;one of the most innovative digital agencies
              in the industry.&quot; But you can simply call us YouthLink Tech.
              We&apos;re not here to feed the hype; we&apos;re here to deliver
              cutting-edge digital solutions to those who demand excellence.
            </p>
            <p>
              Founded by visionary entrepreneur Alex Chen, YouthLink Tech
              launched its first project in San Francisco&apos;s vibrant tech
              scene and quickly earned a loyal following.
            </p>
            <p>
              Recently featured in TechCrunch&apos;s spotlight series, Chen is
              renowned for merging his extensive tech expertise with his passion
              for creative problem-solving, leveraging state-of-the-art
              technology, and focusing on user-centric design. Our services
              include comprehensive digital marketing, bespoke web and app
              development, innovative branding strategies, and more.
            </p>
            <p>
              At YouthLink Tech, we believe in the transformative power of
              exceptional digital experiences. We consider every project, big or
              small, to be an opportunity to celebrate innovation and
              excellence. We hope you&apos;ll agree.
            </p>
          </div>
          <Link
            className="mx-auto mt-12 block w-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] px-5 py-2.5 text-sm font-medium text-white transition-[opacity,transform,background-position] delay-75 duration-700 ease-in-out hover:bg-[235%_100%]"
            href={"/our-work"}
          >
            Learn more
          </Link>
        </section>
      </div>
    </main>
  );
}
