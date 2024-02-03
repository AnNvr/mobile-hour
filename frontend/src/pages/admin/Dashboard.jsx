import { useState, useEffect } from "react";
import { getAllUsers } from "../../api/user.js";
import Footer from "../../components/Footer";
import { useAuthentication } from "../../hooks/authentication";


export default function Dashboard() {
    return(
        <div className="flex min-h-screen bg-gray-100">

        <div className="flex">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <h1>This is the Dashboard</h1>
            </div>
        </div>
        <Footer />
    </div>
    )
}