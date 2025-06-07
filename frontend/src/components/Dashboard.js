import React from "react";
import { useAuth } from "../context/auth";
import Layout from "../components/Layout/Layout";
import AdminMenu from "../components/Layout/Adminmenu";
import UserMenu from "../components/Layout/Usermenu";

function Dashboard() {
    const [auth] = useAuth();

    return (
        <Layout title="Dashboard - Ecommerce App">
            <div className="container-fluid p-3 m-3">
                <h1>Dashboard</h1>
                <div className="row">
                    <div className="col-md-3">
                        {auth?.user?.role === "admin" ? <AdminMenu /> : <UserMenu />}
                    </div>
                    <div className="col-md-9">
                        <h3>Welcome, {auth?.user?.name}</h3>
                        <p>Email: {auth?.user?.email}</p>
                        <p>Contact: {auth?.user?.phone}</p>
                        <p>Address: {auth?.user?.address}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
