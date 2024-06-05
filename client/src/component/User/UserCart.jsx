import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Razorpay from 'razorpay'

function UserCart(){

    const [data,setData] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0)
    const [cartQty,setCartQty] = useState();
    

    const navigate = useNavigate();

    const calculateTotalPrice = (products)=>{
      return products.reduce((acc,item)=>acc + (item.discountPrice * item.quantity),0)
    }

    function fetchCartData(){
      axios.get(`${import.meta.env.VITE_SERVER_URL}/api/cart`)
      .then((response)=>{
        const products = response.data.products;
        const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
        setCartQty(totalQuantity);
      })
      .catch((error)=>{
          console.log("Error fethcing cart data",error);
      })
  }

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/cart`)
        .then((response)=>{
         const products = response.data.products
         setData(products)
         
       // Calculate the total price based on the products with their quantities
        const total = calculateTotalPrice(products);
        setTotalPrice(total);
        })
        .catch((err)=>{
          console.log("error fetching cart data",err);
        });
        
        
       const loadRazorpayScript = ()=>{
        return new Promise((resolve)=>{
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = resolve;
          document.body.appendChild(script)
        });
       };

       loadRazorpayScript().then(()=>{
        console.log("Razorpay script loaded");
       });

       fetchCartData()
          const intervalId = setInterval(fetchCartData,300);
          return()=>clearInterval(intervalId);
    },[])

    
    

    const handleDelete = (itemId) => {
      axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/deletefromcart/${itemId}`)
          .then((response) => {
              const newData = data.filter(item => item._id !== itemId);
              setData(newData);
              toast("Item removed from cart")
              const total = calculateTotalPrice(newData);
                setTotalPrice(total);
          })
          .catch((error) => { console.error("error deleting from cart"); toast.error("error") });
  };

  const handleIncrement = (itemId) => {
    axios.put(`${import.meta.env.VITE_SERVER_URL}/api/cart/increment/${itemId}`)
        .then((response) => {
            if (response.data.success) {
                const newData = data.map(item => {
                    if (item._id === itemId) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                setData(newData);
                const total = calculateTotalPrice(newData);
                setTotalPrice(total);
            } else {
                console.error("Failed to increment item quantity");
            }
        })
        .catch((error) => {
            console.error("Error incrementing item quantity:", error);
        });
};


const handleDecrement = (itemId) => {
    axios.put(`${import.meta.env.VITE_SERVER_URL}/api/cart/decrement/${itemId}`)
        .then((response) => {
            if (response.data.success) {
                const newData = data.map(item => {
                    if (item._id === itemId && item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                });
                setData(newData);
                const total = calculateTotalPrice(newData);
                setTotalPrice(total);
            } else {
                console.error("Failed to decrement item quantity");
            }
        })
        .catch((error) => {
            console.error("Error decrementing item quantity:", error);
        });
};

const handleCheckout = ()=>{
  axios.post(`${import.meta.env.VITE_SERVER_URL}/api/create-order`,{amount:totalPrice,quantity: data})
  .then(response=>{
    const {id,amount,currency} = response.data;

    const options = {
      key: 'rzp_test_MMzw9rPU8pmKnQ',
      amount:amount,
      currency: currency,
      name: 'FreshCart',
      description: 'Order Payment',
      order_id: id,
      handler: (response)=>{
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/verify-payment`,response)
        .then(response=>{
          if(response.data.success){
            alert('Payment successful');
            navigate('/order-success');
          }else{
            alert('Payment verification failed')
          }
        })
        .catch(error=>{
          console.error("Payment verification error:",error)
        })
        
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#3399cc'
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  })
  .catch(error=>{
    console.error('Error creating Razorpay order',error)
  })
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
                          <h6 className="mb-0 ">{cartQty} items</h6>
                        </div>
                        <hr className="my-4" />
                        {data.length > 0 ? (
                              data.map((item, index) => (
                                <div key={item._id} className="row mb-1 d-flex justify-content-between align-items-center">
        
                                  <div className="col-md-2 col-lg-2 col-xl-2">
                                    <img src={`${import.meta.env.VITE_SERVER_URL}/images/product-images/${item._id}.jpg?timestamp=${new Date().getTime()}`} className="img-fluid rounded-3" alt="Cotton T-shirt" 
                                    style={{ maxWidth: "100px", height: "80px", objectFit: "cover" }}/>
                                  </div>
        
                                  <div className="col-md-3 col-lg-3 col-xl-3">
                                    <div className="d-flex">
                                    <h6 className="text-muted me-1">{item.itemName} </h6>
                                    <h6 className="text-muted">({item.itemWeight}) </h6>
                                    </div>
                                    <h6 className="text-black mb-0">{item.itemDesc}</h6>
                                  </div>
        
                                  <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                    <button className="btn btn-link btn-sm" onClick={()=> handleDecrement(item._id)}>
                                      <i className="bi bi-dash"></i>
                                    </button>
        
                                    <input readOnly type="number" value={item.quantity}  className="text-end" style={{maxWidth:"40px"}}/>
        
                                    <button className="btn btn-link btn-sm" onClick={()=> handleIncrement(item._id)}>
                                    <i className="bi bi-plus"></i>
                                    </button>
                                  </div>
                                  <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                    <h6 className="mb-0"><i className="bi bi-currency-rupee"></i>{item.discountPrice}</h6>
                                  </div>
                                  <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                    <button className="btn btn-danger" onClick={()=>handleDelete(item._id)}>Remove</button>
                                  </div>
                                  <hr className="my-4" />
                                </div>
                                
                                ))
                        ) : (
                          <div>
                            <h5>No item in cart</h5>
                          </div>
                        )}
                        

                        
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
                          <h5 className="text-uppercase">{cartQty}items</h5>
                          <h5><i className="bi bi-currency-rupee"></i> {totalPrice.toFixed(2)}</h5>
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
                          <h5><i className="bi bi-currency-rupee"></i> {totalPrice.toFixed(2)}</h5>
                        </div>

                        <button type="button" className="btn btn-primary btn-block btn-lg" onClick={handleCheckout}>Buy now</button>
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