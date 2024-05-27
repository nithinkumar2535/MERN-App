import axios from "axios";
import { useEffect, useState } from "react";


function DealOfTheDay(){
    const[product,setProduct] = useState("")
    useEffect(()=>{
        axios.get('/api/products')
        .then((response)=>{
            setProduct(response.data)
        })
    },[])

    let todayDeal = product.filter(product=>product.itemCategory=="Deal of the Day");
    const listItem = todayDeal.map(todayDeal=><li key={todayDeal.id}>{todayDeal.name}</li>)

    return(
        <div className="container">
            <ul>
                {listItem}
            </ul>
        </div>
    )
}

export default DealOfTheDay;