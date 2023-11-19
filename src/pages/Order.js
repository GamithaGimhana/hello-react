import { axios } from "axios";
import { useEffect, useState } from "react";

const Order = () => {
    const [products, setProducts] = useState(null);
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState([]);
    const [tax, setTax] = useState([]);

    
    const getProducts = async () => {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
    }
    
    useEffect(() => {
        getProducts();
    },[])

    const calcuateTax =(total) => {
        setTax(total/100*15);
    }

    useEffect(() => {
        calcuateTax(total);
    },[total])      //whenever total State object changes, this get triggerred.
    
    return (
        <>
            <div className="container-fluid">
                <h1>Orders</h1>
                <div className="row">
                    <div className="col-md-6">
                        <h2>Products</h2>

                        {products && products.map(product => (
                            <div e={product.id} className="product shadow-sm bordered bg-light px-3 py-3 mb-3">
                                <div className="row">
                                    <div className="col">
                                        <h5>{product.name}</h5>
                                        <h6>{product.price}</h6> 
                                    </div>
                                    <div className="col text-end">
                                        <button className="btn btn-primary" onClick={() => {
                                            setOrders([...orders, product]);

                                            //calcuating total
                                            productTotal = total + product.price;
                                            setTotal(productTotal);
                                        }}>Add to Order</button>
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
                                        <td>Product ID</td>
                                        <td>Product Name</td>
                                        <td>Price</td>
                                    </tr>
                                ))}
                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan={2}>Total</th>
                                    <th>{total}</th>
                                </tr>
                                <tr>
                                    <th colSpan={2}>Tax</th>
                                    <th>{tax}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Order;