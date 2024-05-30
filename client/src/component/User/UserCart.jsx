import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { UserContext } from "../Header/UserHeader";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function UserCart(){

    const [product,setProduct] = useState([]);
    const [itemCount,setItemCount] = useState();

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('/api/cart')
        .then((response)=>{
         const products = response.data.products.map(product=>({...product,quantity:1}));
         setProduct(products)
         setItemCount(response.data.products.length)
           
        })
        .catch((err)=>{
          console.log(err);
        })
    },[])

    const handleQuantityChange = (index,newQuantity)=>{
      const updateProducts = [...product];
      updateProducts[index].quantity = newQuantity;
      setProduct(updateProducts)
    }
    

    const handleDelete = (itemId) => {
      axios.delete(`/api/delete-cart-item/${itemId}`)
          .then((response) => {
              const newData = product.filter(item => item._id !== itemId);
              setProduct(newData);
              toast("Item removed from cart")
          })
          .catch((error) => { console.error(error); toast.error("error") });
  };
  const calculateToatlPrice = ()=>{
    return product.reduce((total,product)=>total + (product.discountPrice * product.quantity),0)
  }

    
    

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
                          <h6 className="mb-0 "> {itemCount}items</h6>
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
                            <button className="btn btn-link btn-sm" onClick={()=>handleQuantityChange(index,Math.max(product.quantity-1,1))}>
                              <i className="bi bi-dash"></i>
                            </button>

                            <input readOnly type="number" value={product.quantity} onChange={(e) => handleQuantityChange(index, e.target.value)} className="text-end" style={{maxWidth:"40px"}}/>

                            <button className="btn btn-link btn-sm" onClick={()=>handleQuantityChange(index,product.quantity+1)}>
                            <i className="bi bi-plus"></i>
                            </button>
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 className="mb-0"><i className="bi bi-currency-rupee"></i>{product.discountPrice * product.quantity}</h6>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <button className="btn btn-danger" onClick={()=>handleDelete(product._id)}>Remove</button>
                          </div>
                          <hr className="my-4" />
                        </div>
                        
                        ))}

                        
                        <div className="pt-5">
                          <h6 className="mb-0"><Link to={'/'} className="text-body"><i className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</Link></h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">{itemCount}items</h5>
                          <h5><i className="bi bi-currency-rupee"></i> {calculateToatlPrice()}</h5>
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
                          <h5><i className="bi bi-currency-rupee"></i> {calculateToatlPrice()}</h5>
                        </div>

                        <button type="button" className="btn btn-primary btn-block btn-lg">Buy now</button>
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