"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useWorks = () => {

    const axiosPublic = useAxiosPublic();

    const { data: allWork, isPending: isWork, refetch } = useQuery({
        queryKey: ["allWork"],
        queryFn: async () => {
            const res = await axiosPublic.get("/allWork");
            return res?.data;
        }
    })

    return [allWork, isWork, refetch];
};

export default useWorks;