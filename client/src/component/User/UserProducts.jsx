import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UserProducts(){

    const [product,setProduct] = useState([]);

    useEffect(()=>{
        axios.get('/api/products')
        .then((response)=>{
            setProduct(response.data)
        })
    },[])

    const handleCart = ((productId)=>{
        axios.post(`/api/add-to-cart/${productId}`)
        .then((result)=>{
            toast("product added to cart");
        })
        .catch((error)=>{
            toast.error("error addding product")
            console.log(error);
        })
    })
    

    return(
            <div className="container">
            <h1>Products</h1>
            <div className="row m-4">
            { product.map((product,index)=>(
                <div key={index} className="card m-4" style={{ width: '18rem' }}>
                    <img src={`http://localhost:3000/images/product-images/${product._id}.jpg?timestamp=${new Date().getTime()}`} className="card-img-top" alt="..." style={{maxWidth:"200px",height:"200px",objectFit:"cover"}}/>
                    <div  className="card-body">
                        <h5 className="card-title">{product.itemName}</h5>
                        <p className="card-text">{product.itemDesc}</p>
                        <p className="card-text">{product.itemPrice}</p>
                        <button className="btn btn-warning" onClick={()=>{handleCart(product._id)}}>Add to cart</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default UserProducts;