"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBlogs = () => {

    const axiosPublic = useAxiosPublic();

    const { data: allBlog, isPending: isBlog, refetch } = useQuery({
        queryKey: ["allBlog"],
        queryFn: async () => {
            const res = await axiosPublic.get("/allBlog");
            return res?.data;
        }
    })

    return [allBlog, isBlog, refetch];
};

export default useBlogs;