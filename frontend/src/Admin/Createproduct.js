import React from 'react'
import Layout from '../components/Layout'
import Adminmenu from '../components/Adminmenu'

function Createproduct() {
    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Createproduct