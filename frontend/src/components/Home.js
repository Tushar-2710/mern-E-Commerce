import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Prices } from './Prices';
import Layout from '../components/Layout';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import { useCart } from '../context/cart'; // Import context
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [aproducts, setAproducts] = useState([]);  // ensure initialized as array
  const [pcategories, setPcategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const { fetchCart } = useCart(); // Destructure fetchCart from context
  const navigate = useNavigate();
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState('');   //for navbar
  const [showNoProductMsg, setShowNoProductMsg] = useState(false);           //for navbar


  const auth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    getcategories();
    getprods();
  }, []);

  const getcategories = () => {
    fetch("http://localhost:4101/api/category/getcategory")
      .then((res) => res.json())
      .then((data) => {
        setPcategories(data.category || []);
      })
      .catch((err) => console.error(err));
  };

  const getprods = () => {
    fetch("http://localhost:4101/api/product/getproducts")
      .then((res) => res.json())
      .then((data) => {
        setAproducts(data.product || []);
      })
      .catch((err) => console.error(err));
  };
  const filterproduct = () => {
    fetch("http://localhost:4101/api/product/filter", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked, radio })
    })
      .then((res) => res.json())
      .then((data) => {
        setAproducts(data.fproducts || []);
      })
      .catch((err) => console.error(err));
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getprods();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterproduct();
    }
    // }, [checked, radio]);
  }, [checked, radio, filterproduct]); // ✅ Warning resolved



  const addtocart = (item) => {
    const token = auth?.token;
    const userId = auth?.user?._id;

    if (!token || !userId) {
      alert("Please login to add item to cart");
      return;
    }
    fetch(`http://localhost:4101/api/cart/addtocart/${item._id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: item.name,
        slug: item.slug,
        price: item.price,
        description: item.description,
        category: item.category?._id || item.category,
        quantity: 1
      })
    })
      .then(res => res.json())
      .then(data => {
        // 🧼 Always remove old toast (even if still visible)
        toast.dismiss();
        // 🛒 Show fresh toast with slide effect from bottom-left
        toast.success("Item added to cart!", {
          icon: "🛒",
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          //className: "custom-toast-move",
          style: {
            backgroundColor: "#e6f4ea",
            color: "#0b8e0b",
            fontWeight: "bold",
            fontSize: "14px",
            borderRadius: "8px",
            width: "300px",
            marginBottom: "10px",
          },
        });

        fetchCart(); // ✅ update cart count
      })
      .catch(err => {
        console.error("Error adding to cart:", err);
        toast.dismiss();
        toast.error("Error adding to cart!", {
          icon: "❌",
          position: "bottom-left",
          className: "toast-slide-left-to-center",
          style: {
            backgroundColor: "#fdecea",
            color: "#b00020",
            fontWeight: "bold",
            fontSize: "14px",
            borderRadius: "8px",
            width: "300px",
          },
        });
      });
  };
  const handleCategoryClick = (title) => {
    const categoryObj = pcategories.find(cat => cat.name.toLowerCase() === title.toLowerCase());
    if (!categoryObj) return;

    setSelectedCategoryTitle(title);
    setShowNoProductMsg(false); // Reset message

    fetch("http://localhost:4101/api/product/filter", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checked: [categoryObj._id], radio: [] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAproducts(data.fproducts || []);
        setShowNoProductMsg((data.fproducts || []).length === 0); // Show message if empty
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setAproducts([]);
        setShowNoProductMsg(true);
      });
  };


  return (
    <Layout title="Home - Ecommerce App">
      <main className="container">
        <ToastContainer />

        {/* Header with Categories Navigation */}
        <header>
          <Navbar expand="lg" className="bg-body-tertiary mt-2 mb-3">
            <nav className="row w-100 justify-content-around">
              {[
                { img: '1.webp', title: 'Grocery' },
                { img: '2.webp', title: 'Mobiles' },
                { img: '3.webp', title: 'Fashion' },
                { img: '4.webp', title: 'Electronics' },
                { img: '5.webp', title: 'Home & Furniture' },
                { img: '6.webp', title: 'Appliances' },
                { img: '7.webp', title: 'Beauty, Toys & More' },
              ].map((item, index) => (
                <Col
                  key={index}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCategoryClick(item.title)}
                >
                  <Card.Img src={`/images/${item.img}`} style={{ width: '64px', height: '64px' }} />
                  <Card.Title className="text-center" style={{ fontSize: '0.9rem' }}>{item.title}</Card.Title>
                </Col>
              ))}


            </nav>
          </Navbar>

          <h2 className="mb-4 text-center fw-bold">Welcome to Online Shopping</h2>
        </header>

        {/* Main Content Area */}
        <div className="row">

          {/* Aside Sidebar Filters */}
          <aside className="col-md-3 mb-4">
            <button
              className="btn btn-outline-primary w-100 d-md-none mb-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#filterCollapse"
            >
              <i className="bi bi-funnel"></i> Show Filters
            </button>

            <div id="filterCollapse" className="collapse d-md-block">
              <div className="border border-2 rounded p-3 shadow-sm sticky-filter">
                <h5 className="text-center mb-3">Filter by Category</h5>
                <div className="filter-scroll">
                  {Array.isArray(pcategories) && pcategories.map((cat) => (
                    <div className="form-check" key={cat._id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`cat-${cat._id}`}
                        onChange={(e) => handleFilter(e.target.checked, cat._id)}
                      />
                      <label className="form-check-label" htmlFor={`cat-${cat._id}`}>
                        {cat.name}
                      </label>
                    </div>
                  ))}
                </div>

                <h5 className="text-center mt-4 mb-3">Filter by Price</h5>
                <div className="filter-scroll">
                  {Prices.map((p) => (
                    <div className="form-check" key={p._id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priceFilter"
                        id={`price-${p._id}`}
                        onChange={() => setRadio(p.array)}
                      />
                      <label className="form-check-label" htmlFor={`price-${p._id}`}>
                        {p.name}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-3">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => window.location.reload()}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Listing Section */}
          <section className="col-md-9">
            {/* <h4 className="mb-4 fw-semibold">All Products</h4> */}
            <h4 className="mb-4 fw-semibold">
              {selectedCategoryTitle ? `Products in "${selectedCategoryTitle}"` : "All Products"}
            </h4>
            {showNoProductMsg && (
              <p className="text-muted">No products found in this category.</p>
            )}
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {Array.isArray(aproducts) && aproducts.map((item, index) => (
                <article className="col" key={index}>
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
                        <Button variant="primary" className="me-2" onClick={() => navigate(`/product/${item.slug}`)}>
                          Details
                        </Button>
                        <Button variant="success" onClick={() => { addtocart(item); }}>
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </Layout>

  );
}