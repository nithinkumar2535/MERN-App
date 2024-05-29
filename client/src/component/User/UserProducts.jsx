import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserProducts(props){

    const [product,setProduct] = useState([]);

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('/api/products')
        .then((response)=>{
            setProduct(response.data)
        })
    },[])

    const handleCart = (productId)=>{
        axios.post(`/api/add-to-cart/${productId}`)
        .then((response)=>{
            if(response.status === 200 && response.data.message === "success"){
                toast.success("Product added to cart")
                navigate('/')
            }else if(response.status === 200 && response.data.message === "already in cart"){
                toast.warning("Product already in cart")
            }else{
                console.log(error);
                toast.error("Error")
            }
            
        })
        .catch((error)=>{
            navigate('/login')
        })
    }
    
    

    return(
            <div className="container-fluid bg-dark-subtle">
            <div className="row ms-5">
            { product.map((product,index)=>(
                <div key={index} className="card ms-5 my-3" style={{ width: '18rem',height:"25rem"}}>
                    <div className="mt-2 d-flex justify-content-center align-items-center" style={{width:"260px",height:"200px"}}>
                        <img src={`http://localhost:3000/images/product-images/${product._id}.jpg?timestamp=${new Date().getTime()}`} className="card-img-top" alt="..." style={{width:"190px",height:"190px", objectFit:"cover"}} />
                    </div>
                    
                    <div  className="card-body">
                        <div className="d-flex">
                        <h5 className="card-title ">{product.itemName}</h5>
                        <p className="card-text text-primary">({product.itemWeight})</p>
                        </div>
                        <p className="card-text text-black-50">{product.itemDesc}</p>
                        <div className="d-flex">
                            <p className="card-text bg-primary-subtle me-5 fs-5 p-1">Rs.{product.discountPrice}</p> 
                            <del className="card-text disabled ms-5 fs-5 p-1 text-dark-emphasis">MRP.{product.itemPrice}</del> 
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <button className="btn btn-primary btn-lg" onClick={()=>{handleCart(product._id)}} >Add to cart</button>
                        </div>   
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default UserProducts;