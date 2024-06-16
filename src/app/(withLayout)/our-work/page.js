"use client";

import { useEffect, useState } from "react";
import useWorks from "@/hooks/useWorks";
import Loading from "@/components/shared/Loading/Loading";
import CardsAndDetailsLayout from "@/components/shared/CardsAndDetailsLayout";
import CardsSection from "@/components/shared/CardsSection";

export default function OurWork() {
  const [allWork, isWorkDataLoading = isWork] = useWorks();
  const [filteredWork, setFilteredWork] = useState(null);
  const categories = [
    "All",
    "Digital Marketing",
    "E-Commerce",
    "Data Strategy",
    "Digital Transformation",
    "Content Management",
    "Experience Design",
  ];
  const ACTIVE_SLIDE_INDEX = 0;

  useEffect(() => {
    !isWorkDataLoading && setFilteredWork(allWork);
  }, [isWorkDataLoading, allWork]);

  if (isWorkDataLoading) return <Loading />;

  return (
    <CardsAndDetailsLayout
      itemToDisplay={
        !!filteredWork?.length ? filteredWork[ACTIVE_SLIDE_INDEX] : undefined
      }
      pageType="cards"
    >
      {/* Cards section */}
      <CardsSection
        items={filteredWork}
        setItems={setFilteredWork}
        hasCategories={true}
        categories={categories}
        activeSlideIndex={ACTIVE_SLIDE_INDEX}
        unfilteredItems={allWork}
      />
    </CardsAndDetailsLayout>
  );
}
