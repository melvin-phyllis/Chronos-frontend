import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Pagenoautorized = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [load, setLoad] = useState(true)

    useEffect(() => {
        const verifySession = async () => {
            const role = localStorage.getItem("role")

            // 1. Si pas de rôle localement -> Login direct
            if (!role) {
                setLoad(false)
                navigate("/login")
                return
            }

            try {
                // 2. Vérification côté serveur (Session / Token)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-user-info`, {
                    withCredentials: true // Important pour envoyer les cookies
                })

                if (!res.data.success) {
                    throw new Error("Session invalide")
                }

                // 3. Vérification des permissions par rôle
                if (role === "admin" && (location.pathname.includes("/employee") || location.pathname.includes("/login"))) {
                    navigate("/dashbord/admin")
                    return
                }

                if (role === "employee" && (location.pathname.includes("/admin") || location.pathname.includes("/login"))) {
                    navigate("/dashbord/employee")
                    return
                }

                setLoad(false)

            } catch (error) {
                console.error("Erreur de session:", error)
                // Si le serveur rejette ou est injoignable -> Logout
                localStorage.removeItem("role")
                navigate("/login")
            }
        }

        verifySession()
    }, [location.pathname, navigate])

    if (load) {
        return (
            <div>
                salut
            </div>)
    }
    return <>{children}</> // On retourne les composants enfants
}

export default Pagenoautorized
