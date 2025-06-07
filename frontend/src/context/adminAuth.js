import { useState, useContext, createContext, useEffect } from 'react'

const AdminAuthcontext = createContext()
const AdminAuthProvider = ({ children }) => {
    const [adminAuth, setAdminAuth] = useState({
        user: null,
        token: ""
    })
    useEffect(() => {
        const data = localStorage.getItem("adminAuth");
        if (data) {
            const parseData = JSON.parse(data);
            setAdminAuth(parseData);
        }
    }, []);

    return (
        <AdminAuthcontext.Provider value={[adminAuth, setAdminAuth]}>
            {children}
        </AdminAuthcontext.Provider>
    )
}
const useAdminAuth = () => useContext(AdminAuthcontext)
export { useAdminAuth, AdminAuthProvider }
