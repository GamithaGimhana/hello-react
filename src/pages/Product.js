import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {

    const params = useParams(); //getting URL path variables

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
            }).then((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <h1>Product</h1>
            {product &&
                <>
                    <h2>{product.name}</h2>
                    <div>Qty: {product.qty}</div>
                    <div>Price: {product.price}</div>
                </>
            }
        </div>
    )
}

export default Product;