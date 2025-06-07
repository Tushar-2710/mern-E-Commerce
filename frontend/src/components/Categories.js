import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../context/cart'; // Assuming you have this

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addtocart } = useCart(); // Assuming addtocart is in context

  useEffect(() => {
    fetch("http://localhost:4101/api/category/getcategory")
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data.category || []);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setLoading(true);

    fetch("http://localhost:4101/api/product/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        checked: [categoryId],
        radio: []
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.fproducts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };



  return (
    <Layout title="Categories - Ecommerce App">
      <div className="container mt-5">
        <h2 className="mb-4">Browse Categories</h2>

        <ListGroup>
          {categories.map((item) => (
            <ListGroup.Item
              key={item._id}
              action
              variant={item._id === selectedCategoryId ? "primary" : "light"}
              onClick={() => handleCategoryClick(item._id)}
              style={{ cursor: 'pointer' }}
              className="d-flex justify-content-between"
            >
              <strong>{item.name}</strong>
              <small>{item.type}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {selectedCategoryId && (
          <>
            <h3 className="mt-5">
              Products in "{categories.find(c => c._id === selectedCategoryId)?.name}"
            </h3>

            {loading ? (
              <p>Loading products...</p>
            ) : products.length ? (
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((item, index) => (
                  <div className="col" key={index}>
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
                          <h5 className="text-primary fw-bold">₹ {item.price}</h5>
                        </div>
                        <div className="mt-3">
                          <Button variant="primary" className="me-2">Details</Button>
                          <Button variant="success" onClick={() => addtocart(item)}>Add to Cart</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No products found in this category.</p>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default Categories;
