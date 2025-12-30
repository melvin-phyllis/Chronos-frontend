import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Pagenoautorized = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const location = useLocation() // Correction de la faute de frappe "loaction"
    const [load, setLoad] = useState(true)


    useEffect(() => {
        const role = localStorage.getItem("role")

        // 1. Si pas de rôle -> Login
        if (!role) {
            setLoad(false)
            navigate("/login")
            return
        }

        if (role === "admin" && (location.pathname.includes("/employee") || location.pathname.includes("/login"))) {
            setLoad(false)

            navigate("/dashbord/admin")
            return
        }


        if (role === "employee" && (location.pathname.includes("/admin") || location.pathname.includes("/login"))) {
            setLoad(false)

            navigate("/dashbord/employee")
            return
        }
        setLoad(false)
    }, [location.pathname, navigate]) // On surveille le changement de page

    if (load) {
        return (
            <div>
                salut
            </div>)
    }
    return <>{children}</> // On retourne les composants enfants
}

export default Pagenoautorized
