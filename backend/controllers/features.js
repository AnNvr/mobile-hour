import { Router } from "express";
import { Features, deleteByID } from "../models/features.js";
import { validate } from "../middleware/validator.js";
import { create, getByID, update, deleteByID } from "../models/features.js";

const featuresController = Router()

// GET by ID
const getFeaturesByIDSchema = {
    type: "object",
    required: ["id"],
    properties: {
        ID: {
            type: "string"
        }
    }
}
featuresController.get(
    "features/:id", validate({params: getFeaturesByIDSchema}),
    (req, res) => {
        const featuresID = req.params.id
        getByID(featuresID)
            .then(features)
    }
)