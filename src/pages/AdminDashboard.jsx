import React from "react";
import AdminOrdersMap from "../components/AdminOrdersMap";
import { orders } from "../data/orders";

const AdminDashboard = () => {
    return (
        <div className="pt-24 px-6 md:px-12 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Map Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Live Delivery Map</h2>
                    <AdminOrdersMap />
                </div>

                {/* Orders List Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-100 text-blue-800">
                                    <th className="p-3 rounded-l-lg">ID</th>
                                    <th className="p-3">Customer</th>
                                    <th className="p-3">Town</th>
                                    <th className="p-3 rounded-r-lg">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="p-3 font-medium text-gray-600">#{order.id}</td>
                                        <td className="p-3 text-gray-800">{order.customerName}</td>
                                        <td className="p-3 text-gray-600">{order.town}</td>
                                        <td className="p-3">
                                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
