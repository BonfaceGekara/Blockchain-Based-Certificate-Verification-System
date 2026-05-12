import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

const HomeRedirect = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to='/home' />;

    const role = user.role?.toLowerCase();

    if (role === "admin") return <Navigate to='/admin/dashboard' />;
    if (role === "user") return <Navigate to='/dashboard' />;
};

export default HomeRedirect;