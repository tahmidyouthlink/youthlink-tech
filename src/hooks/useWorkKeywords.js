"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useWorkKeywords = () => {

  const axiosPublic = useAxiosPublic();

  const { data: workKeywords, isPending: isWorkKeywordsPending, refetch: refetchWorkKeywords } = useQuery({
    queryKey: ["workKeywords"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allWorkKeywords");
      return res?.data;
    }
  })

  return [workKeywords, isWorkKeywordsPending, refetchWorkKeywords];
};

export default useWorkKeywords;