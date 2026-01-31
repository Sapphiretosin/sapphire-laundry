import { Navigate } from "react-router-dom";

export default function RequireRole({ children, role }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        // Redirect unauthorized roles back to their dashboard or home
        return <Navigate to="/" replace />;
    }

    return children;
}
