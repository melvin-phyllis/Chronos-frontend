import axios from "axios"
import { ToastError, ToastSuccess } from "../toastify/react-toastify"


const logout = async () => {

    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`, { withCredentials: true })

        if (res.data?.success) {
            localStorage.removeItem("role")
            window.location.href = "/"

            ToastSuccess("Deconnexion Reussi")
        }

    } catch (error) {
        ToastError("Erreur lors de la déconnexion")
        console.error("Erreur lors de la déconnexion", error)
    }

}


export default logout
