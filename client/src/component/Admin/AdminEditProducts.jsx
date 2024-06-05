import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

function AdminEditProducts() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [itemName, setItemName] = useState("");
    const [itemDesc, setItemDesc] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemImage, setItemImage] = useState(null);
    const [itemCategory,setItemCategory] = useState("")
    const [discountPrice,setDiscountPrice] = useState("")
    const [itemWeight,setItemWeight] = useState("")
    const [previewImage, setPreviewImage] = useState(""); // State for image preview URL

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/editproducts/${id}`)
            .then((result) => {
                setItemName(result.data.itemName);
                setItemDesc(result.data.itemDesc);
                setItemPrice(result.data.itemPrice);
                setDiscountPrice(result.data.discountPrice);
                setItemWeight(result.data.itemWeight)
                setPreviewImage(`${import.meta.env.VITE_SERVER_URL}/images/product-images/${id}.jpg?timestamp=${new Date().getTime()}`); // Set initial image preview
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setItemImage(file);

        // Generate a preview URL for the selected file
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setPreviewImage(previewURL);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('itemWeight',itemWeight);
        formData.append('itemDesc', itemDesc);
        formData.append('itemPrice', itemPrice);
        formData.append('itemCategory',itemCategory);
        formData.append('discountPrice',discountPrice)
        if (itemImage) {
            formData.append('itemImage', itemImage);
        }

        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/editproducts/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((result) => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="col-6 mt-4">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Item Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="itemName"
                        value={itemName}
                        placeholder="Enter item name" 
                        onChange={(e) => setItemName(e.target.value)} />
                </div>

                <div className="form-group mt-4">
                    <label>Item Category</label>
                    <select className="form-select" aria-label="Default select example" name="itemCategory" onChange={(e) => setItemCategory(e.target.value)} >
                        <option>Select Category....</option>
                        <option>Fresh Fruits</option>
                        <option>Dry Fruits</option>
                        <option>Vegetables</option>
                        <option>Gifts</option>
                        <option>Deal of the Day</option>
                    </select>
                </div>

                <div className="form-group mt-4">
                    <label>Item Weight</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="itemWeight"
                        value={itemWeight}
                        placeholder="Enter item Weight" 
                        onChange={(e) => setItemWeight(e.target.value)} />
                </div>

                <div className="form-group mt-4">
                    <label>Item Description</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="itemDesc"
                        value={itemDesc}
                        placeholder="Enter item description" 
                        onChange={(e) => setItemDesc(e.target.value)} />
                </div>

                <div className="form-group mt-4">
                    <label>Actual Price</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="itemPrice"
                        value={itemPrice}
                        placeholder="Enter price"
                        onChange={(e) => setItemPrice(e.target.value)} />
                </div>

                <div className="form-group mt-4">
                    <label>Discount Price</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="discountPrice"
                        value={discountPrice}
                        placeholder="Enter price"
                        onChange={(e) => setDiscountPrice(e.target.value)} />
                </div>
                <div className="mb-3 mt-4">
                    <label className="form-label">Product Image</label>
                    <input
                        className="form-control"
                        type="file"
                        name="itemImage"
                        onChange={handleImageChange}
                        id="formFile" />
                </div>
                <div className="form-group">
                    <label>Image Preview:</label><br />
                    {previewImage && (
                        <img
                            id="imgView"
                            src={previewImage}
                            alt="Product Image"
                            style={{ width: "100px", height: "100px" }}
                        />
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AdminEditProducts;
