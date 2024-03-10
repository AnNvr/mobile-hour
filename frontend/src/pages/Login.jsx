import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../api.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const styles = {
    backgroundImage:
        "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
};

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [status, setStatus] = useState("");
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/admin";

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            console.log("User logged in:", userCredential.user);
            navigate(from, { replace: true });
        } catch (error) {
            setError(error);
            console.log("Error loggin in: ", error.message);
        } finally {
            setStatus("");
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
<div className="hero min-h-screen bg-opacity-50 bg-cover" style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%), url('https://images.pexels.com/photos/936012/pexels-photo-936012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`}}>
    <div className="hero-content flex justify-center items-center">
        <form onSubmit={handleSubmit} className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-white bg-opacity-90">
            <div className="card-body">
                <h1 className="text-5xl font-bold text-center mb-6">Login now!</h1>
                <p className="text-center mb-6">
                    Welcome back! Please enter your details to sign in and
                    start your session.
                </p>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="email"
                        className="input input-bordered w-full"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="password"
                        className="input input-bordered w-full"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label className="label mt-2">
                        <a
                            href="#"
                            className="label-text-alt link link-hover"
                        >
                            Forgot password?
                        </a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Login
                    </button>
                    <p className="mt-4 text-center">
                        <a
                            href="#"
                            className="link link-hover"
                            onClick={() => {
                                navigate("/register");
                            }}
                        >
                            Register now!
                        </a>
                    </p>
                </div>
            </div>
        </form>
    </div>
</div>
    );
}
