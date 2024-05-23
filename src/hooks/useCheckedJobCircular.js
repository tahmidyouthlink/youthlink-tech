"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCheckedWork = () => {

    const axiosPublic = useAxiosPublic();

    const { data: checkedJobCircular, isPending: isCheckedJobCircular } = useQuery({
        queryKey: ["checkedJobCircular"],
        queryFn: async () => {
            const res = await axiosPublic.get("/checkedJobCircular");
            return res?.data;
        }
    })

    return [checkedJobCircular, isCheckedJobCircular];
};

export default useCheckedWork;