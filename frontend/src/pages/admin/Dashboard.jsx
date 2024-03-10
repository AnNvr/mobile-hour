import React from "react";
import { useAuth } from "../../hooks/AuthProvider";
import Footer from "../../components/Footer";

export default function Dashboard() {
    const { user } = useAuth()
    return(
        <div className="flex min-h-screen bg-gray-100">

        <div className="flex">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h2>Welcome, {user ? user.displayName || 'User' : 'Guest'}</h2>
            </div>
        </div>
        <Footer />
    </div>
    )
}