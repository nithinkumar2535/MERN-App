import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUp() {

    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/`, { withCredentials: true })
            .then((result) => {
                if(result.data.Valid){
                    navigate('/')
                }else{
                    navigate('/login')
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/login`, {email, password})
            .then((result)=>{
                if(result.data.Login){
                    navigate('/')
                    toast.success("Login successful")
                }else if(result.data === "incorrect password"){
                    toast.error("Invalid password")
                }else{
                    toast.error("Invalid email")
                }

            })
            .catch((error)=>{
                console.log(error)
            })
    }


    return (
        <div>
            <section className="vh-100 bg-primary-subtle">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src={`${import.meta.env.VITE_SERVER_URL}/images/other-images/login-image.jpg`} alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <form onSubmit={handleSubmit}>

                                                <div className="d-flex align-items-center mb-3 pb-1 justify-content-center">
                                                <img src={`${import.meta.env.VITE_SERVER_URL}/images/other-images/freshcart-high-resolution-logo-transparent.png`} alt="login form" className='img-fluid' style={{maxWidth:"150px"}}/>
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>

                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <input type="email" id="form2Example17" className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} name="email" required />
                                                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <input type="password" id="form2Example27" className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} name="password" required />
                                                    <label className="form-label" htmlFor="form2Example27">Password</label>
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                                                </div>

                                                <a className="small text-muted" href="#!">Forgot password?</a>
                                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account? <Link to="/register" style={{ color: "#393f81" }}>Register here</Link></p>
                                            </form>
                                            <p> <Link to={'/'}>Back to Home</Link></p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp;