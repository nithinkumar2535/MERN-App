import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserProducts(props){

    const [data,setData] = useState([]);
    const [cartQty, setCartQty] = useState();

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('/api/products')
        .then((response)=>{
            setData(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

    const handleCart = (itemId)=>{
        axios.post(`/api/add-to-cart/${itemId}`)
        .then((response)=>{
            setCartQty(response.data.cartItems);
            toast.success("product added to cart")
        })
        .catch((error)=>{
            console.log("error adding to cart");
        })
    }
    
    

    return(
            <div className="container-fluid bg-dark-subtle">
            <div className="row ms-5">
            {data.length > 0 ? (
                data.map((item,index)=>(
                    <div key={item._id} className="card ms-5 my-3" style={{ width: '18rem',height:"25rem"}}>
                        <div className="mt-2 d-flex justify-content-center align-items-center" style={{width:"260px",height:"200px"}}>
                            <img src={`http://localhost:3000/images/product-images/${item._id}.jpg?timestamp=${new Date().getTime()}`} className="card-img-top" alt="..." style={{width:"190px",height:"190px", objectFit:"cover"}} />
                        </div>
                        
                        <div  className="card-body">
                            <div className="d-flex">
                            <h5 className="card-title ">{item.itemName}</h5>
                            <p className="card-text text-primary ms-1">({item.itemWeight})</p>
                            </div>
                            <p className="card-text text-black-50">{item.itemDesc}</p>
                            <div className="d-flex">
                                <p className="card-text bg-primary-subtle me-5 fs-5 pe-2"><i className="bi bi-currency-rupee"></i>{item.discountPrice}</p> 
                                <del className="card-text disabled ms-5 fs-5 ps-1 text-dark-emphasis text-muted"><i className="bi bi-currency-rupee"></i>{item.itemPrice}</del> 
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button className="btn btn-primary btn-lg" onClick={()=>{handleCart(item._id)}} >Add to cart</button>
                            </div>   
                        </div>
                    </div>
                ))
            ):(
                <div className="col-md-2 mb-3">
                <div className="card">
                        <img src="http://surl.li/tzmuv" />
                        <div className="card-body">
                            <h5 className="card-title"></h5>
                            <p className="card-text" style={{ minHeight: "50px" }}></p>
                            <p className="card-text">Price: ₹ </p>
                            <button onClick={() => handleCart(item._id)} className="btn btn-outline-danger">+ Cart</button>
                        </div>
                    </div>
            </div>
            )}
             
            </div>
        </div>
        
    )
}

export default UserProducts;