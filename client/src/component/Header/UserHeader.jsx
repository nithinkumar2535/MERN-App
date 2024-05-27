import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function UserHeader(props) {

    const navigate = useNavigate();

    function handleLogout(){
        axios.get('/api/logout')
            .then((result)=>{
                if(result.data === "logoutsuccess"){
                    navigate('/login')
                    toast("Logout successfully")
                }
                
            })
        }
            


    return (
        <>
           

            <header className="p-3 mb-3 border-bottom" style={{backgroundColor:"#272969"}}>
                <div className="container-fluid ">
                    <div className="d-flex flex-wrap align-items-center justify-content-evenly">
                        <div>
                          <Link to={"/"} ><img src={`http://localhost:3000/images/other-images/freshcart-high-resolution-logo-transparent.png`} alt="login form"
                                className='img-fluid' style={{ maxWidth: "70px" }} /> </Link>
                        </div>
                        <div className="d-none d-md-flex d-lg-flex d-xl-flex d-xxl-flex" >
                            <input type="text" placeholder="search products here....." style={{ width: "400px", height: "40px" }} className="ps-3 rounded-start-pill border-0" />
                            <div className="fs-5 bg-primary px-3 d-flex align-items-center justify-content-center rounded-end-pill">
                                <i className="bi bi-search"></i>
                            </div>
                        </div>



                        
                        {props.isLoggedIn ?
                            (
                                
                                <div className="d-flex fs-3">
                                    <div className="dropdown">
                                        <div className="mt-2 d-block link-body-emphasis text-decoration-none dropdown-toggle text-primary" data-bs-toggle="dropdown" aria-expanded="false" >
                                            <i className="bi bi-person-circle"></i>
                                        </div>
                                        <ul className="dropdown-menu text-small" style={{}}>
                                            <li><a className="dropdown-item" href="#">{props.name}</a></li>
                                        </ul>

                                    </div>
                                    <div className="ms-3 mt-2 position-relative">
                                        <Link to={"/cart"} className="text-primary"><span><i className="bi bi-cart-fill"></i></span></Link>
                                        <div className="bg-primary d-flex  justify-content-center position-absolute rounded-circle" style={{ width: "20px", height: "20px", fontSize: "14px", bottom: "20px", left: "20px" }}>
                                            <p>0</p>
                                        </div>
                                    </div>
                                    <div className="ms-4 mt-1">
                                        <button className="btn btn-primary btn-sm" onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                                
                            ):
                            (
                                <div className="d-flex">
                                    <div className="mt-2">
                                        <Link to="/login"> <button className="btn btn-primary btn">Login</button></Link>
                                    </div>
                                    <div className="ms-3 mt-2">
                                    <   Link to="/register"> <button className="btn btn-primary btn">Signup</button></Link>
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