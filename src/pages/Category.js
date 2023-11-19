import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Category = () => {

    const params = useParams();

    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        getCategoryById();
        getProductsByCategory();
    },[])

    const getCategoryById = () => {
        fetch(`http://localhost:8080/categories/${params.id}`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                setCategory(data);
            }).catch(error => {
                console.log(error);
            })
    }

    const getProductsByCategory = () => {
        fetch(`http://localhost:8080/categories/${params.id}/products`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                setProducts(data);
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            {category &&
                <h1>Products of {category.name} Category</h1>
            }

            {products &&
                <ul>
                    {products.map(product => (
                        <li>{product.name}</li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Category;