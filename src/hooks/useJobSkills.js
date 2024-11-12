"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useJobSkills = () => {

  const axiosPublic = useAxiosPublic();

  const { data: allJobSkills, isPending: isJobSkillsPending, refetch: refetchJobSkills } = useQuery({
    queryKey: ["allJobSkills"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allJobSkills");
      return res?.data;
    }
  })

  return [allJobSkills, isJobSkillsPending, refetchJobSkills];
};

export default useJobSkills;