import React from 'react'
import Adminmenu from "../components/Adminmenu";
import Layout from "../components/Layout"

function Admindashboard() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth || auth.user.role !== "admin") {
    return <h3>Access denied. You are not authorized to view this page.</h3>;
  }

  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container-fluid py-4 px-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow-sm p-4">
              <h4 className="mb-3">Welcome, Admin {auth?.user?.firstName} {auth?.user?.lastName}</h4>
              <hr />
              <p><strong>Email:</strong> {auth?.user?.email}</p>
              <p><strong>Contact:</strong> {auth?.user?.phone}</p>
              <p><strong>Address:</strong> {auth?.user?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Admindashboard;