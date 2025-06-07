import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../context/cart'; // Ensure you have this context

function Products() {
  const [products, setProducts] = useState([]);
  const { addtocart } = useCart(); // Use cart context

  useEffect(() => {
    fetch("http://localhost:4101/api/product/getproducts")
      .then((resp) => resp.json())
      .then((data) => {
        if (data && Array.isArray(data.product)) {
          setProducts(data.product);
        } else {
          console.error("Invalid response structure", data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">All Products</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {products.map((item) => (
          <div className="col" key={item._id}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={`http://localhost:4101/api/product/getphoto/${item._id}`}
                onError={(e) => e.target.src = '/images/placeholder.jpg'}
                className="p-3 mx-auto d-block"
                style={{ height: '220px', objectFit: 'contain' }}
              />
              <Card.Body className="text-center d-flex flex-column justify-content-between">
                <div>
                  <Card.Title style={{ fontSize: '1rem' }}>{item.name}</Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {item.description?.slice(0, 60)}...
                  </Card.Text>
                  <h5 className="text-primary fw-bold">₹ {item.price.toLocaleString()}</h5>
                </div>
                <div className="mt-3">
                  <Link to={""}>
                    <Button variant="primary" className="me-2">Details</Button>
                  </Link>
                  <Button variant="success" onClick={() => addtocart(item)}>Add to Cart</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
