import { API_URL } from "./api";

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