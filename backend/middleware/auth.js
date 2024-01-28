import { getByAuthenticationKey } from "../models/users.js";

export default function auth(allowed_roles) {
    return function (req, res, next) {
        const authKey = req.body.key ?? req.query.authKey

        if (authKey) {
            getByAuthenticationKey(authKey)
                .then(user => {
                    if (allowed_roles.includes(user.role)) {
                        req.user = user
                        next()
                    } else {
                        res.status(403).json({
                            status: 403,
                            message: "Access forbidden"
                        })
                    }
                })
                .catch(error => {
                    res.status(401).json({
                        status: 401,
                        message: "Authentication key invalid"
                    })
                })
        } else {
            res.status(401).json({
                status: 401,
                message: "Authentication key missing"
            })
        }
    }
}