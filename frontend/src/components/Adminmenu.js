import React from 'react';
import { NavLink } from 'react-router-dom';

function Adminmenu() {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="text-center mb-3">Admin Menu</h5>
                <div className="list-group">
                    <NavLink to="/Admindashboard/create-category" className="list-group-item list-group-item-action">
                        Category
                    </NavLink>
                    <NavLink to="/Admindashboard/create-product" className="list-group-item list-group-item-action">
                        Products
                    </NavLink>
                    <NavLink to="/Admindashboard/users" className="list-group-item list-group-item-action">
                        Users
                    </NavLink>

                </div>
            </div>
        </div>
    );
}

export default Adminmenu;
