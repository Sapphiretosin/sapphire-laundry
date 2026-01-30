import React, { useState } from "react";
import { PaystackButton } from "react-paystack";

const PaymentPage = () => {
    const publicKey = "pk_test_02310639cf6fa8048712645b61052108fda49378";
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const handleSuccess = (reference) => {
        alert("Payment Successful! Transaction Reference: " + reference.reference);
        // Optional: Clear form
        setEmail("");
        setAmount("");
        setName("");
        setPhone("");
    };

    const componentProps = {
        email,
        amount: amount * 100, // Paystack expects Kobo
        metadata: {
            name,
            phone,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: handleSuccess,
        onClose: () => alert("Payment process cancelled."),
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Secure Payment
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Complete your payment with Paystack
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="sr-only">Phone Number</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="sr-only">Amount (NGN)</label>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Amount (₦)"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        {email && name && phone && amount > 0 ? (
                            <PaystackButton
                                {...componentProps}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            />
                        ) : (
                            <button
                                disabled
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-gray-300 cursor-not-allowed"
                            >
                                Fill all fields to Pay
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
