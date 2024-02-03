import { Router } from "express";
import { Product } from "../models/products.js";
import { validate } from "../middleware/validator.js";
import {
    create,
    getAll,
    getByID,
    update,
    deleteByID,
} from "../models/products.js";

const productController = Router();

// Get ALL
const getProductSchema = {
    type: "object",
    properties: {},
};

productController.get(
    "/products",
    [validate({ body: getProductSchema })],
    async (req, res) => {
        const products = await getAll();
        res.status(200).json({
            status: 200,
            message: "Products fetched successfully!",
            products: products,
        });
    }
);

// Get By ID
const getProductByIDschema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "string",
        },
    },
};

productController.get(
    "/products/:id",
    validate({ params: getProductByIDschema }),
    (req, res) => {
        const productID = req.params.id;
        getByID(productID)
            .then((product) => {
                res.status(200).json({
                    status: 200,
                    message: "Product by ID found",
                    product: product,
                });
            })
            .catch((error) => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to fetch product by ID" + error,
                });
            });
    }
);

// Create
const createProductSchema = {
    type: "object",
    required: ["model", "brand", "price", "stock_on_hand"],
    properties: {
        model: {
            type: "string",
        },
        brand: {
            type: "string",
        },
        price: {
            type: "string",
        },
        stock_on_hand: {
            type: "string",
        },
    },
};

productController.post(
    "/products",
    validate({ body: createProductSchema }),
    (req, res) => {
        const data = req.body;
        const product = Product(
            null,
            data.model,
            data.brand,
            data.price,
            data.stock_on_hand
        );
        create(product)
            .then((createdProduct) => {
                res.status(200).json({
                    status: 200,
                    message: "Product created!",
                    product: createdProduct,
                });
            })
            .catch((error) => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to create product" + error,
                });
            });
    }
);

// Update
const updateProductSchema = {
    type: "object",
    required: ["ID"],
    properties: {
        ID: {
            type: "number",
        },
        model: {
            type: "string",
        },
        brand: {
            type: "string",
        },
        price: {
            type: "string",
        },
        stock_on_hand: {
            type: "string",
        },
    },
};

productController.patch(
    "/products",
    validate({ body: updateProductSchema }),
    (req, res) => {
        const data = req.body;
        const product = Product(
            data.ID,
            data.model,
            data.brand,
            data.price,
            data.stock_on_hand
        );
        update(product).then((updatedProduct) => {
            res.status(200).json({
                status: 200,
                message: "Product updated successfully!",
                product: updatedProduct,
            });
        });
    }
);

const deleteProductSchema = {
    type: "object",
    required: ["ID"],
    properties: {
        ID: {
            type: "number"
        }
    }
}

productController.delete("/products", validate({body: deleteProductSchema}),
(req, res) => {
    const productID = req.body.ID

    deleteByID(productID)
        .then(result => {
            res.status(200).json({
                status: 200,
                message: "Deleted product!"
            })
        })
        .catch(error => {
            res.status(500).json({
                status: 500,
                message: "Failed! Check the controller: " + error
            })
        })
})

export default productController;
