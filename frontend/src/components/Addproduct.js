import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function AddProduct() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [id, setId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // success or error

    function getcategories() {
        fetch("http://localhost:4101/api/category/getcategory")
            .then((resp1) => resp1.json())
            .then((resp2) => {
                if (resp2.success && Array.isArray(resp2.category)) {
                    setCategories(resp2.category);
                } else {
                    setCategories([]); // fallback
                    setMessage("Invalid category data");
                    setMessageType("error");
                }
            })
            .catch((error) => {
                console.log(error);
                setCategories([]); // fallback
                setMessage("Failed to load categories");
                setMessageType("error");
            });
    }

    function getprods() {
        fetch("http://localhost:4101/api/product/getproducts")
            .then((resp1) => resp1.json())
            .then((resp2) => {
                if (resp2.success && Array.isArray(resp2.product)) {
                    setProducts(resp2.product);
                } else {
                    setProducts([]); // fallback
                    setMessage("Invalid product data");
                    setMessageType("error");
                }
            })
            .catch((error) => {
                console.log(error);
                setProducts([]); // fallback
                setMessage("Failed to load products");
                setMessageType("error");
            });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const prod = new FormData();
        prod.append("name", name);
        prod.append("description", description);
        prod.append("price", price);
        prod.append("quantity", quantity);
        if (photo) prod.append("photo", photo);
        prod.append("category", category);

        const url = id
            ? `http://localhost:4101/api/product/update/${id}`
            : `http://localhost:4101/api/product/create`;

        const method = id ? "PUT" : "POST";
        const token = JSON.parse(localStorage.getItem("auth"))?.token;


        fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: prod
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                if (resp2.success) {
                    setMessage(id ? "Product updated successfully!" : "Product added successfully!");
                    setMessageType("success");
                    setName("");
                    setDescription("");
                    setPrice(0);
                    setQuantity(1);
                    setPhoto("");
                    setCategory("");
                    setId(null); // clear edit mode
                    getprods();
                } else {
                    setMessage(resp2.message || "Something went wrong.");
                    setMessageType("error");
                }
            })
            .catch((error) => {
                console.log(error);
                setMessage("Error while submitting product.");
                setMessageType("error");
            });
    }


    useEffect(() => {
        getcategories();
        getprods();
        //eslint-disable-next-line
    }, []);

    function handleEdit(item) {
        setId(item._id); // <-- this is key for update
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setQuantity(item.quantity);
        setCategory(item.category._id);
        console.log("Edit clicked", item);
    }

    function handleDelete(productId) {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const authRaw = localStorage.getItem("auth"); // ✅ read from 'auth'
            if (!authRaw) {
                alert("Admin not logged in. Please login again.");
                return;
            }

            const auth = JSON.parse(authRaw);
            const token = auth?.token;
            const role = auth?.user?.role;

            if (!token || role !== "admin") {
                alert("Unauthorized. Only admin can delete products.");
                return;
            }

            fetch(`http://localhost:4101/api/product/delete/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(async (res) => {
                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.message || "Error deleting product");
                    }
                    setMessage("Product deleted successfully");
                    setMessageType("success");
                    getprods();
                })
                .catch((err) => {
                    console.error("Delete Error:", err.message);
                    setMessage(err.message || "Error deleting product");
                    setMessageType("error");
                });
        }
    }




    return (
        <div className="container mt-4">
            <h2 className="mb-4">Add New Product</h2>

            {message && (
                <div className={`alert alert-${messageType === "success" ? "success" : "danger"}`}>
                    {message}
                </div>
            )}

            {/* <Form onSubmit={addproduct}> */}
            <Form onSubmit={handleSubmit}>
                <Form.Select
                    className='mb-3'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">-- Select Category --</option>
                    {categories?.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </Form.Select>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Product Name:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Price:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            placeholder="Product Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Quantity:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Description:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Product Picture</Form.Label>
                    <Form.Control
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </Form.Group>

                {photo && (
                    <div className='mb-3 text-center'>
                        <img
                            src={URL.createObjectURL(photo)}
                            alt="preview"
                            height="200px"
                            className="img-fluid"
                        />
                    </div>
                )}

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        {/* <Button type="submit">Add Product</Button> */}
                        <Button type="submit">{id ? "Update Product" : "Add Product"}
                        </Button>
                    </Col>
                </Form.Group>
            </Form>

            {/* ✅ Product Cards Display */}
            <div className="col-md-12">
                <h4 className="mb-4 fw-semibold">All Products</h4>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                    {products.map((item, index) => (
                        <div className="col" key={index}>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:4101/api/product/getphoto/${item._id}`}
                                    className="p-3 mx-auto d-block"
                                    style={{ height: '220px', objectFit: 'contain' }}
                                />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <div>
                                        <Card.Title style={{ fontSize: '1rem' }} className="text-center">
                                            {item.name}
                                        </Card.Title>
                                        <Card.Text className="text-muted text-center" style={{ fontSize: '0.9rem' }}>
                                            {item.description?.slice(0, 60)}...
                                        </Card.Text>
                                        <h5 className="text-primary fw-bold text-center">₹ {item.price}</h5>
                                    </div>
                                    <div className="d-flex justify-content-center gap-2 mt-3">
                                        <Button variant="warning" size="sm" onClick={() => handleEdit(item)}>
                                            Edit
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AddProduct;


