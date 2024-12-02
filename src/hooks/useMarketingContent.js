"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMarketingContent = () => {

  const axiosPublic = useAxiosPublic();

  const { data: marketingContentList, isPending: isMarketingContentPending, refetch: refetchContent } = useQuery({
    queryKey: ["marketingContentList"],
    queryFn: async () => {
      const res = await axiosPublic.get("/marketingContentList");
      return res?.data;
    }
  })

  return [marketingContentList, isMarketingContentPending, refetchContent];
};

export default useMarketingContent;