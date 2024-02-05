import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getProductByID } from "../../api/products";

// Add item to cart
function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let found = cart.find(item => item.product.ID === product.ID);
    if (found) {
        found.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Retrieve cart
function getCart() {
    return JSON.parse(localStorage.getItem('shoppingCart')) || [];
}



export default function ProductDetails() {
    const [productByID, setProductByID] = useState({
        ID: "",
        model: "",
        brand: "",
        price: "",
        stock_on_hand: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        async function loadProduct() {
            setLoading(true);
            try {
                const data = await getProductByID(id);
                setProductByID(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [id]);


    const search = location.state?.search || "";
    const brandOfProduct = location.state?.brand || "";

    const { ID, model, brand, price, stock_on_hand } = productByID;

    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                    <Link
                        to={`..${search}`}
                        relative="path"
                        className="back-button"
                    >
                        &larr; <span>Back to {brandOfProduct} products</span>
                    </Link>
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img
                                className="w-full h-full object-cover"
                                src="https://images.unsplash.com/photo-1535240073203-05bc5d7f1113?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Product Image"
                            />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <button
                                    onClick={addToCart}
                                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                    Add to Cart
                                </button>
                            </div>
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            {brand}{" "}{model}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed sed ante justo. Integer euismod libero id
                            mauris malesuada tincidunt.
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">
                                    Price:
                                </span>
                                <span className="text-gray-600 dark:text-gray-300">
                                    {price}
                                </span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">
                                    Availability:
                                </span>
                                <span className="text-gray-600 dark:text-gray-300">
                                    {stock_on_hand}
                                </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">
                                Select Color:
                            </span>
                            <div className="flex items-center mt-2">
                                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                            </div>
                        </div>

                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">
                                Product Description:
                            </span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed sed ante justo. Integer
                                euismod libero id mauris malesuada tincidunt.
                                Vivamus commodo nulla ut lorem rhoncus aliquet.
                                Duis dapibus augue vel ipsum pretium, et
                                venenatis sem blandit. Quisque ut erat vitae
                                nisi ultrices placerat non eget velit. Integer
                                ornare mi sed ipsum lacinia, non sagittis mauris
                                blandit. Morbi fermentum libero vel nisl
                                suscipit, nec tincidunt mi consectetur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
