import express from "express";
import cors from"cors";

// Create express app
const app = express()
const port = 8080

// enable cross-origin resources sharing (CORS)
app.use(cors({
    // allow all origins
    origin: true
}))

app.use(express.json())

// TODO: import and use the routers of each controller
import userController from "./controllers/users.js";
app.use(userController)

import { validateErrorMiddleware } from "./middleware/validator.js";
app.use(validateErrorMiddleware)

app.listen(port, () => {
    console.log(`Express server started on http://localhost:${port}`)
})