import { useState, useEffect } from "react";
import { getAllUsers } from "../../api/user.js";
import UserEdit from "../../components/UserEdit";
import { useAuthentication } from "../../hooks/authentication";

export default function Users() {
    const [user] = useAuthentication();

    const [refreshTrigger, setRefreshTrigger] = useState();
    const [selectedUserID, setSelectedUserID] = useState(null);

    // Load user list
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user.ID && user.authentication_key) {
            getAllUsers().then((users) => {
                setUsers(users);
            });
        }
    }, [user.ID, user.authentication_key, refreshTrigger]);

    return (

<div className="full-screen-background p-4">
    <div className="container mx-auto my-2 grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="rounded-lg border-2 border-gray-300 p-4 bg-white shadow">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Users</h2>
            <div className="overflow-auto w-full">
                <table className="w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left text-gray-600">Name</th>
                            <th className="p-2 text-left text-gray-600">Role</th>
                            <th className="p-2 text-left text-gray-600">Email</th>
                            <th className="p-2 text-left text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.ID} className="hover:bg-gray-50">
                                <td className="p-2">{user.firstname} {user.lastname}</td>
                                <td className="p-2">{user.role}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => setSelectedUserID(user.ID)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="rounded-lg border-2 border-gray-300 p-4 bg-white shadow">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Edit User</h2>
            {/* User Edit Component */}
            <UserEdit userID={selectedUserID} onSave={() => setRefreshTrigger({})} />
        </div>
    </div>
</div>
    );
}
