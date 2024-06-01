"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useJobs = () => {

    const axiosPublic = useAxiosPublic();

    const { data: allJob, isPending: isJob, refetch } = useQuery({
        queryKey: ["allJob"],
        queryFn: async () => {
            const res = await axiosPublic.get("/allJobCircular");
            return res?.data;
        }
    })

    return [allJob, isJob, refetch];
};

export default useJobs;