import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Spinner from "../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const resp1 = await fetch("http://localhost:4101/api/user-auth", {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`,
                    },
                });
                const resp2 = await resp1.json();
                if (resp2.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                    navigate("/Signin");
                }
            } catch (error) {
                console.log(error);
                navigate("/Signin");
            }
        };

        if (auth?.token) {
            authCheck();
        } else {
            navigate("/Signin");
        }
    }, [auth?.token, navigate]);

    return ok ? <Outlet /> : <Spinner />;
}


