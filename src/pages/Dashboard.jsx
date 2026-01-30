import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login.");

        const data = await getProfile(token);
        setUser(data.user);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading your dashboard...</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

  return (
    <div className="dashboard-page p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>

      <div className="space-y-2">
        <p><strong>Email:</strong> {user.email || "Not provided"}</p>
        <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
        <p><strong>Role:</strong> {user.role || "User"}</p>
      </div>
    </div>
  );
}
