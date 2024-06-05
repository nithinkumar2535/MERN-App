import React, {useEffect, useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminAddProducts() {

    const [itemName, setItemName] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [itemImage, setItemImage] = useState(null);
    const [itemCategory,setItemCategory] = useState("")
    const [discountPrice,setDiscountPrice] = useState("")
    const [itemWeight,setItemWeight] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('itemWeight',itemWeight);
        formData.append('itemDesc', itemDesc);
        formData.append('itemPrice', itemPrice);
        formData.append('itemImage', itemImage);
        formData.append('itemCategory',itemCategory);
        formData.append('discountPrice',discountPrice)
    
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((result) => {
            console.log(result);
            setItemName("")
            setItemDesc("")
            setItemPrice("")
            setItemImage(null);
            setDiscountPrice("")
            setItemWeight("")
            setItemCategory("")
            document.getElementById("formFile").value = "";
            toast.success("Product added successfully")
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="col-6 mt-4 container">

            <h2>Add Product</h2>
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

                <div className="mb-3  mt-4">
                    <label className="form-label">Default file input example</label>
                    <input 
                        className="form-control" 
                        type="file" 
                        name="itemImage"
                        onChange={(e) => setItemImage(e.target.files[0])}
                        id="formFile" />
                </div>

                <button type="submit" className="btn btn-primary mb-3">Submit</button>
            </form>
        </div>

    )
}

export default AdminAddProducts;