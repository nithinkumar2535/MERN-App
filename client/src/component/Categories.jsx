import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Categories(){

    const [category,setCategory] = useState([]);

    useEffect(()=>{
        axios.get('/api/products')
        .then((response)=>{
            setProduct(response.data)
        })
    },[])

    
    
    

    return(
            <div className="container">
            <h1>Categories</h1>
            <div className="row m-4">
            { itemCategory.map((category,index)=>(
                <div key={index} className="card m-4" style={{ width: '18rem' }}>
                    <img src={`http://localhost:3000/images/product-images/${product._id}.jpg?timestamp=${new Date().getTime()}`} className="card-img-top" alt="..." style={{maxWidth:"200px",height:"200px",objectFit:"cover"}}/>
                    <div  className="card-body">
                        <h5 className="card-title">{product.itemName}</h5>
                        <p className="card-text">{product.itemDesc}</p>
                        <p className="card-text">{product.itemPrice}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Categories;