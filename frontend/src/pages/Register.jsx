import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";
import { registerUser } from "../api/user";

export default function Register() {
    const navigate = useNavigate()

    const [user, login, logout] = useAuthentication()

    const [statusMessage, setStatusMessage] = useState("")

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        role: "customer",
        password: "",
        address: "",
        phone: ""
    })

    function onRegisterSubmit(e) {
        e.preventDefault()
        setStatusMessage("Registering...")

        if (!/[A-Za-z]{1,32}/.test(formData.firstname)) {
            setStatusMessage("invalid firstname");
            return;
        }

        if (!/[A-Za-z]{1,32}/.test(formData.lastname)) {
            setStatusMessage("invalid firstname");
            return;
        }

        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/.test(formData.email)) {
            setStatusMessage("Invalid email address")
            return
        }

        if (!/[a-zA-Z0-9]{6,24}/.test(formData.password)) {
            setStatusMessage("Invalid password");
            return;
        }

        if (!/[0-9.\s\a-z]{1,30}/.test(formData.address)) {
            setStatusMessage("Invalid address");
            return;
        }

        if (
            !/^((?:[1-9][0-9 ().-]{5,28}[0-9])|(?:(00|0)( ){0,1}[1-9][0-9 ().-]{3,26}[0-9])|(?:(\+)( ){0,1}[1-9][0-9 ().-]{4,27}[0-9]))$/.test(
                formData.phone
            )
        ) {
            setStatusMessage("invalid phone number");
            return;
        }

        // register, then attempt to login
        registerUser(formData)
            .then(result => {
                setStatusMessage(result.message)
                login(formData.email, formData.password)
                    .then(result => {
                        setStatusMessage(result.message)
                        navigate('/dashboard')
                    })
                    .catch(error => {
                        console.log("Registration error: ", error)
                        setStatusMessage("Registration failed: " + error.message)
                    })
            })
    }
    return (
        <section className="flex flex-col items-center pt-6">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={onRegisterSubmit}>
                        <div>
                            <label
                                for="firstname"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                First name
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Emelia Erickson"
                                required
                                value={formData.firstname}
                                onChange={(e) => setFormData(prevState => { return { ...prevState, firstname: e.target.value }})}
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
                                type="text"
                                name="lastname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="emelia_erickson24"
                                required
                                value={formData.lastname}
                                onChange={(e) => setFormData(prevState => { return { ...prevState, lastname: e.target.value }})}
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
                                type="email"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="email@server.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prevState => { return { ...prevState, email: e.target.value }})}
                            />
                        </div>
                        <div>
                            <label
                                for="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData(prevState => { return { ...prevState, password: e.target.value }})}
                            />
                        </div>
                        <div>
                            <label
                                for="address"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Address
                            </label>
                            <input
                                type="address"
                                name="address"
                                placeholder="1 Name Street"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={formData.address}
                                onChange={(e) => setFormData(prevState => { return { ...prevState, address: e.target.value }})}
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
                                type="text"
                                name="phone"
                                placeholder="0123456789"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData(prevState => { return { ...prevState, phone: e.target.value }})}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Create an account
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
                        <label className="label">
                            <span className="label-text-alt">{statusMessage}</span>
                        </label>
                    </form>
                </div>
            </div>
        </section>
    );
}
