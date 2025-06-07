import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";  // <== useNavigate import कर
import Spinner from "../Spinner";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const navigate = useNavigate(); // <== navigate चालू कर
    const auth = JSON.parse(localStorage.getItem("auth")) || null;        ////user  ,auth

    useEffect(() => {
        const authCheck = async () => {
            try {
                const resp1 = await fetch("http://localhost:4101/api/admin-auth", {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`,

                    },
                });
                const resp2 = await resp1.json();
                if (resp2.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                    navigate("/Signin");  // <== unauthorized आहे, म्हणून Signin वर पाठव
                }
            } catch (error) {
                console.log(error);
                navigate("/Signin");  // <== error मध्ये पण safe साइड
            }
        };


        if (auth?.token && auth?.user?.role === "admin") {
            authCheck();
        } else {
            navigate("/Signin");
        }

       
    }, [auth?.token, auth?.user?.role, navigate]); // ✅ No warning

    return ok ? <Outlet /> : <Spinner />;
}
