"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useWorkCategories = () => {

  const axiosPublic = useAxiosPublic();

  const { data: workCategory, isPending: isWorkCategoryPending, refetch: refetchWorkCategory } = useQuery({
    queryKey: ["workCategory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allWorkCategories");
      return res?.data;
    }
  })

  return [workCategory, isWorkCategoryPending, refetchWorkCategory];
};

export default useWorkCategories;