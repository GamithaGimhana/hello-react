import axios from "axios";
import { useEffect, useState } from "react";

const Order = () => {

    const [products, setProducts] = useState(null);
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);

    const getProducts = async () => {
        const response = await axios.get("http://localhost:8080/products");
        setProducts(response.data);
    }

    useEffect(() => {
        getProducts();
    }, [])

    const calculateTax = (total) => {
        setTax(total/100*15);
    }

    useEffect(() => {
        calculateTax(total);
    },[total]) //whenever total State object changes, this get triggerred. 

    const createOrder = async () => {
        const productIds = orders.map(product => product.id); //assign IDs of the products to a single array
        
        const data = {
            "products": productIds
        }

        const response = await axios.post("http://localhost:8080/orders", data);
        
        if(response.status === 200) {
            setOrders([]);
            setTotal(0);
            setTax(0);
        } else {
            //show error message
        }
    }

    return (
        <div className="container">
            <div className="heading text-center">
                <h1>Orders</h1>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <h2>Products</h2>

                    {products && products.map(product => (
                        <div key={product.id} className="product shadow-sm bordered bg-light px-3 py-3 mb-3">
                            <div className="row">
                                <div className="col">
                                    <h5>{product.name}</h5>
                                    <h6>{product.price}</h6>
                                </div>
                                <div className="col text-end">
                                    <button className="btn btn-primary" onClick={() => {
                                        setOrders([...orders, product]);

                                        //calculating Total
                                        const productTotal = total + product.price;
                                        setTotal(productTotal);
                                    }}>Add</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-6">
                    <h2>Orders</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    Product Id
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(product => (
                                <tr>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                        <thead>
                            <tr>
                                <th colSpan={2}>
                                    Total
                                </th>
                                <th>
                                    {total}
                                </th>
                            </tr>
                            <tr>
                                <th colSpan={2}>
                                    Tax
                                </th>
                                <th>
                                    {tax}
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <button className="btn btn-secondary" onClick={createOrder}>Complete Order</button>
                </div>
            </div>
        </div>
    )
}

export default Order;