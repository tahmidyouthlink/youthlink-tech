"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCheckedWork = () => {

    const axiosPublic = useAxiosPublic();

    const { data: checkedBlog, isPending: isCheckedBlog } = useQuery({
        queryKey: ["checkedBlog"],
        queryFn: async () => {
            const res = await axiosPublic.get("/checkedBlog");
            return res?.data;
        }
    })

    return [checkedBlog, isCheckedBlog];
};

export default useCheckedWork;