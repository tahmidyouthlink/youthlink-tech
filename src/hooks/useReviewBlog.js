"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReviewBlog = () => {

    const axiosPublic = useAxiosPublic();

    const { data: reviewBlog, isPending: isReviewBlog } = useQuery({
        queryKey: ["reviewBlog"],
        queryFn: async () => {
            const res = await axiosPublic.get("/reviewBlog");
            return res?.data;
        }
    })

    return [reviewBlog, isReviewBlog];
};

export default useReviewBlog;