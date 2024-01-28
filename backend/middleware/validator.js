import { Validator, ValidationError } from "express-json-validator-middleware";

// Create validator object and store it into a const
const validator = new Validator()

// Export validate middleware to use with endpoints
export const validate = validator.validate

// Export error handling middleware
export const validateErrorMiddleware = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error)
    }

    const isValidationError = error instanceof ValidationError
    if (!isValidationError) {
        return next(error)
    }

    res.status(400).json({
        status: 400,
        message: "Validation error ongoing",
        errors: error.validationErrors
    })

    next()
}