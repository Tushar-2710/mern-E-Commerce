import React from 'react'
import Layout from '../components/Layout'
import Adminmenu from '../components/Adminmenu'

function Users() {
    return (
        <Layout title={"Dashboard - All Users"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Users</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users