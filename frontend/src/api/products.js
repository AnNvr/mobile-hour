import { API_URL } from "./api";

// Get All
export async function getAllProducts() {
    const response = await fetch(API_URL + "/products")
    const productsResponse = await response.json()
    return productsResponse.products
}

// Get By ID
export async function getProductByID(productID) {
    const response = await fetch(
        API_URL + "/products/" + productID,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
    )
    const productsByIDresponse = await response.json()
    return productsByIDresponse.product
}

// Create
export async function createProduct(product) {
    const response = await fetch(
        API_URL + "/products",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...product})
        }
    )

    const createdProductResponse = await response.json()
    return createdProductResponse.product
}

// Update
export async function updateProduct(product) {
    const response = await fetch(
        API_URL + "/products",
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...product})
        }
    )

    const patchProductResponse = await response.json()
    return patchProductResponse
}

// Delete
export async function deleteProduct(product) {
    const response = await fetch(
        API_URL + "/products",
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...product})
        }
    )
    const deleteProductResponse = await response.json()
    return deleteProductResponse
}