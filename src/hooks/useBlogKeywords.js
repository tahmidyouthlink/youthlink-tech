"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBlogKeywords = () => {

  const axiosPublic = useAxiosPublic();

  const { data: allBlogKeywords, isPending: isBlogKeywordPending, refetch: refetchBlogKeywords } = useQuery({
    queryKey: ["allBlogKeywords"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allBlogKeywords");
      return res?.data;
    }
  })

  return [allBlogKeywords, isBlogKeywordPending, refetchBlogKeywords];
};

export default useBlogKeywords;