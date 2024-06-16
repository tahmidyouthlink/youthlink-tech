"use client";

import { useRouter, usePathname } from "next/navigation";

export default function CardsAndDetailsLayout({
  itemToDisplay,
  pageType,
  children,
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <main
      className={`relative flex min-h-dvh items-center justify-center bg-cover pt-40 text-[#f7f7f7] ${pageType === "cards" ? "overflow-hidden pb-12" : "pb-20"}`}
      style={{
        backgroundImage: itemToDisplay
          ? `linear-gradient(rgba(0,0,0,${pageType === "cards" ? 0.6 : 0.7}), rgba(0,0,0,${pageType === "cards" ? 0.6 : 0.7})), url(${itemToDisplay.imageURL})`
          : "none",
      }}
    >
      {/* Page heading */}
      <h1 className="fixed -left-4 bottom-12 w-20 text-[160px]/[135px] font-bold text-[#F7F7F7]/20">
        {pathname.startsWith("/our-work") ? "Our Work" : "Industries"}
      </h1>
      {/* Mesh gradient on top-left with slight dark overlay */}
      <div className="absolute left-0 top-0 h-[50dvh] w-[33vw] bg-gradient-to-br from-black/55 via-transparent to-transparent">
        <div className="m-10 size-24 rounded-full bg-[#0F6545] blur-2xl sm:size-36 sm:blur-3xl lg:m-14 lg:size-44 lg:blur-[80px] xl:m-12 xl:blur-3xl 2xl:ml-52 2xl:mt-14 2xl:size-40" />
      </div>
      {/* Active card info section */}
      <div className="z-[1] max-w-full gap-x-16 space-y-24 px-5 sm:px-8 lg:px-12 xl:mx-auto xl:flex xl:max-w-[1200px] xl:space-y-0 xl:px-0">
        <section className="h-fit sm:mr-32 md:mr-52 lg:mr-0 lg:w-2/3 xl:sticky xl:top-40 xl:w-[420px]">
          {/* Categories of the work */}
          {itemToDisplay && itemToDisplay?.category && (
            <div className="flex flex-wrap gap-2 [&>div]:rounded-full [&>div]:bg-[#ededed]/60 [&>div]:px-2.5 [&>div]:py-1.5 [&>div]:text-[#272727]">
              {itemToDisplay.category.map((cat) => {
                return <div key={cat.label}>{cat.value}</div>;
              })}
            </div>
          )}
          {/* Work heading */}
          <h2 className="mt-3 text-2xl font-medium max-xl:line-clamp-2 sm:text-3xl">
            {itemToDisplay?.heading || "No work Found"}
          </h2>
          {itemToDisplay?.description && (
            <p className="mt-1.5 text-lg text-neutral-300 max-xl:line-clamp-3">
              {itemToDisplay.description}
            </p>
          )}
          {/* All works button */}
          {itemToDisplay && (
            <button
              className="mt-8 w-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%] sm:mt-12"
              onClick={() =>
                router.push(
                  pageType === "details"
                    ? pathname.split("/").slice(0, 2).join("/")
                    : `${pathname}/details/${itemToDisplay._id}`,
                )
              }
            >
              {pageType === "cards" ? "Learn more" : "Show all work"}
            </button>
          )}
        </section>
        {/* Cards/work details section */}
        {children}
      </div>
    </main>
  );
}
