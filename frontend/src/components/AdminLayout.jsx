import { NavLink, Outlet } from "react-router-dom";

export const activeStyle = {
    borderBottom: "2px solid black",
    color: "black"
}

export default function AdminLayout() {
    return (
        <>
            <nav className="bg-[#e5e7eb] py-4 text-lg font-montserrat flex justify-around">
                <NavLink
                    end
                    style={({ isActive }) => isActive ? activeStyle : null}
                    className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                    to="/admin/dashboard"
                >
                    DASHBOARD
                </NavLink>
                <NavLink
                    end
                    style={({ isActive }) => isActive ? activeStyle : null}
                    className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                    to="/admin/users"
                >
                    USERS
                </NavLink>
                <NavLink
                    end
                    style={({ isActive }) => isActive ? activeStyle : null}
                    className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                    to="/admin/products"
                >
                    PRODUCTS
                </NavLink>
                <NavLink
                    end
                    style={({ isActive }) => isActive ? activeStyle : null}
                    className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                    to="/admin/orders"
                >
                    ORDERS
                </NavLink>
            </nav>
            <Outlet />
        </>
    )
}