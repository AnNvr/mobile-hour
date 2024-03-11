import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { createProduct, updateProduct, deleteProduct, getProducts } from "../../api";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Dashboard() {
    const { user } = useAuth()
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
        setSelectedVan(null)
    };

    const openUpdateModal = (van) => {
        setSelectedVan(van)
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

    return(
        <div className="flex min-h-screen bg-gray-100">

        <div className="flex">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h2>Welcome, {user ? user.displayName || 'User' : 'Guest'}</h2>
            </div>
        </div>
    </div>
    )
}