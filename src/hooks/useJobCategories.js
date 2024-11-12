"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useJobCategories = () => {

  const axiosPublic = useAxiosPublic();

  const { data: allJobCategories, isPending: isJobCategoryPending, refetch: refetchJobCategories } = useQuery({
    queryKey: ["allJobCategories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allJobCategories");
      return res?.data;
    }
  })

  return [allJobCategories, isJobCategoryPending, refetchJobCategories];
};

export default useJobCategories;