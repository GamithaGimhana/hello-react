import { Link } from "react-router-dom";

const Home = () => {

    const getProducts = () => {
        fetch("http://localhost:8080/products")
            .then((response) => {
                return response.json();
            }).then((data) => {
                setProducts(data);

            }).catch((error) => {
                console.log(error);
            })
    }

    return(
        <div>
            <h1>Home</h1>
            <Link to="/product">Products</Link>
            <button onClick={getProducts}>Load Products</button>

            {products &&
                <ul>
                    {products.map((product) => ( 
                        <li key={product.id}>
                            <Link to={`/products/${product.id}`}>
                            {product.name}</Link>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Home;