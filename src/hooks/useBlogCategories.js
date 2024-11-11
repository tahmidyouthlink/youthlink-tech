"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBlogCategories = () => {

  const axiosPublic = useAxiosPublic();

  const { data: allBlogCategories, isPending: isBlogCategoryPending, refetch: refetchBlogCategories } = useQuery({
    queryKey: ["allBlogCategories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allBlogCategories");
      return res?.data;
    }
  })

  return [allBlogCategories, isBlogCategoryPending, refetchBlogCategories];
};

export default useBlogCategories;