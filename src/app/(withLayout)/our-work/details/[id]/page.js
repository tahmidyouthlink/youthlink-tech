"use client";

import useWorks from "@/hooks/useWorks";
import Loading from "@/components/shared/Loading/Loading";
import CardsAndDetailsLayout from "@/components/shared/CardsAndDetailsLayout";
import DetailsSection from "@/components/shared/DetailsSection";

export default function workDetails({ params }) {
  const [allWork, isWorkDataLoading = isWork] = useWorks();
  const workDetails = allWork?.find((work) => work._id === params.id);

  if (isWorkDataLoading && !workDetails) return <Loading />;

  return (
    <CardsAndDetailsLayout itemToDisplay={workDetails} pageType="details">
      {/* Work details section */}
      <DetailsSection
        itemDetails={[
          {
            heading: "About the Project",
            description: workDetails.aboutTheProject,
          },
          { heading: "Our Solution", description: workDetails.ourSolution },
          { heading: "The Results", description: workDetails.theResults },
        ]}
      />
    </CardsAndDetailsLayout>
  );
}
