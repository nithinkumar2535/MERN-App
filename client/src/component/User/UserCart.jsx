import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { UserContext } from "../Header/UserHeader";
import { useNavigate } from "react-router-dom";

function UserCart(){

    const [product,setProduct] = useState([]);
    const [itemCount,setItemCount] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('/api/cart')
        .then((response)=>{
          if(response.status === 200 && response.data.message === "empty cart"){
            toast.warning("Your cart is empty")
            navigate('/')
          }else{
            setProduct(response.data)
          }
           
        })
    },[])

    axios.get('/api/cart-item-count')
        .then((response)=>{
            if(response.status === 200){
                setItemCount(response.data.itemCount)
            }
        })
        .catch((err)=>{
            
        })

    const handleDelete = (itemId) => {
      axios.delete(`/api/cart/${itemId}`)
          .then((response) => {
              // Filter out the deleted item from the data array
              const newData = data.filter(item => item._id !== itemId);
              setProduct(newData);
              toast("Item removed from cart")
          })
          .catch((error) => { console.error(error); toast.error("error") });
  };

    
    

    return(
          
         <section className="h-100 h-custom" style={{ backgroundColor: '#d2c9ff' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div className="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                          <h6 className="mb-0 ">{itemCount} items</h6>
                        </div>
                        <hr className="my-4" />
                        {product.map((product, index) => (
                        <div key={index} className="row mb-1 d-flex justify-content-between align-items-center">

                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img src={`http://localhost:3000/images/product-images/${product._id}.jpg?timestamp=${new Date().getTime()}`} className="img-fluid rounded-3" alt="Cotton T-shirt" 
                            style={{ maxWidth: "100px", height: "80px", objectFit: "cover" }}/>
                          </div>

                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <div className="d-flex">
                            <h6 className="text-muted me-1">{product.itemName} </h6>
                            <h6 className="text-muted">({product.itemWeight}) </h6>
                            </div>
                            <h6 className="text-black mb-0">{product.itemDesc}</h6>
                          </div>

                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button className="btn btn-link btn-sm" onClick={() => document.getElementById(`form${index}`).stepDown()}>
                              <i className="bi bi-dash"></i>
                            </button>

                            <input type="number" id={`form${index}`} defaultValue="1"  className="text-end" style={{maxWidth:"40px"}}/>

                            <button className="btn btn-link btn-sm" onClick={() => document.getElementById(`form${index}`).stepUp()}>
                            <i className="bi bi-plus"></i>
                            </button>
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 className="mb-0"><i class="bi bi-currency-rupee"></i>{product.itemPrice}</h6>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <button className="btn btn-danger" onClick={handleDelete}>Remove</button>
                          </div>
                          <hr className="my-4" />
                        </div>
                        
                        ))}

                        
                        <div className="pt-5">
                          <h6 className="mb-0"><a href="#!" className="text-body"><i className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">items {itemCount}</h5>
                          <h5>€ 132.00</h5>
                        </div>

                        <h5 className="text-uppercase mb-3">Shipping</h5>

                        <div className="mb-4 pb-2">
                          <select>
                            <option value="1">Standard-Delivery- €5.00</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                          </select>
                        </div>

                        <h5 className="text-uppercase mb-3">Give code</h5>

                        <div className="mb-5">
                          <div className="form-outline">
                            <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="form3Examplea2">Enter your code</label>
                          </div>
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total price</h5>
                          <h5>€ 137.00</h5>
                        </div>

                        <button type="button" className="btn btn-dark btn-block btn-lg">Register</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default UserCart;