import axios from "axios";
import { useEffect,usestate} from "react";


function UserCart(){

    const [data,setData] = usestate([])

    useEffect(()=>{
        axios.get('/api/cart')
        .then((response)=>{
            console.log(response);
            setCart(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])



    return(
       <div className="container">
            <h1>Products</h1>
            <div className="row m-4">
            { data.map((product,index)=>(
                <div key={index} className="card m-4" style={{ width: '18rem' }}>
                    <img src={`http://localhost:3000/images/product-images/${product._id}.jpg?timestamp=${new Date().getTime()}`} className="card-img-top" alt="..." style={{maxWidth:"200px",height:"200px",objectFit:"cover"}}/>
                    <div  className="card-body">
                        <h5 className="card-title">{data.itemName}</h5>
                        <p className="card-text">{data.itemDesc}</p>
                        <p className="card-text">{data.itemPrice}</p>
                        <button className="btn btn-warning">Buy now</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default UserCart;