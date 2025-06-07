import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/cart';

function Header() {
    const [setCartel] = useState([]);
    const { cart } = useCart();
    const [searchTerm, setSearchTerm] = useState("");
    const auth = JSON.parse(localStorage.getItem("auth"));
    //const [auth] = useAuth(); // ✅ dynamic context
    const navigate = useNavigate();
    console.log(auth); // हे console करा
    // console.log(auth?.token); // हेही console करा

    useEffect(() => {
        const token = auth?.token;
        if (!token) {
            console.warn("No token found. Skipping cart fetch.");
            return;
        }
        fetch("http://localhost:4101/api/cart/getcart", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (resp) => {
                if (!resp.ok) {
                    const errorData = await resp.json();
                    throw new Error(errorData.message || "Failed to fetch cart");
                }
                return resp.json();
            })
            .then((data) => {
                setCartel(data.cartItems || []);
            })
            .catch((error) => {
                console.error("Error fetching cart:", error.message);
            });
        // }, [auth?.token]); // ✅ include the token as a dependency
    }, [auth?.token, setCartel]); // ✅ No warning

    const handleLogout = () => {
        //localStorage.removeItem("user");            
        localStorage.removeItem("auth")
        alert("Logout Successfully");
        navigate("/Signin");
    };
    function handleSearchSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:4101/api/search/${searchTerm}`)
            .then((resp1) => resp1.json())
            .then((resp2) => {
                console.log(resp2);
                // navigate("/search", { state: { values: resp2 } });
                navigate("/search", {
                    state: {
                        values: resp2,
                        keyword: searchTerm,
                    },
                });
            })
            .catch((error) => {
                console.error("Search error:", error);
            });
    }


    const navtoDashboard = () => {
        if (auth?.user?.role === "admin") {
            navigate('/Admindashboard');
        } else {
            navigate('/Userdashboard');
        }
    };

    return (
        <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="ms-5">Flipkart</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/Categories">Categories</Nav.Link>
                        <Nav.Link as={Link} to="/Products">Products</Nav.Link>

                        {/* Admin-specific options */}
                        {auth?.user?.role === "admin" && (              ///"admin"=1
                            <>
                                <Nav.Link as={Link} to="/Addcategory">Add Category</Nav.Link>
                                <Nav.Link as={Link} to="/Addproduct">Add Product</Nav.Link>
                            </>
                        )}
                    </Nav>

                    <Form className="d-flex me-3" onSubmit={handleSearchSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search for Products, Brands and More"
                            className="me-2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>

                    <Nav className="d-flex align-items-center">
                        {!auth ? (
                            <>
                                {/* <Nav.Link as={Link} to="/Signup">Signup</Nav.Link> */}
                                <Nav.Link as={Link} to="/Signup">Signup</Nav.Link>
                                <Nav.Link as={Link} to="/Signin">Signin</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link onClick={navtoDashboard}>Dashboard</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Signout</Nav.Link>
                            </>
                        )}
                        <Nav.Link as={Link} to="/Cartpage">
                            Cart <span className="badge bg-success">{cart?.length || 0}</span>
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;