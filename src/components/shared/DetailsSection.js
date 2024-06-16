import dynamic from "next/dynamic";

const MarkdownPreview = dynamic(
  () => import("@/utils/Markdown/MarkdownPreview/MarkdownPreview"),
  { ssr: false },
);

export default function DetailsSection({ itemDetails }) {
  return (
    <section className="item-details relative space-y-12 sm:ml-32 md:ml-52 lg:ml-72 xl:ml-0 xl:w-3/5 xl:bg-black/50">
      {itemDetails.map((details) => {
        return (
          <div className="space-y-5">
            <h3>{details.heading}</h3>
            <MarkdownPreview content={details.description} />
          </div>
        );
      })}
      {/* Dark shade-overlays on each side of the container */}
      <div className="absolute -top-6 left-0 right-0 !m-0 hidden h-6 w-full bg-black/50 xl:block" />
      <div className="absolute -bottom-6 left-0 right-0 !m-0 hidden h-6 w-full bg-black/50 xl:block" />
      <div className="absolute -bottom-6 -right-20 -top-6 !m-0 hidden w-20 bg-gradient-to-r from-black/50 to-transparent xl:block" />
      <div className="absolute -bottom-6 -left-20 -top-6 !m-0 hidden w-20 bg-gradient-to-l from-black/50 to-transparent xl:block" />
    </section>
  );
}
