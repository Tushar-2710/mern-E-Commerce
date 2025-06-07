import React from 'react'
import Layout from '../components/Layout'
import Usermenu from '../components/Usermenu'

function Profile() {
    return (
        <Layout title={"Your Profile"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <Usermenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Your Profile</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile