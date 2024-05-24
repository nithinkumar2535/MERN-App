import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

function UserCart(){

    const [product,setProduct] = useState([]);

    useEffect(()=>{
        axios.get('/api/cart')
        .then((response)=>{
            setProduct(response.data)
        })
    },[])

    
    

    return(
          
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                    <div className="p-2">
                        <h4>Shopping cart</h4>
                        <div className="d-flex flex-row align-items-center pull-right">
                            <span className="mr-1">Sort by:</span>
                            <span className="mr-1 font-weight-bold">Price</span>
                            <i className="fa fa-angle-down"></i>
                        </div>
                    </div>

                    {product.map((product, index) => (

                        <div key={index} className="row bg-white mt-4 rounded">
                            <div className="col-md-2 d-flex align-items-center">
                                <img
                                    src={`http://localhost:3000/images/product-images/${product._id}.jpg?timestamp=${new Date().getTime()}`}
                                    className="card-img-top"
                                    alt="Product"
                                    style={{ maxWidth: "100px", height: "100px", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-md-5 d-flex flex-column justify-content-center product-details">
                                <span className="font-weight-bold">{product.itemName}</span>
                                <span className="text-grey">{product.itemDesc}</span>
                            </div>
                            <div className="col-md-2 d-flex align-items-center justify-content-center">
                                <div className="d-flex align-items-center qty">
                                    <button className="btn btn-sm">-</button>
                                    <h5 className="text-grey mt-1 mx-2">1</h5>
                                    <button className="btn btn-sm">+</button>
                                </div>
                            </div>
                            <div className="col-md-2 d-flex align-items-center justify-content-center">
                                <h5 className="text-grey">{product.itemPrice}</h5>
                            </div>
                            <div className="col-md-1 d-flex align-items-center justify-content-center">
                                <i className="fa fa-trash text-danger"></i>
                            </div>
                        </div>



                    ))}
                </div>
            </div>


        </div>
    )
}

export default UserCart;