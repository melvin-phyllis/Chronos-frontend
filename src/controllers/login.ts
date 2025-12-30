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



    } catch (error) {
        console.log(error)
        return ToastError("Erreur de connexion")

    } finally {
        setLoading(false)
    }
}

