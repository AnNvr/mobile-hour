import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const style = {
    backgroundImage:
        "url(https://images.unsplash.com/photo-1535240073203-05bc5d7f1113?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
    width: "300px",
    height: "300px",
};

export default function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // define params for filtering products by brand
    const [searchParams, setSearchParams] = useSearchParams();
    const brandFilter = searchParams.get("brand");

    // error handling here:
    if (error) {
        return (
            <div aria-live="assertive">
                <div role="alert" className="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Error! {error.message}</span>
                </div>
            </div>
        );
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const filteredProducts = brandFilter
        ? products.filter((product) => product.brand === brandFilter)
        : products;

    return (
        <div>
            <div className="flex gap-4 justify-center md:justify-start">
                <button
                    className="bg-[#FFEAD0] px-4 py-2 rounded-lg font-cursive font-semibold"
                    onClick={() => setSearchParams({ brand: "Fruit" })}
                >
                    Fruit
                </button>
                <button
                    className="bg-[#FFEAD0] px-4 py-2 rounded-lg font-cursive font-semibold"
                    onClick={() => setSearchParams({ brand: "Panoramic" })}
                >
                    Panoramic
                </button>
                <button
                    className="bg-[#FFEAD0] px-4 py-2 rounded-lg font-cursive font-semibold"
                    onClick={() => setSearchParams({})}
                >
                    Clear Filters
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center mb-14">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.ID} className="rounded-lg py-4 ">
                            <Link
                                to={`/products/${product.ID}`}
                                className="block bg-white rounded-lg shadow-sm overflow-hidden mb-4 transform transition duration-500 hover:scale-105"
                                state={{
                                    search: `?${searchParams.toString()}`,
                                    brand: brandFilter,
                                }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1535240073203-05bc5d7f1113?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Product"
                                    className="h-80 w-72 object-cover rounded-t-xl"
                                />
                                <div className="px-4 py-3 w-72">
                                    <span className="text-gray-400 mr-3 uppercase text-xs">
                                        {product.brand}
                                    </span>
                                    <p className="text-lg font-bold text-black truncate block capitalize">
                                        {product.model}
                                    </p>
                                    <div className="flex items-center">
                                        <p className="text-lg font-semibold text-black cursor-auto my-3">
                                            {product.price}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div>No products found.</div>
                )}
            </div>
        </div>
    );
}
