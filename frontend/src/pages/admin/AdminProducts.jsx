import { useEffect, useState } from "react";
import { createProduct, updateProduct, deleteProduct, getProducts } from "../../api";
import { FaEdit, FaTrash } from "react-icons/fa";
import Form from "../../components/Form"
import Spinner from "../../components/Spinner";

export default function AdminProducts() {
    const [products, setProducts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        async function loadProducts() {
            setLoading(true)
            try {
                const data = await getProducts()
                setProducts(data)
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }
        loadProducts()
    }, [])
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null)
    };

    const openUpdateModal = (product) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    async function handleFormSubmit(formData) {
        if (formData.id) {
            try {
                await updateProduct(formData.id, formData)
                alert("Product updated!")
                setProducts(prev => prev.map(product => (product.id === formData.id ? {...product, ...formData} : product)))
            } catch (e) {
                console.error("Failed to update product", e)
                alert("Failed to update product")
            }
        } else {
            try {
                const newProduct = await createProduct(formData)
                alert("Product created!")
                setProducts(prev => [...prev, {...formData, id: newProduct.id}])
            } catch (e) {
                console.error("Error creating product", e)
                alert("Error creating product")
            }
        }
        closeModal()
    }

    async function handleDeleteProduct(id, name) {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            try {
                await deleteProduct(id)
                alert(`${name} deleted successfully!`);
                setProducts(products.filter(product => product.id !== id))
            } catch (e) {
                console.error("Failed to delete product: ", e)
                alert(`Failed to delete ${name}.`);
            }
        }
    }

    loading ? <Spinner /> : null

    return (
        <div className="container mx-auto my-2 p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Product List</h2>
                <button
                    type="button"
                    className="btn bg-[#FFDDB2] text-[#161616] hover:bg-[#e6c3a0]"
                    onClick={() => setIsModalOpen(true)}
                >
                    List a product
                </button>
            </div>

            {isModalOpen && (
                <Form
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleFormSubmit}
                    productData={selectedProduct}
                />
            )}

            <div className="bg-[#fafafa] border border-[#e6e6e6] rounded-lg overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-[#e6e6e6] bg-[#fafafa] text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">Name</th>
                                <th className="px-5 py-3 border-b-2 border-[#e6e6e6] bg-[#fafafa] text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">Brand</th>
                                <th className="px-5 py-3 border-b-2 border-[#e6e6e6] bg-[#fafafa] text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">Price</th>
                                <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-[#e6e6e6] bg-[#fafafa] text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">Description</th>
                                <th className="px-5 py-3 border-b-2 border-[#e6e6e6] bg-[#fafafa] text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-5 py-5 border-b border-[#e6e6e6] bg-white text-sm">{product.name}</td>
                                    <td className="px-5 py-5 border-b border-[#e6e6e6] bg-white text-sm">{product.brand}</td>
                                    <td className="px-5 py-5 border-b border-[#e6e6e6] bg-white text-sm">{product.price}</td>
                                    <td className="hidden sm:table-cell px-5 py-5 border-b border-[#e6e6e6] bg-white text-sm">{product.description}</td>
                                    <td className="px-5 py-5 bg-white text-sm">
                                        <div className="flex justify-around items-center">
                                            <button
                                                onClick={() => openUpdateModal(product)}
                                                className="text-[#161616] text-lg hover:text-[#FFDDB2]"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id, product.name)}
                                                className="text-[#161616] text-lg hover:text-red-500"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}