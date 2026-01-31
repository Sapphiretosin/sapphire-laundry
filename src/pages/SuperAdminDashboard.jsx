import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStore, FaClock, FaCheckCircle, FaTimesCircle, FaChartLine } from "react-icons/fa";

const SuperAdminDashboard = () => {
    const [outlets, setOutlets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOutlets();
    }, []);

    const fetchOutlets = async () => {
        try {
            const token = localStorage.getItem("token");
            // Note: We'll need a backend route for fetching ALL outlets for superadmin
            const res = await axios.get("http://localhost:5000/api/outlets/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOutlets(res.data.data);
        } catch (err) {
            setError("Failed to fetch outlets");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:5000/api/outlets/${id}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchOutlets();
        } catch (err) {
            alert("Status update failed");
        }
    };

    return (
        <div className="pt-32 pb-24 px-6 md:px-16 min-h-screen bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold text-primary">Super Admin Panel</h1>
                    <div className="flex gap-4">
                        <div className="bg-card p-4 rounded-2xl shadow-sm border border-border flex items-center gap-4">
                            <FaChartLine className="text-primary text-2xl" />
                            <div>
                                <p className="text-xs text-muted-foreground uppercase">Revenue Share</p>
                                <p className="text-xl font-bold text-foreground">₦25,400</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {["Pending Approval", "Approved Outlets", "Suspended", "Total Revenue"].map((label, i) => (
                        <div key={i} className="bg-card p-6 rounded-3xl border border-border shadow-sm">
                            <p className="text-sm text-muted-foreground mb-1">{label}</p>
                            <h3 className="text-2xl font-bold text-foreground">{i === 3 ? "₦152k" : Math.floor(Math.random() * 20)}</h3>
                        </div>
                    ))}
                </div>

                <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-border bg-muted/30">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FaStore className="text-primary" /> Outlet Management
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted text-muted-foreground text-sm">
                                    <th className="p-4">Outlet Name</th>
                                    <th className="p-4">Owner</th>
                                    <th className="p-4">Address</th>
                                    <th className="p-4">Commission</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {outlets.map((outlet) => (
                                    <tr key={outlet._id} className="border-b border-border hover:bg-muted/10 transition">
                                        <td className="p-4 font-semibold text-foreground">{outlet.name}</td>
                                        <td className="p-4 text-muted-foreground">{outlet.owner?.name || "Unknown"}</td>
                                        <td className="p-4 text-xs text-muted-foreground">{outlet.location.address}</td>
                                        <td className="p-4 font-medium text-primary">{outlet.commissionRate}%</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${outlet.status === "approved" ? "bg-green-100 text-green-700" :
                                                    outlet.status === "pending" ? "bg-amber-100 text-amber-700" :
                                                        "bg-red-100 text-red-700"
                                                }`}>
                                                {outlet.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 flex gap-2">
                                            {outlet.status !== "approved" && (
                                                <button
                                                    onClick={() => handleStatusUpdate(outlet._id, "approved")}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Approve"
                                                >
                                                    <FaCheckCircle />
                                                </button>
                                            )}
                                            {outlet.status !== "suspended" && (
                                                <button
                                                    onClick={() => handleStatusUpdate(outlet._id, "suspended")}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Suspend"
                                                >
                                                    <FaTimesCircle />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {outlets.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="6" className="p-10 text-center text-muted-foreground">No outlets found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
