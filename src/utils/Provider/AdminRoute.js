import Loading from "@/components/shared/Loading/Loading";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const [isAdmin, pending] = useAdmin();
    const router = useRouter();

    if (loading || pending) {
        return <Loading />
    }

    if (user && isAdmin) {
        return children
    }

    return router.push("/");
};

export default AdminRoute;