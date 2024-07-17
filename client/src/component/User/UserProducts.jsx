import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Body from "../Body";


function UserProducts(props){
    

    const [data,setData] = useState([]);
    const [cartQty, setCartQty] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products`)
        .then((response)=>{
            setData(response.data)
            setLoading(false)
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false)
        })
    },[])

    const handleCart = (itemId)=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getcart/${itemId}`)
        .then((response)=>{
            if(!props.isLoggedIn){
               navigate('/login')
                return
            }
            setCartQty(response.data.cartItems);
            toast.success("product added to cart")
            log("success")
        })
        .catch((error)=>{
            console.log("error adding to cart");
        })
    }
 

    return (
      <div className="container-fluid bg-dark-subtle">
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <div className="row ms-5">
            {data.length > 0 ? (
              data.map((item) => (
                <div
                  key={item._id}
                  className="card ms-5 my-3"
                  style={{ width: "18rem", height: "25rem" }}
                >
                  <div
                    className="mt-2 d-flex justify-content-center align-items-center"
                    style={{ width: "260px", height: "200px" }}
                  >
                    <img
                      src={`${
                        import.meta.env.VITE_SERVER_URL
                      }/images/product-images/${
                        item._id
                      }.jpg?timestamp=${new Date().getTime()}`}
                      className="card-img-top"
                      alt="..."
                      style={{
                        width: "190px",
                        height: "190px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="card-body">
                    <div className="d-flex">
                      <h5 className="card-title ">{item.itemName}</h5>
                      <p className="card-text text-primary ms-1">
                        ({item.itemWeight})
                      </p>
                    </div>
                    <p className="card-text text-black-50">{item.itemDesc}</p>
                    <div className="d-flex">
                      <p className="card-text bg-primary-subtle me-5 fs-5 pe-2">
                        <i className="bi bi-currency-rupee"></i>
                        {item.discountPrice}
                      </p>
                      <del className="card-text disabled ms-5 fs-5 ps-1 text-dark-emphasis text-muted">
                        <i className="bi bi-currency-rupee"></i>
                        {item.itemPrice}
                      </del>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-primary btn-lg"
                        onClick={() => {
                          handleCart(item._id);
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-md-2 mb-3">
                <div className="card">
                  <p>No product available</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
}

export default UserProducts;