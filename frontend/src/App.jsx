import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { AuthenticationProvider } from "./hooks/authentication";

function App() {

  return (
    <React.StrictMode>
      <Router>
        <AuthenticationProvider>      
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Register />} />

              {/* Restricted routes for admin */}
              <Route path="/admin" element={<AdminLayout />} >
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="products" element={<AdminProducts/>} />
                <Route path="orders" element={<Orders />} />
              </Route>

            </Route>
          </Routes>
        </AuthenticationProvider>
      </Router>
    </React.StrictMode>
  )
}

export default App
