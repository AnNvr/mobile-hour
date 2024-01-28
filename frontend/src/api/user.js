import { API_URL } from "./api";

// Login
export async function login(email, password) {
    const response = await fetch(API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const APIResponseObject = await response.json();

    return APIResponseObject;
}

// Logout
export async function logout(authenticationKey) {
    const response = await fetch(
        API_URL + "/users/logout",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ authenticationKey })
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject
}