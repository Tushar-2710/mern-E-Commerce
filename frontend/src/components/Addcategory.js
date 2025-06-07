import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Addcategory() {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'

    // ✅ Get all categories
    function getCategories() {
        fetch("http://localhost:4101/api/category/getcategory")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.category || []);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
                setMessage("Failed to fetch categories");
                setMessageType("error");
            });
    }

    // ✅ Add or Update category
    function addcategory(e) {
        e.preventDefault();

        if (!name.trim()) {
            setMessage("Category name cannot be empty");
            setMessageType("error");
            return;
        }

        const cat = { name };
        const url = editMode
            ? `http://localhost:4101/api/category/updatecategory/${editId}`
            : "http://localhost:4101/api/category/create";
        const method = editMode ? "PUT" : "POST";

        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(cat)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setMessage(editMode ? "Category updated successfully" : "Category added successfully");
                    setMessageType("success");
                    setName("");
                    setEditMode(false);
                    setEditId(null);
                    getCategories();
                } else {
                    setMessage(data.message || "Operation failed");
                    setMessageType("error");
                }
            })
            .catch((err) => {
                console.error("Category error:", err);
                setMessage("Error occurred");
                setMessageType("error");
            });
    }

    // ✅ Delete category

    function handleDelete(id) {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        // const token = storedAdmin ? JSON.parse(storedAdmin).token : null;

        if (!token) {
            alert("You must be logged in as admin to delete categories.");
            return;
        }

        if (window.confirm("Are you sure you want to delete this category?")) {
            fetch(`http://localhost:4101/api/category/deletecategory/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setMessage("Category deleted successfully");
                        setMessageType("success");
                        getCategories();
                    } else {
                        setMessage(data.message || "Delete failed");
                        setMessageType("error");
                    }
                })
                .catch((err) => {
                    console.error("Delete error:", err);
                    setMessage("Error while deleting category");
                    setMessageType("error");
                });
        }
    }

    // ✅ Edit category
    function handleEdit(cat) {
        setEditMode(true);
        setEditId(cat._id);
        setName(cat.name);
    }

    useEffect(function () {
        getCategories();
    }, []);

    return (
        <div className='container mt-5'>
            <h2 className='mb-4'>{editMode ? "Edit Category" : "Add New Category"}</h2>

            {message && (
                <div className={`alert alert-${messageType === "success" ? "success" : "danger"}`}>
                    {message}
                </div>
            )}

            <Form onSubmit={addcategory}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Category Name:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">{editMode ? "Update" : "Add"} Category</Button>
                        {editMode && (
                            <Button variant="secondary" className="ms-2" onClick={() => {
                                setEditMode(false);
                                setName("");
                                setEditId(null);
                            }}>
                                Cancel
                            </Button>
                        )}
                    </Col>
                </Form.Group>
            </Form>


            <div className="mt-4">
                <h4>All Categories</h4>
                <div className="list-group">
                    {categories.map(function (cat, index) {
                        return (
                            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>{cat.name}</div>
                                <div>
                                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(cat)}>Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(cat._id)}>Delete</Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Addcategory;
