import Link from "next/link";

export default function About() {
  return (
    <main className="relative bg-[linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65)),url(https://images.unsplash.com/photo-1459231978203-b7d0c47a2cb7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] min-h-screen bg-cover 2xl:pt-0 xl:pb-8 pb-0 md:pb-12 lg:pb-0 pt-32 bg-fixed text-[#f7f7f7]">
      <div className="z-[1] max-w-full gap-x-16 space-y-7 px-5 sm:px-8 lg:px-12 xl:mx-auto xl:flex xl:max-w-[1200px] xl:space-y-0 xl:px-0 min-h-screen justify-center items-center">
        <section className="flex min-h-full items-center justify-center sm:mr-32 md:mr-52 lg:mr-0 lg:w-2/3 xl:w-1/2">
          <h2 className="mt-3 text-4xl font-bold max-xl:line-clamp-2 sm:text-6xl xl:text-7xl">
            About YouthLink
          </h2>
        </section>
        <section className="item-details relative space-y-12 sm:ml-32 md:ml-52 lg:ml-72 xl:ml-0 xl:w-3/5 xl:bg-black/50">
          <div className="space-y-4">
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
          <div className="flex justify-center items-center">
            <Link className="w-fit mb-3 rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[opacity,transform,background-position] delay-75 duration-700 ease-in-out hover:bg-[50%_100%]" href={"/our-work"}>Learn more</Link>
          </div>
          <div className="absolute -top-6 left-0 right-0 !m-0 hidden h-6 w-full bg-black/50 xl:block" />
          <div className="absolute -bottom-6 left-0 right-0 !m-0 hidden h-6 w-full bg-black/50 xl:block" />
          <div className="absolute -bottom-6 -right-20 -top-6 !m-0 hidden w-20 bg-gradient-to-r from-black/50 to-transparent xl:block" />
          <div className="absolute -bottom-6 -left-20 -top-6 !m-0 hidden w-20 bg-gradient-to-l from-black/50 to-transparent xl:block" />
        </section>
      </div>
      {/* <div className="z-[1] mt-20 flex max-w-full flex-col gap-y-7 px-5 sm:px-8 md:mt-24 lg:px-12 xl:mx-auto xl:mt-32 xl:max-w-[1200px] xl:flex-row xl:gap-x-16 xl:gap-y-0 xl:px-0">
        <section className="item-details relative order-1 space-y-12 sm:mr-32 md:mr-52 lg:mr-72 xl:mr-0 xl:w-3/5 xl:bg-black/50">
          <div className="space-y-4">
            <p>
              We&apos;re a team that&apos;s obsessed with creating impactful
              moments - from revolutionary digital campaigns to seamless user
              experiences, from brainstorming sessions to breakthrough
              solutions. Whether we&apos;re coding in the office, strategizing
              with clients, or collaborating remotely to bring your vision to
              life, we thrive on inspiring others to see a world full of digital
              potential.
            </p>
            <p>
              Learn more about some of our team members below, as well as the
              variety of charitable causes that we support to help bridge the
              digital divide and empower underserved communities.
            </p>
          </div>
          <div className="absolute -top-6 left-0 right-0 !m-0 hidden h-6 w-full bg-black/50 xl:block" />
          <div className="absolute -bottom-6 left-0 right-0 !m-0 hidden h-6 w-full bg-black/50 xl:block" />
          <div className="absolute -bottom-6 -right-20 -top-6 !m-0 hidden w-20 bg-gradient-to-r from-black/50 to-transparent xl:block" />
          <div className="absolute -bottom-6 -left-20 -top-6 !m-0 hidden w-20 bg-gradient-to-l from-black/50 to-transparent xl:block" />
        </section>
        <section className="flex min-h-full items-center justify-center sm:ml-32 sm:justify-end md:ml-52 lg:ml-0 xl:order-2 xl:w-1/2">
          <h2 className="mt-3 text-4xl font-bold max-xl:line-clamp-2 sm:text-right sm:text-6xl md:text-7xl">
            About the Team
          </h2>
        </section>
      </div> */}
    </main>
  );
}