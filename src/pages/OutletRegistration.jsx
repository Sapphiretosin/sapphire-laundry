import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OutletRegistration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        outletName: "",
        address: "",
        lat: 7.6167, // Default demo coords
        lng: 5.2040,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUserSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register-outlet-owner", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const handleOutletSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:5000/api/outlets/register",
                {
                    name: formData.outletName,
                    address: formData.address,
                    lat: formData.lat,
                    lng: formData.lng,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setSuccess("Outlet registered successfully! Please wait for Super Admin approval.");
            setTimeout(() => navigate("/dashboard"), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Outlet registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-background">
            <div className="max-w-xl mx-auto bg-card p-8 rounded-3xl shadow-xl border border-border">
                <h2 className="text-3xl font-bold text-primary mb-2 text-center">Partner With Us</h2>
                <p className="text-muted-foreground text-center mb-8">
                    {step === 1 ? "Create your partner account" : "Register your laundry outlet"}
                </p>

                {error && <p className="bg-destructive/10 text-destructive p-3 rounded-lg mb-6 text-sm">{error}</p>}
                {success && <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-6 text-sm">{success}</p>}

                {step === 1 ? (
                    <form onSubmit={handleUserSignup} className="space-y-4">
                        <input
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                            required
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                            required
                        />
                        <input
                            name="phone"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                            required
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                            required
                        />
                        <button
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition shadow-lg"
                        >
                            {loading ? "Creating Account..." : "Next Step"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleOutletSignup} className="space-y-4">
                        <input
                            name="outletName"
                            placeholder="Outlet Name (e.g. Sapphire Ekiti Central)"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                            required
                        />
                        <textarea
                            name="address"
                            placeholder="Full physical address"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                            rows={3}
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-muted-foreground ml-1">Latitude</label>
                                <input
                                    name="lat"
                                    type="number"
                                    step="any"
                                    value={formData.lat}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground ml-1">Longitude</label>
                                <input
                                    name="lng"
                                    type="number"
                                    step="any"
                                    value={formData.lng}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-xl"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition shadow-lg"
                        >
                            {loading ? "Registering Outlet..." : "Complete Registration"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default OutletRegistration;
