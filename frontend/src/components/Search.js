import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/cart'; // Import context
import { useNavigate } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const results = location.state?.values || [];
  const keyword = location.state?.keyword || "";
  const { fetchCart } = useCart(); // Destructure fetchCart from context
  const auth = JSON.parse(localStorage.getItem("auth"));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 6;

  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentResults = results.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(results.length / resultsPerPage);
  const navigate = useNavigate();

  function highlight(text, keyword) {
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase()
        ? <mark key={index}>{part}</mark>
        : part
    );
  }
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

  return (
    <div className="container">
      <div className="text-center">
        <h1>Search Results</h1>
        <h6>{results.length < 1 ? "No results found" : `Found ${results.length}`}</h6>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {currentResults.map((item, index) => (

            <div className="col" key={index}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={`http://localhost:4101/api/product/getphoto/${item._id}`}
                  onError={(e) => (e.target.src = '/images/placeholder.jpg')}
                  className="p-3 mx-auto d-block"
                  style={{ height: '220px', objectFit: 'contain' }}
                />
                <Card.Body className="text-center d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title style={{ fontSize: '1rem' }}>
                      {highlight(item.name, keyword)}
                    </Card.Title>
                    <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                      {highlight(item.description?.slice(0, 60), keyword)}...
                    </Card.Text>
                    <h5 className="text-primary fw-bold">₹ {item.price}</h5>
                  </div>
                  <div className="mt-3">
                    <Button variant="primary" className="me-2" onClick={() => navigate(`/product/${item.slug}`)}>
                      Details
                    </Button>
                    <Button variant="success" onClick={() => addtocart(item)}>Add to Cart</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>


          ))}
        </div>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-4">
          {[...Array(totalPages).keys()].map((page) => (
            <Button
              key={page}
              className="mx-1"
              variant={page + 1 === currentPage ? "primary" : "light"}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
