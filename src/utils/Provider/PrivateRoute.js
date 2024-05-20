"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import useAuth from "@/hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.replace("/");
    }, [loading, user, router]);

    if (loading) <LoadingAnimation />

    return user ? <>{children}</> : null
}

export default PrivateRoute;