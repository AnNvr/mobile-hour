import { Router } from "express";
import { nanoid } from "nanoid";
import { validate } from "../middleware/validator.js";
/* import auth from "../middleware/auth.js"; */
import bcrypt from "bcryptjs";
import {
    User,
    getAll,
    getByEmail,
    getByID,
    getByAuthenticationKey,
    create,
    update,
    deleteByID
} from "../models/users.js";

const userController = Router()

// Login
const loginSchema = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string"
        },
        password: {
            type: "string"
        }
    }
}

userController.post("/users/login",
    validate({ body: loginSchema }),
    (req, res) => {

        let loginData = req.body
        
        getByEmail(loginData.email)
            .then(user => {
                if (bcrypt.compareSync(loginData.password, user.password)) {
                    user.authentication_key = nanoid().toString()

                update(user).then(result => {
                    res.status(200).json({
                        status: 200,
                        message: "User logged succesfully",
                        userID: user.ID,
                        authenticationKey: user.authentication_key
                    })
                })
            } else {
                res.status(400).json({
                    status: 400,
                    message: "Invalid Credentials"
                })
            }
        }).catch(error => {
            res.status(500).json({
                status: 500,
                message: "Login failed:" + error
            })
        })
    }
)

// Logout
const logoutSchema = {
    type: "object",
    required: ["authenticationKey"],
    properties: {
        authenticationKey: {
            type: "string"
        }
    }
}

userController.post("/users/logout",
    validate({ body: logoutSchema }),
    (req, res) => {

        const authenticationKey = req.body.authenticationKey

        getByAuthenticationKey(authenticationKey)
            .then(user => {
                user.authenticationKey = null
                update(user)
                    .then(user => {
                        res.status(200).json({
                            status: 200,
                            message: "User logged out"
                        })
                    })
            }).catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to logout user" + error
                })
            })
    }
)

// Get All
const usersSchema = {
    type: "object",
    properties: {}
}

userController.get(
    "/users",
    [
        //auth(['admin']),
        validate({ body: usersSchema })
    ],
    async (req, res) => {
        const users = await getAll()

        res.status(200).json({
            status: 200,
            message: "User list",
            users: users
        })
    }
)

// Get by ID
const getByIDSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "string"
        }
    }
}

userController.get(
    "/users/:id",
    [
        //auth(["admin"]),
        validate({ params: getByIDSchema })
    ],
    (req, res) => {
        const userID = req.params.id
        getByID(userID)
            .then(user => {
            if (userID.role === "customer") {
                if (userID.id !== userID) {
                    return res.status(403).json({
                        status: 403,
                        message: "You are not authorized to view this user's information."
                    })
                }
            }
            res.status(200).json({
                status: 200,
                message: "Fetched user by ID",
                user: user
            })
        }).catch(error => {
            res.status(500).json({
                status: 500,
                message: "Failed to fetch user by ID" + error
            })
        })
    }
)

// Get by authentication key
const getUserByAuthenticationKeySchema = {
    type: "object",
    required: ["authenticationKey"],
    properties: {
        authenticationKey: {
            type: "string"
        }
    }
}

userController.get(
    "/users/by-key/:authenticationKey",
    validate({ params: getUserByAuthenticationKeySchema }),
    (req, res) => {
        const authenticationKey = req.params.authenticationKey

        getByAuthenticationKey(authenticationKey)
            .then(user => {
                res.status(200).json({
                    status: 200,
                    message: "Get user by authentication key",
                    user: user
                })
            })
            .catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to get user by auth key: " + error
                })
            })
    }
)

// Create User
const createUserSchema = {
    type: "object",
    required: [],
    properties: {
        user: {
            type: "object",
            required: [
                "email",
                "password",
                "role",
                "firstname",
                "lastname",
                "address",
                "phone"
            ],
            properties: {
                email: {
                    type: "string"
                },
                password: {
                    type: "string"
                },
                role: {
                    type: "string"
                },
                firstname: {
                    type: "string"
                },
                lastname: {
                    type: "string"
                },
                address: {
                    type: "string"
                },
                phone: {
                    type: "string"
                }
            }
        }
    }
}

userController.post("/users",
    [
        //auth(["admin"]),
        validate({ body: createUserSchema })
    ], (req, res) => {
        const userData = req.body.user

        // hash password
        if (userData.password && !userData.password.startsWith("$2a")) {
            userData.password = bcrypt.hashSync(userData.password)
        } else if (!userData.password) {
            delete userData.password
        }

        const user = User(
            null,
            userData.email,
            userData.password,
            userData.role,
            userData.firstname,
            userData.lastname,
            userData.address,
            userData.phone,
            null
        )

        create(user)
            .then(createdUser => {
                res.status(200).json({
                    status: 200,
                    message: "User created!",
                    user: createdUser
                })
            })
            .catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to create user" + error
            })
        })
    }
)

// Register User
const registerUserSchema = {
    type: "object",
    required: [
        "email",
        "password",
        "role",
        "firstname",
        "lastname",
        "address",
        "phone",
    ],
    properties: {
        email: {
            type: "string"
        },
        password: {
            type: "string"
        },
        role: {
            type: "string"
        },
        firstname: {
            type: "string"
        },
        lastname: {
            type: "string"
        },
        address: {
            type: "string"
        },
        phone: {
            type: "string"
        },
    }
}

userController.post(
    "/users/register",
    validate({ body: registerUserSchema }),
    (req, res) => {
        const userData = req.body

        userData.password = bcrypt.hashSync(userData.password)

        const newUser = User(
            null,
            userData.email,
            userData.password,
            "customer",
            userData.firstname,
            userData.lastname,
            userData.address,
            userData.phone,
            null
        )

        create(newUser)
            .then(user => {
                res.status(200).json({
                    status: 200,
                    message:"Registration succesful",
                    user: user
                })
            })
            .catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Registration failed" + error
                })
        })
    }
)

// Update User
userController.patch(
    "/users",
    [
        //auth(["admin", "customer"])
    ],
    async (req, res) => {
        console.log('Received update request with body:', req.body);

        // Get the user data out of the request
        const formData = req.body.formData

        console.log("Updating User:", formData);
        console.log("Received FormData for Update:", req.body.formData)
        console.log(req.user.role)
        console.log(req.user.ID)
        console.log(formData.ID)

        // Check if the user has a customer role and whether they are updating their own data.
        if (req.user.role === "customer" && req.user.ID != formData.ID) {
            return res.status(403).json({
                status: 403,
                message: "You are not authorized to update other user's data"
            })
        }

        // Convert user data into a User model object
        const user = User(
            formData.ID,
            formData.email,
            formData.password,
            formData.role,
            formData.firstname,
            formData.lastname,
            formData.address,
            formData.phone,
            formData.authentication_key
        )

        // use the updated model fn to update this user in the Database
        update(user)
            .then(updatedUser => {
                if (updatedUser) {
                    res.status(200).json({
                        status: 200,
                        message: "User updated succesfully!",
                        user: updatedUser
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "User not found"
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to update user" + error
                })
            })
        }
)

// Delete User
const deleteUserSchema = {
    type: "object",
    properties: {
        id: {
            type: "string"
        }
    }
}

userController.delete(
    "/users/:id",
    [
        //auth(["admin"]),
        validate({ params: deleteUserSchema })
    ],
    (req, res) => {
        const userID = req.params.id

        deleteByID(userID)
            .then(result => {
                res.status(200).json({
                    status: 200,
                    message: "User deleted",
                    result: result
                })
            })
            .catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to delete user: " + error
                })
            })
    }
)

export default userController