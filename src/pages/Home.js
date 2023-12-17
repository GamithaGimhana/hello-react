import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const Home = () => {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        getProducts();
        getCategories();
    }, [])

    const getProducts = async () => {
        try{
            const response = await axios.post("http://localhost:8080/products",data);
            setProducts(response);
        }catch (error) {
            if (error.response.status === 401) {
                navigate("/login");
            }
        }
    }

    const getCategories = async () => {
        try{
            const response = await axios.post("http://localhost:8080/categories",data);
            setCategories(response);
        }catch (error) {
            console.log(error);
        }
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleQty = (event) => {
        setQty(event.target.value);
    }

    const handleCategory = (event) => {
        setCategoryId(event.target.value);
    }

    const createProduct = (event) => {
        event.preventDefault();

        const data = {
            "name": name,
            "price": price,
            "qty": qty,
            "categoryId": categoryId
        }

        fetch("http://localhost:8080/products",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            getProducts();
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <h1>Home</h1>
            
            
            <DatePicker />


            <Link to="/product">Products</Link>
            <button className="btn btn-primary" onClick={getProducts}>Load Products</button>

            {products &&
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <Link to={`/product/${product.id}`}>{product.name}</Link>
                        </li>
                    ))}
                </ul>
            }

            <form onSubmit={createProduct}>
                <div>
                    <label>Product Name</label>
                    <input type="text" required onChange={handleName} />
                </div>
                <div>
                    <label>Product Price</label>
                    <input type="text" onChange={handlePrice} required />
                </div>
                <div>
                    <label>Qty</label>
                    <input type="text" onChange={handleQty} required />
                </div>
                <div>
                    <label>Category</label>
                    <select onChange={handleCategory} required>
                        <option>Please Select</option>

                        {categories && categories.map((category) => (
                            <option value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Save Product</button>
            </form>
        </div>
    )
}

export default Home;