"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useAdmin = () => {

    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: isAdmin, isPending: pending } = useQuery({
        queryKey: ["admin", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/admin/${user?.email}`);
            return res?.data?.isAdmin;
        }
    })

    return [isAdmin, pending];
};

export default useAdmin;