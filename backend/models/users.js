import { db } from "../database.js";

// Model for users
export function User(
    ID,
    email,
    password,
    role,
    firstname,
    lastname,
    address,
    phone,
    authentication_key
) {
    return {
        ID,
        email,
        password,
        role,
        firstname,
        lastname,
        address,
        phone,
        authentication_key
    }
}

// GET all
export async function getAll() {
    const [users] = await db.query("SELECT * FROM users")
    return users.map(user => {
        return User(
            user.ID.toString(),
            user.email,
            user.password,
            user.role,
            user.firstname,
            user.lastname,
            user.address,
            user.phone,
            user.authentication_key
        )
    })
}

// by ID
export async function getByID (userID) {
    const [userByID] = await db.query(
        "SELECT * FROM users WHERE ID = ?", userID
    )

    if (userByID.length > 0) {
        const result = userByID[0]
        return Promise.resolve(
            User(
                result.ID.toString(),
                result.email,
                result.password,
                result.role,
                result.firstname,
                result.lastname,
                result.address,
                result.phone,
                result.authentication_key
            )
        )
    } else {
        return Promise.reject("No results found")
    }
}

// by email
export async function getByEmail (email) {
    const [userEmail] = await db.query(
        "SELECT * FROM users WHERE email = ?", email
    )

    if (userEmail.length > 0) {
        const result = userEmail[0]
        return  Promise.resolve(
            User(
                result.ID.toString(),
                result.email,
                result.password,
                result.role,
                result.firstname,
                result.lastname,
                result.address,
                result.phone,
                result.authentication_key
            )
        )
    } else {
        return Promise.reject("No results found")
    }
}

// Authentication
export async function getByAuthenticationKey(key) {
    const [authKey] = await db.query(
        "SELECT * FROM users WHERE authentication_key = ?", key
    )

    if (authKey !==null && authKey.length > 0) {
        const result = authKey[0]
        return Promise.resolve(
            new User(
                result.ID.toString(),
                result.email,
                result.password,
                result.role,
                result.firstname,
                result.lastname,
                result.address,
                result.phone,
                result.authentication_key
            )
        )
    } else {
        return Promise.reject("No results found")
    }
}

// Create
export async function create(user) {
    delete user.ID

    return db.query(
        "INSERT INTO users (email, password, role, firstname, lastname, address, phone) "
        + "VALUE (?, ?, ?, ?, ?, ?, ?)",
        [
            user.email,
            user.password,
            user.role,
            user.firstname,
            user.lastname,
            user.address,
            user.phone
        ]
    ).then(([result]) => {
        return { ...user, ID: result.insertId }
    })
}

// Update
export async function update(user) {
    return db.query(
        "UPDATE users SET "
        + "email = ?, "
        + "password = ?, "
        + "role = ?,"
        + "firstname = ?, "
        + "lastname = ?, "
        + "address = ?, " 
        + "phone = ?, "
        + "authentication_key = ? "
        + "WHERE ID = ?",
        [
            user.email,
            user.password,
            user.role,
            user.firstname,
            user.lastname,
            user.address,
            user.phone,
            user.authentication_key,
            user.ID
        ]
    ).then(([result]) => {
        return { ...user }
    })
}

// Delete
export async function deleteByID(userID) {
    return db.query("DELETE FROM users WHERE ID = ?", [userID])
}