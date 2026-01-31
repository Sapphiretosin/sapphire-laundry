import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInbox, FaSpinner, FaBoxOpen, FaTruck, FaNairaSign } from "react-icons/fa6";

const OutletDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/outlets/my-jobs", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setJobs(res.data.data);
        } catch (err) {
            setError("Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    };

    const updateJobStatus = async (jobId, status) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:5000/api/orders/${jobId}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchJobs();
        } catch (err) {
            alert("Status update failed");
        }
    };

    return (
        <div className="pt-32 pb-24 px-6 md:px-16 min-h-screen bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-primary mb-2">My Outlet Dashboard</h1>
                        <p className="text-muted-foreground">Manage your laundry jobs and track earnings</p>
                    </div>
                    <div className="bg-primary/10 p-6 rounded-3xl border border-primary/20 flex items-center gap-4">
                        <div className="bg-primary text-primary-foreground p-3 rounded-2xl shadow-lg">
                            <FaNairaSign className="text-xl" />
                        </div>
                        <div>
                            <p className="text-xs text-primary font-bold uppercase tracking-wider">Total Earnings</p>
                            <h3 className="text-2xl font-black text-primary">₦84,500.00</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: "New Jobs", icon: <FaInbox />, count: jobs.length, color: "text-blue-600 bg-blue-50" },
                        { label: "In Progress", icon: <FaSpinner />, count: 3, color: "text-amber-600 bg-amber-50" },
                        { label: "Ready", icon: <FaCheckCircle />, count: 5, color: "text-green-600 bg-green-50" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-card p-6 rounded-3xl border border-border shadow-sm flex items-center gap-4">
                            <div className={`p-4 rounded-2xl text-2xl ${stat.color}`}>{stat.icon}</div>
                            <div>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                <h3 className="text-2xl font-bold">{stat.count}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-border flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FaBoxOpen className="text-primary" /> Active Laundry Jobs
                        </h2>
                        <button
                            onClick={fetchJobs}
                            className="text-xs font-bold text-primary hover:underline"
                        >
                            Refresh List
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted text-muted-foreground text-xs uppercase tracking-widest font-bold">
                                    <th className="p-5">Customer</th>
                                    <th className="p-5">Services</th>
                                    <th className="p-5">Amount</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {jobs.map((job) => (
                                    <tr key={job._id} className="hover:bg-muted/10 transition group">
                                        <td className="p-5">
                                            <p className="font-bold text-foreground">{job.customer?.name}</p>
                                            <p className="text-xs text-muted-foreground">{job.customer?.phone}</p>
                                        </td>
                                        <td className="p-5">
                                            <p className="text-sm text-foreground">
                                                {job.services.map(s => `${s.title} (x${s.quantity})`).join(", ")}
                                            </p>
                                        </td>
                                        <td className="p-5">
                                            <p className="font-bold text-foreground">₦{job.totalAmount.toLocaleString()}</p>
                                            <p className="text-[10px] text-muted-foreground">Comm: ₦{job.commissionAmount.toLocaleString()}</p>
                                        </td>
                                        <td className="p-5">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border ${job.status === "pending" ? "border-amber-500 text-amber-600 bg-amber-50" :
                                                    "border-green-500 text-green-600 bg-green-50"
                                                }`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="p-5 text-right">
                                            <select
                                                onChange={(e) => updateJobStatus(job._id, e.target.value)}
                                                className="bg-muted px-4 py-2 rounded-xl text-xs font-bold outline-none border-none cursor-pointer hover:bg-muted/80 transition"
                                                defaultValue={job.status}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="accepted">Accept</option>
                                                <option value="processing">Processing</option>
                                                <option value="ready">Ready</option>
                                                <option value="delivered">Delivered</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                                {jobs.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="5" className="p-20 text-center">
                                            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                                                <FaInbox className="text-6xl opacity-10" />
                                                <p className="font-medium">No active laundry jobs found for your outlet.</p>
                                            </div>
                                        </td>
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

const FaCheckCircle = () => <div className="i-ph-check-circle-bold" />;

export default OutletDashboard;
