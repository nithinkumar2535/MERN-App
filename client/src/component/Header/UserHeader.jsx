import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import UserCart from "../User/UserCart";
import { toast } from "react-toastify";


function UserHeader(props) {

    const [data,setData] = useState([])
    const [cartQty,setCartQty] = useState();

    function fetchCartData(){
        axios.get('/api/cart')
        .then((response)=>{
            const products = response.data.products;
            console.log(products.length);
            setData(products)

           // Calculate the total quantity of products in the cart
           const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
           setCartQty(totalQuantity);
        })
        .catch((error)=>{
            console.log("Error fethcing cart data",error);
        })
    }



    useEffect(()=>{
       fetchCartData();
       const intervalId = setInterval(fetchCartData,300);
       return()=>clearInterval(intervalId)
    },[])

    const navigate = useNavigate();

    function handleLogout(){
        axios.get('/api/logout')
            .then((result)=>{
                if(result.data === "logoutsuccess"){
                    navigate('/login')
                    toast.success("Logged out successfully")
                }else{
                    console.log(error);
                }
                
            })
            .catch((error)=>{
                console.log(error);
            })
        }
            
    return (
        <>
           

            <header className="p-3 mb-3 border-bottom" style={{backgroundColor:"#272969"}}>
                <div className="container-fluid ">
                    <div className="d-flex flex-wrap align-items-center justify-content-evenly">
                        <div>
                          <Link to={"/"} ><img src={`http://localhost:3000/images/other-images/freshcart-high-resolution-logo-white-transparent.png`} alt="login form"
                                className='img-fluid' style={{ maxWidth: "70px" }} /> </Link>
                        </div>
                        <div className="d-none d-md-flex d-lg-flex d-xl-flex d-xxl-flex" >
                            <input type="text" placeholder="search products here....." style={{ width: "400px", height: "40px" }} className="ps-3 rounded-start-pill border-0" />
                            <div className="fs-5 bg-primary px-3 d-flex align-items-center justify-content-center rounded-end-pill text-light">
                                <i className="bi bi-search"></i>
                            </div>
                        </div>



                        
                        {props.isLoggedIn ?
                            (
                                
                                <div className="d-flex fs-3">
                                    <div className="dropdown">
                                        <div className="mt-2 d-block link-body-emphasis text-decoration-none dropdown-toggle text-light" data-bs-toggle="dropdown" aria-expanded="false" >
                                            <i className="bi bi-person-circle"></i>
                                        </div>
                                        <ul className="dropdown-menu text-small bg-primary-subtle" style={{}}>
                                            <li><p className="dropdown-item " href="#">{props.name}</p></li>
                                            <li><a className="dropdown-item" href="#">Profile settings</a></li>
                                        </ul>

                                    </div>
                                    <div className="ms-3 mt-2 position-relative">
                                        <Link to={"/cart"} className="text-light"><span><i className="bi bi-cart2"></i></span></Link>
                                        <div className="bg-warning text-dark d-flex  justify-content-center position-absolute rounded-circle" style={{ width: "20px", height: "20px", fontSize: "14px", bottom: "20px", left: "20px" }}>    
                                                <p>{cartQty}</p>    
                                        </div>
                                    </div>
                                    <div className="ms-4 mt-1">
                                        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                                
                            ):
                            (
                                <div className="d-flex">
                                    <div className="mt-2">
                                        <Link to="/login"> <button className="btn btn-outline-light">Login</button></Link>
                                    </div>
                                    <div className="ms-3 mt-2">
                                    <   Link to="/register"> <button className="btn btn-outline-light">Signup</button></Link>
                                    </div>
                                </div>

                            )
                                

                            
                        }

                    </div>
                </div>
            </header>
        </>
    )
}

export default UserHeader;