import axios from "axios"
import type { NavigateFunction } from "react-router-dom"
import { ToastError, ToastSuccess } from "../toastify/react-toastify"
import type { ForminputType } from "../types"

export const login = async (
    e: React.FormEvent<HTMLFormElement>,
    formlogin: ForminputType,
    navigate: NavigateFunction,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        setLoading(true)

        e?.preventDefault()


        console.log(formlogin)
        const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, formlogin,
            { withCredentials: true }
        )

        if (!req.data) return
        console.log(req?.data)
        if (req.data.success == true) {
            console.log(formlogin)
            console.log(req?.data.user.role)
            localStorage.setItem("role", req?.data.user.role)

            if (req?.data?.user?.role == "admin") {
                ToastSuccess("connecter avec succes")
                return navigate("/dashbord/admin")
            }

            if (req?.data?.user?.role == "employee") {
                ToastSuccess("connecter avec succes")
                return navigate("/dashbord/employee")
            }
        }

        ToastError("Email ou Motas de passe incorrect"

        )
        console.log(req?.data)



    } catch (error: any) {
        console.log("Erreur Login:", error)

        if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
            return ToastError("Impossible de contacter le serveur (Serveur éteint ?)")
        }

        if (error.response) {
            // Le serveur a répondu avec un code d'erreur (4xx, 5xx)
            return ToastError(error.response.data?.message || "Erreur de connexion")
        }

        return ToastError("Une erreur inconnue est survenue")

    } finally {
        setLoading(false)
    }
}

