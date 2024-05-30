"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReviewWork = () => {

    const axiosPublic = useAxiosPublic();

    const { data: reviewWork, isPending: isReviewWork } = useQuery({
        queryKey: ["reviewWork"],
        queryFn: async () => {
            const res = await axiosPublic.get("/reviewWork");
            return res?.data;
        }
    })

    return [reviewWork, isReviewWork];
};

export default useReviewWork;