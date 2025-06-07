// import React from 'react'
// import Layout from '../components/Layout';
// import { useAuth } from '../context/auth'
// import Usermenu from '../components/Usermenu';
// function Userdashboard() {
//     const [auth] = useAuth();    //

//     // const auth = JSON.parse(localStorage.getItem("user"))
//     return (
//         <Layout title={"Dashboard - Ecommerce App"}>
//             <div className="container-fluid m-3 p-3">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <Usermenu />
//                     </div>
//                     <div className="col-md-9">
//                         <div className="card w-75 p-3">
//                             {/* <h3>{auth?.user?.name}</h3> */}
//                             <h3>{auth?.user?.firstName} {auth?.user?.lastName}</h3>
//                             <h3>{auth?.user?.email}</h3>
//                             <h3>{auth?.user?.address}</h3>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     )
// }


// export default Userdashboard





// import React from "react";
// import Layout from "../components/Layout";
// import Usermenu from "../components/Usermenu";
// import { useAuth } from "../context/auth";

// const UserDashboard = () => {
//     const [auth] = useAuth();
//     return (
//         <Layout title={"User Dashboard"}>
//             <div className="container-fluid m-3 p-3">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <Usermenu />
//                     </div>
//                     <div className="col-md-9">
//                         <div className="card w-75 p-3">
//                             <h4>{auth?.user?.firstName} {auth?.user?.lastName}</h4>
//                             <h5>Email: {auth?.user?.email}</h5>
//                             <h5>Phone: {auth?.user?.phone}</h5>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default UserDashboard;










import React from 'react';
import Layout from '../components/Layout';
import Usermenu from '../components/Usermenu';

function Userdashboard() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || auth.user.role !== "user") {
        return <h3>Access denied. You are not authorized to view this page.</h3>;
    }


    return (
        <Layout title={"User Dashboard - Ecommerce App"}>
            <div className="container-fluid py-4 px-3">
                <div className="row">
                    <div className="col-md-3">
                        <Usermenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow-sm p-4">
                            <h4 className="mb-3">Welcome, {auth?.user?.firstName} {auth?.user?.lastName}</h4>
                            <hr />
                            <p><strong>Email:</strong> {auth?.user?.email}</p>
                            <p><strong>Contact:</strong> {auth?.user?.phone}</p>
                            <p><strong>Address:</strong> {auth?.user?.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Userdashboard;




