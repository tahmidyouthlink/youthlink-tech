"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReviewJobCircular = () => {

    const axiosPublic = useAxiosPublic();

    const { data: reviewJobCircular, isPending: isReviewJobCircular } = useQuery({
        queryKey: ["reviewJobCircular"],
        queryFn: async () => {
            const res = await axiosPublic.get("/reviewJobCircular");
            return res?.data;
        }
    })

    return [reviewJobCircular, isReviewJobCircular];
};

export default useReviewJobCircular;