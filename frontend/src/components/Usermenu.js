import React from 'react';
import { NavLink } from "react-router-dom";

function Usermenu() {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="text-center mb-3">User Menu</h5>
                <div className="list-group">
                    <NavLink to="/Userdashboard/profile" className="list-group-item list-group-item-action">
                        Profile
                    </NavLink>
                    <NavLink to="/Userdashboard/orders" className="list-group-item list-group-item-action">
                        Orders
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Usermenu;
