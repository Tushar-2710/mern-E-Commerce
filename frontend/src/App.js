import './App.css';
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Categories from './components/Categories';
import AddCategory from './components/Addcategory';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/Addproduct';
import Signout from './components/Signout';
import Footer from './components/Footer';
import Search from './components/Search';
import Userdashboard from './user/Userdashboard';
import PrivateRoute from './Routes/Private';
import Orders from './user/Orders';
import Profile from './user/Profile';
import AdminRoute from './Routes/AdminRoute';
import Admindashboard from './Admin/Admindashboard';
import Createcategory from './Admin/Createcategory';
import Createproduct from './Admin/Createproduct';
import Users from './Admin/Users';
import Singleproduct from './components/Singleproduct';
import Cartpage from './components/Cartpage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path="/Userdashboard" element={<PrivateRoute />}>
            <Route index element={<Userdashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* <Route path="/dashboard/admin" element={<AdminRoute />}> */}
          <Route path="/Admindashboard" element={<AdminRoute />}>
            <Route index element={<Admindashboard />} />
            <Route path="create-category" element={<Createcategory />} />
            <Route path="create-product" element={<Createproduct />} />
            <Route path="users" element={<Users />} />

          </Route>
          <Route path='/Categories' element={<Categories />} />
          <Route path="/Addcategory" element={<AddCategory />} />
          <Route path='/Cartpage' element={<Cartpage />} />
          <Route path='/Products' element={<Products />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/Addproduct" element={<AddProduct />} />
          <Route path="/search" element={<Search />} />

          <Route path='/Singleproduct/:slug' element={<Singleproduct />} />
          <Route path='/Signin' element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />

          <Route path='/Signout' element={<Signout />} />
        </Routes>
      </div>
      <Footer />

      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable={false}
        closeButton={false}
        limit={1}
        toastClassName="custom-toast-move" />

    </div>
  );
}

export default App;
