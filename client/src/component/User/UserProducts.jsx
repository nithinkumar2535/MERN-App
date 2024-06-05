import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserProducts(props){

    const [data,setData] = useState([]);
    const [cartQty, setCartQty] = useState();
    const [search,setSearch] = useState("")
    const [searchResults,setSearchResults] = useState([])
    const [sortOption,setSortOption] = useState("")

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
        axios.get(`/api/getcart/${itemId}`)
        .then((response)=>{
            setCartQty(response.data.cartItems);
            toast.success("product added to cart")
        })
        .catch((error)=>{
            console.log("error adding to cart");
        })
    }

    const handleSearch =(event)=>{
        const query = event.target.value;
        setSearch(query);
        if(query.length > 0){
            const results = data.filter(item=>
                item.itemName.toLowerCase().includes(query.toLowerCase())
            ).slice(0,5);
            setSearchResults(results)
        }else{
            setSearchResults([]);
        }
    }

    const handleSort = (event)=>{
        setSortOption(event.target.value)
    }
    const sortData = (dataToSort)=>{
        return dataToSort.sort((a,b)=>{
            if(sortOption === "priceLowToHigh"){
                return a.discountPrice - b.discountPrice;
            }else if(sortOption === "priceHighToLow"){
                return b.discountPrice - a.discountPrice;
            }else{
                return 0;
            }
        })
    }
    const sortedData = sortData([...data]);

    const filterData = sortData(data.filter(item=>
        item.itemName.toLowerCase().includes(search.toLowerCase())
    ));
    const displayData = search ? filterData : sortedData
    
    
    

    return(
            <div className="container-fluid bg-dark-subtle">
            <div className="row ms-5">
                <div className="col-3 mt-3 ms-4">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Search for products..."
                        value={search}
                        onChange={handleSearch}
                    />
                    {searchResults.length > 0 && (
                        <ul className="list-group mt-2">
                            {searchResults.map(item => (
                                <li className="list-group-item" key={item._id}>
                                    {item.itemName}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                
                <div className="col-3 mt-3">
                    <select className="form-select" value={sortOption} onChange={handleSort}>
                        <option value="">Sort by</option>
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="row ms-5">
                {displayData.length > 0 ? (
                    displayData.map((item,index)=>(
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
                            {props.isLoggedIn ? (
                                <button className="btn btn-primary btn-lg"  onClick={()=>{handleCart(item._id)}} >Add to cart</button>
                            ):(
                                 <Link to={'/login'}><button className="btn btn-primary btn-lg">Add to cart</button></Link>
                            )}
                                
                            </div>   
                        </div>
                    </div>
                ))
            ):(
                <div className="col-md-2 mb-3">
                <div className="card">
                        <p>No product available</p>
                    </div>
            </div>
            )}
             
            </div>
        </div>
        
    )
}

export default UserProducts;