import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../api.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        role: "customer",
        password: "",
        address: "",
        phone: "",
    });
    const [emailAlert, setEmailAlert] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const firstnameInputRef = useRef(null);
    const lastnameInputRef = useRef(null);
    const addressInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const buttonRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        // focus on email when the app mounts
        emailInputRef.current.focus();
    }, []);

    useEffect(() => {
        if (showModal) {
            modalRef.current.focus();
        }
    }, [showModal]);

    function togglePasswordVisibility(e) {
        e.preventDefault();
        setShowPassword((prevState) => !prevState);
    }

    function handleShowModal() {
        setShowModal(true);
    }

    function handleHideModal() {
        setShowModal(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            console.log("User registered:", userCredential.user);
            setEmailAlert(false);
            setRegistrationSuccess(true);
            handleShowModal(true);
            navigate("/admin");
        } catch (error) {
            console.error("Error creating user: ", error);
            setEmailAlert(true);
        }
    }

    return (
        <section className="flex flex-col items-center pt-6">
            {showModal && (
                <div
                    className="modal"
                    ref={modalRef}
                    tabIndex="-1"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modalTitle"
                    aria-describedby="modalDesc"
                >
                    <div className="modal-content">
                        <h2 id="modalTitle">Registration Successful</h2>
                        <p id="modalDesc">You have successfully registered.</p>
                        <button onClick={handleHideModal} ref={buttonRef}>
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 md:space-y-6"
                    >
                        <div>
                            <label
                                for="firstname"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                First name
                            </label>
                            <input
                                ref={firstnameInputRef}
                                type="text"
                                name="firstname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Emelia Erickson"
                                required
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                for="lastname"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Lastname
                            </label>
                            <input
                                ref={lastnameInputRef}
                                type="text"
                                name="lastname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="emelia_erickson24"
                                required
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                for="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Email
                            </label>
                            <input
                                ref={emailInputRef}
                                type="email"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="email@server.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                for="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    ref={passwordInputRef}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    minLength="6"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 mr-2 flex items-center text-lg"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label
                                for="address"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Address
                            </label>
                            <input
                                ref={addressInputRef}
                                type="address"
                                name="address"
                                placeholder="1 Name Street"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                for="phone"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                phone
                            </label>
                            <input
                                ref={phoneInputRef}
                                type="text"
                                name="phone"
                                placeholder="0123456789"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        {emailAlert && (
                            <p className="text-red-500 text-sm">
                                This email already exists. Try another one.
                            </p>
                        )}

                        <button
                            type="submit"
                            className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                                isSubmitting === true ? "loading" : ""
                            }`}
                            disabled={isSubmitting === true}
                        >
                            {isSubmitting === true
                                ? "Registering..."
                                : "Register"}
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                to="/login"
                            >
                                Sign in here
                            </Link>
                        </p>
                        {registrationSuccess && (
                            <div role="alert" className="alert alert-success">
                                <div className="flex-1">
                                    <label>
                                        <span className="label-text text-white">
                                            Registration successful! Redirecting
                                            to dashboard...
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
