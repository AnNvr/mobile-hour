import React from "react";
import { auth } from "../api.js";
import { onAuthStateChanged } from "firebase/auth";

// create context
const AuthContext = React.createContext();

// create and export auth hook for the restricted routes
export const useAuth = () => React.useContext(AuthContext);

// create Provide to wrap the App
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    console.log(currentUser)

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{currentUser}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}