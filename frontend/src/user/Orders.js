import React from 'react'
import Usermenu from '../components/Usermenu'
import Layout from '../components/Layout'

const Orders = () => {
    return (
        <Layout title={"Your Orders"}>
            <div className="container-flui p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <Usermenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Orders</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders