import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Layout from './Layout';
import { useCart } from '../context/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cartpage() {
  const [cartItems, setCartItems] = useState([]);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { fetchCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:4101/api/cart/getcart", {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCartItems(data.cartItems || []);
        } else {
          toast.error("Failed to load cart");
        }
      })
      .catch(() => {
        toast.error("Error fetching cart");
      });
  }, [auth?.token]);

  const totalprice = () => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const updateQuantity = (itemId, type) => {
    const item = cartItems.find((item) => item._id === itemId);
    const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
    if (newQty < 1) return;

    fetch(`http://localhost:4101/api/cart/updatecart/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({ quantity: newQty }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCartItems((prev) =>
            prev.map((i) => (i._id === itemId ? { ...i, quantity: newQty } : i))
          );
          fetchCart();
        } else {
          toast.error("Failed to update quantity");
        }
      })
      .catch(() => {
        toast.error("Error updating quantity");
      });
  };

  const removecartitem = (itemId) => {
    fetch(`http://localhost:4101/api/cart/deletecart/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCartItems((prev) => prev.filter((item) => item._id !== itemId));
          fetchCart();
          toast.success("Item removed from cart");
        } else {
          toast.error("Failed to remove item");
        }
      })
      .catch(() => {
        toast.error("Error removing item");
      });
  };

  return (
    <Layout title="Cart - Ecommerce App">
      <ToastContainer />
      <div className="container mt-4 cart-page">
        <h2 className="mb-4 text-center">Hello {auth?.user?.firstName || 'User'}</h2>
        <h4>You have {cartItems.length} item's in your cart</h4>
        <div className="row">
          <div className="col-md-8">
            {cartItems.length === 0 ? (
              <p className="text-center">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="card mb-3 p-3 shadow-sm">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-3 text-center">
                      <img
                        src={`http://localhost:4101/api/product/getphoto/${item.product._id}`}
                        alt={item.name}
                        height={120}
                        width={120}
                      />
                    </div>
                    <div className="col-md-6">
                      <h5>{item.name}</h5>
                      <p className="mb-1 text-muted">{item.description}</p>
                      <p className="mb-1 fw-semibold">₹{item.price}</p>
                      <div className="d-flex align-items-center">
                        <Button variant="light" onClick={() => updateQuantity(item._id, "dec")}>-</Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button variant="light" onClick={() => updateQuantity(item._id, "inc")}>+</Button>
                      </div>
                    </div>
                    <div className="col-md-3 text-end">
                      <Button variant="danger" onClick={() => removecartitem(item._id)}>Remove</Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="col-md-4">
            {/* Delivery Address */}
            <div className="card p-3 shadow-sm mb-3">
              <h5 className="mb-1">Deliver to: {auth?.user?.firstName || "User"}</h5>
              <p className="mb-0 fw-semibold text-primary">
                {auth?.user?.address || "No address found"}
              </p>
              <p className="mb-0">
                PIN: {auth?.user?.pincode || "000000"}
              </p>
            </div>

            {/* Price Details */}
            <div className="card p-3 shadow-sm">
              <h4 className="border-bottom pb-2 mb-2">PRICE DETAILS</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{totalprice().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Charges</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total Amount</span>
                <span>₹{totalprice().toFixed(2)}</span>
              </div>
              <Button variant="success" className="mt-3 w-100">Place Order</Button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Cartpage;




