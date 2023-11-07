import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {

    const params = useParams(); //getting URL 

    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProduct();
    });

    const getProduct = () => {
        fetch(`http://localhost:8080/products/${params.id}`) //using ID path variable from params
            .then((response) => {
                return response.json();
            }).then((data) => {
                setProduct(data);

            }).catch((error) => {
                console.log(error);
            })
    }

    return(
        <div>
            <h1>Product</h1>
        </div>
    )
}

export default Product;