"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCheckedWork = () => {

    const axiosPublic = useAxiosPublic();

    const { data: checkedWork, isPending: isCheckedWork } = useQuery({
        queryKey: ["checkedWork"],
        queryFn: async () => {
            const res = await axiosPublic.get("/checkedWork");
            return res?.data;
        }
    })

    return [checkedWork, isCheckedWork];
};

export default useCheckedWork;