import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function ProductDetails() {
    const [product, setProduct] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4101/api/product/getsingleproduct/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.product);
            });
    }, [slug]);

    const addToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Item added to cart");
    };

    return (
        <Layout title={product?.name}>
            <div className="container mt-4">
                {product ? (
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                src={`http://localhost:4101/api/product/getphoto/${product._id}`}
                                alt={product.name}
                                className="img-fluid"
                            />
                        </div>
                        <div className="col-md-6">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <h4>₹ {product.price}</h4>
                            <p><strong>Category:</strong> {product.category?.name}</p>
                            <button className="btn btn-success" onClick={addToCart}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ) : (
                    <h4>Loading...</h4>
                )}
            </div>
        </Layout>
    );
}
