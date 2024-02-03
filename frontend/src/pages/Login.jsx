import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";

const styles = {
    backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')"
}


export default function Login() {
    const navigate = useNavigate();
    const [user, login, logout] = useAuthentication();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [statusMessage, setStatusMessage] = useState("");

    function onLoginSubmit(e) {
        e.preventDefault();
        setStatusMessage("Logging in...");

        login(formData.email, formData.password)
            .then((result) => {
                setStatusMessage("Login successful!");
                navigate("/admin/dashboard");
            })
            .catch((error) => {
                setStatusMessage("Login failed: " + error);
            });
    }



    return (
        <div className="py-6">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover"
                    style={ styles }
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">
                        Brand
                    </h2>
                    <p className="text-xl text-gray-600 text-center">
                        Welcome back!
                    </p>
                    <a
                        href="#"
                        className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
                    >
                        <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                            Sign in with Google
                        </h1>
                    </a>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <a
                            href="#"
                            className="text-xs text-center text-gray-500 uppercase"
                        >
                            or login with email
                        </a>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>

                    <form onSubmit={onLoginSubmit}>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <a href="#" className="text-xs text-gray-500">
                                Forget Password?
                            </a>
                        </div>
                        <input
                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <div className="mt-8">
                        <button type="submit" className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                            Login
                        </button>
                    </div>
                    </form>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <Link
                            to="/signup"
                            className="text-xs text-gray-500 uppercase"
                            >
                            or sign up
                        </Link>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>

                    {statusMessage && <div className="text-center my-2">{statusMessage}</div>}

                </div>
            </div>
        </div>
    );
}