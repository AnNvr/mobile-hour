import { db } from "../database.js"

// Model constructor for features
export function Features(
    productID,
    color,
    dimensions,
    screensize,
    resolution,
    CPU,
    RAM,
    storage,
    battery,
    camera
) {
    return {
        productID,
        color,
        dimensions,
        screensize,
        resolution,
        CPU,
        RAM,
        storage,
        battery,
        camera
    }
}

// Get byID
export async function getByID(featureID) {
    // get feature by ID
    const [featuresResults] = await db.query(
        "SELECT * FROM features WHERE ID = ?", featureID
    )
    // Check we found a result to convert into object
    if (featuresResults.length > 0) {
        const result = featuresResults[0]
        return Promise.resolve(
            Features(
                result.ID,
                result.productID,
                result.color,
                result.dimensions,
                result.screensize,
                result.resolution,
                result.CPU,
                result.RAM,
                result.storage,
                result.battery,
                result.camera
            )
        )
    } else {
        return Promise.reject("No result found")
    }
}

// Create
export async function create(features) {
    delete features.ID

    return db.query(
        "INSERT INTO features (productID, color, dimensions, screensize, resolution, CPU, RAM, storage, battery, camera) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            features.productID,
            features.color,
            features.dimensions,
            features.screensize,
            features.resolution,
            features.CPU,
            features.RAM,
            features.storage,
            features.battery,
            features.camera
        ]
    )
    .then(([result]) => {
        return {...features, ID: result.insertId}
    })
}

// Update
export async function update(features) {
    return db.query(
        "UPDATE features SET "
        + "color = ?, "
        + "dimensions = ?, "
        + "screensize = ?, "
        + "resolution = ?, "
        + "CPU = ?, "
        + "RAM = ?, "
        + "storage = ?, "
        + "battery = ?, "
        + "camera = ?, "
        + "WHERE ID = ?",
        [
            features.color,
            features.dimensions,
            features.screensize,
            features.resolution,
            features.CPU,
            features.RAM,
            features.storage,
            features.battery,
            features.camera,
            features.ID
        ]
    )
    .then(([result]) => {
        return {...features}
    })
}

// Delete
export async function deleteByID(featureID) {
    return db.query("DELETE FROM features WHERE ID = ?", [featureID])
}