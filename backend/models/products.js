import { db } from "../database";

// Model for products
export function Product(
    ID,
    model,
    brand,
    price,
    stock_on_hand
) {
    return {
        ID,
        model,
        brand,
        price,
        stock_on_hand
    }
}

// GET All
export async function getAll() {
    // get the collection of products
    const [allProductsResults] = await db.query("SELECT * FROM products")

    // convert the result into a list of products objects
    return allProductsResults.map(result => {
        return Product(
            result.ID,
            result.model,
            result.brand,
            result.price,
            result.stock_on_hand
        )
    })
}

// By ID
export async function getByID(productID) {
    // get product by ID
    const [productsResults] = await db.query(
        "SELECT * FROM products WHERE ID = ?", productID
    )
    // check the result and convert it into a product object
    if (productsResults.length > 0) {
        const result = productsResults[0]
        return Promise.resolve(
            Product(
                result.ID,
                result.model,
                result.brand,
                result.price,
                result.stock_on_hand
            )
        )
    } else {
        return Promise.reject("No result found")
    }
}

// Create
export async function create(product) {
    // delete eventual generated IDs for safety
    delete product.ID
    // create product object and return result
    return db.query(
        "INSERT INTO products (model, brand, price, stock_on_hand) VALUES (?, ?, ?, ?)",
        [product.ID, product.model, product.brand, product.price, product.stock_on_hand]
    )
    .then(([result]) => {
        // generate ID for the created object
        return {...product, ID: result.insertId}
    })
}

// Update
export async function update(product) {
    return db.query(
        "UPDATE products SET model = ?, brand = ?, price = ?, stock_on_hand = ? WHERE ID = ?",
        [product.model, product.brand, product.price, product.stock_on_hand, product.ID]
    )
}

// Delete
export async function deleteByID(productID) {
    return db.query("DELETE FROM products WHERE ID = ?", [productID])
}