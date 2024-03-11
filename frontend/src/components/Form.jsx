import { useEffect, useState } from "react"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();


export default function Form({ isOpen, onClose, onSubmit, productData = null }) {
    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        brand: "",
        color: "",
        specs: "",
        images: "",
        ...productData
    })

    useEffect(() => {
        if (productData) {
            setFormData({
                id: productData.id,
                name: productData.name,
                description: productData.description,
                price: productData.price.toString(),
                stock: productData.stock,
                brand: productData.brand,
                color: productData.color,
                specs: productData.specs,
                images: productData.images
            })
        } else {
            setFormData({
                id: null,
                name: "",
                description: "",
                price: "",
                stock: "",
                brand: "",
                color: "",
                specs: "",
                images: "",
            })
        }
    }, [productData])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Get the first file
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (file) {
            const storageRef = ref(storage, `products/${file.name}`);
            await uploadBytes(storageRef, file);
            const photoURL = await getDownloadURL(storageRef);
    
        }
        onSubmit(formData);
        onClose(); // Close modal after form submission
    };

    if (!isOpen) return null; // Don't render the modal if it's not open

    return ( 
<dialog open={isOpen} className="modal">
            <div className="modal-box">
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>
                <h3 className="font-bold text-lg my-2">
                    {productData? "Edit Product" : "Create Product"}
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="input input-bordered w-full max-w-x"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        className="input input-bordered w-full max-w-x"
                        required
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="input input-bordered w-full max-w-x resize-none"
                        required
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        name="images"
                        placeholder="iamges"
                        className="input input-bordered w-full max-w-x"
                        required
                        value={formData.imageUrl}
                        onChange={handleFileChange}
                    />
                    <button type="submit" className="btn btn-primary">
                        {productData ? "Update" : "Create"}
                    </button>
                </form>
                
            </div>
        </dialog>
    )
}