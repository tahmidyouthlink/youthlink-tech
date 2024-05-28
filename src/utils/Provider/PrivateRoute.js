"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/Loading/Loading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.replace("/");
    }, [loading, user, router]);

    if (loading) <Loading />

    return user ? <>{children}</> : null
}

export default PrivateRoute;