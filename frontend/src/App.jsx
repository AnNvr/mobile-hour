import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import AdminProducts from "./pages/admin/AdminProducts";
import Orders from "./pages/admin/Orders";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/products/ProductDetails";

function App() {
    const [currentUser, setCurrentUser] = React.useState(null);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is signed in", user);
                setCurrentUser(user);
            } else {
                console.log("No user signed in");
                setCurrentUser(null);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <React.StrictMode>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route
                            path="/"
                            element={<Layout currentUser={currentUser} />}
                        >
                            <Route index element={<Landing />} />
                            <Route path="about" element={<About />} />
                            <Route path="products" element={<Products />} />
                            <Route
                                path="products/:id"
                                element={<ProductDetails />}
                            />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />

                            {/* Restricted routes for admin */}
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<Dashboard />} />
                                <Route
                                    path="dashboard"
                                    element={<Dashboard />}
                                />
                                <Route path="users" element={<Users />} />
                                <Route
                                    path="products"
                                    element={<AdminProducts />}
                                />
                                <Route path="orders" element={<Orders />} />
                            </Route>
                        </Route>
                    </Routes>
                </AuthProvider>
            </Router>
        </React.StrictMode>
    );
}

export default App;
