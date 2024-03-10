import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { logoutUser } from "../api";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate()

    function toggleMenu() {
        setIsOpen((prevState) => !prevState);
    }

    const handleLogout = async () => {
        try {
            await logoutUser()
            navigate("/login")
        } catch (error) {
            console.error("Logout failed", error)
        }
    }

    const activeStyle = {
        borderBottom: "2px solid black",
        color: "black",
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
                    isOpen ? "block" : "hidden"
                }`}
                onClick={() => toggleMenu()}
            ></div>
            <div className="bg-[#f9fafb] flex justify-between items-center px-6 py-10 font-montserrat">
                <NavLink to="/" exact className="text-4xl font-bold">
                    MOBILE HOUR
                </NavLink>
                <div className="space-x-10 hidden md:flex">
                    <NavLink
                        to="/about"
                        className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                    >
                        ABOUT
                    </NavLink>
                    <NavLink
                        to="/products"
                        className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                    >
                        PRODUCTS
                    </NavLink>
                    {currentUser ? (
                        <button onClick={handleLogout} className="font-semibold text-[#4d4d4d] hover:text-black">
                            LOGOUT
                        </button>
                    ) : (
                        <Link to="/login">
                            LOGIN
                        </Link>
                    )}
                    
                </div>
                <button
                    className="btn btn-square btn-ghost md:hidden"
                    onClick={() => toggleMenu()}
                >
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 w-64 h-full bg-base-200 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
            >
                <button onClick={() => toggleMenu()}>
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <NavLink
                    to="/about"
                    className="block p-2"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    ABOUT
                </NavLink>
                <NavLink
                    to="/products"
                    className="block p-2"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    PRODUCTS
                </NavLink>
                {currentUser ? (
                    <button onClick={handleLogout} className="font-semibold text-[#4d4d4d] hover:text-black">
                        LOGOUT
                    </button>
                    ) : (
                        <Link to="/login">
                            LOGIN
                        </Link>
                    )}
            </div>
        </>
    );
}
