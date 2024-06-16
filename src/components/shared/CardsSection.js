import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

export default function CardsSection({
  items,
  setItems,
  activeSlideIndex,
  hasCategories,
  categories,
  unfilteredItems,
}) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <section className="relative space-y-12 sm:ml-32 md:ml-52 lg:ml-72 xl:ml-0 xl:w-3/5">
      {/* Cards gallery */}
      <div className="flex min-h-[325px] shrink-0 gap-x-3 md:gap-x-4 xl:gap-x-5">
        {items?.map((item, itemIndex) => {
          return (
            itemIndex !== activeSlideIndex && (
              <div
                key={item._id}
                className="relative min-h-64 min-w-48 cursor-pointer overflow-hidden rounded-[20px] lg:min-h-[325px] lg:min-w-[240px] [&>div]:hover:bg-black/35 [&>h3]:hover:opacity-100"
                onClick={() => {
                  setItems((prevItems) => [
                    ...prevItems.slice(itemIndex),
                    ...prevItems.slice(0, itemIndex),
                  ]);
                }}
              >
                <Image
                  className="object-cover"
                  src={item.imageURL}
                  alt={item.heading}
                  fill
                  sizes={itemIndex === activeSlideIndex ? "100vw" : "1080px"}
                />
                <div className="absolute inset-0 bg-black/0 transition-[background-color] duration-500 ease-in-out" />
                <h3 className="absolute bottom-4 left-3 right-3 line-clamp-2 text-lg font-medium opacity-0 transition-[opacity] duration-500 ease-in-out">
                  {item.heading}
                </h3>
              </div>
            )
          );
        })}
        {/* Left navigation button */}
        <div
          className={`"opacity-1 [&>*]:hover:text-[#272727]" absolute -left-0 top-[162.5px] flex size-[74px] -translate-y-1/2 items-center justify-center rounded-full bg-[#d5d5d5]/10 ring-1 ring-white/50 backdrop-blur-xl transition-[background-color,opacity] duration-500 ease-in-out sm:-translate-x-1/2 ${items?.length < 2 ? "opcaity-50 cursor-not-allowed" : "cursor-pointer hover:bg-white [&>*]:hover:text-[#272727]"}`}
          onClick={() => {
            items?.length &&
              setItems((prevItems) => [
                prevItems[prevItems.length - 1],
                ...prevItems.slice(0, prevItems.length - 1),
              ]);
          }}
        >
          <FaChevronLeft className="h-5 object-contain text-[#d4d4d4] transition-[color] duration-500 ease-in-out" />
        </div>
        {/* Right navigation button */}
        <div
          className={`"opacity-1 [&>*]:hover:text-[#272727]" absolute -right-0 top-[162.5px] flex size-[74px] -translate-y-1/2 items-center justify-center rounded-full bg-[#d5d5d5]/10 ring-1 ring-white/50 backdrop-blur-xl transition-[background-color,opacity] duration-500 ease-in-out xl:translate-x-1/2 ${items?.length < 2 ? "opcaity-50 cursor-not-allowed" : "cursor-pointer hover:bg-white [&>*]:hover:text-[#272727]"}`}
          onClick={() => {
            items?.length &&
              setItems((prevItems) => [...prevItems.slice(1), prevItems[0]]);
          }}
        >
          <FaChevronRight className="h-5 object-contain text-[#d4d4d4] transition-[color] duration-500 ease-in-out" />
        </div>
      </div>
      {/* Categories list */}
      {hasCategories && (
        <div className="flex flex-wrap gap-3">
          {categories.map((category, categoryIndex) => {
            return (
              <p
                className={`rounded-full ${categoryIndex === activeCategoryIndex ? "bg-[#ededed] text-[#272727]" : "text-[#dedede]"} cursor-pointer select-none bg-[#d5d5d5]/10 px-[18px] py-[9px] text-[13px] ring-1 ring-[#ededed] backdrop-blur-xl transition-[background-color,color] duration-500 ease-in-out hover:bg-white hover:text-[#272727]`}
                key={categoryIndex}
                onClick={() => {
                  if (categoryIndex !== activeCategoryIndex) {
                    setItems(
                      unfilteredItems.filter((item) =>
                        item.category.some(
                          (cat) => cat.value === category || category === "All",
                        ),
                      ),
                    );
                    setActiveCategoryIndex(categoryIndex);
                  }
                }}
              >
                {category}
              </p>
            );
          })}
        </div>
      )}
    </section>
  );
}
