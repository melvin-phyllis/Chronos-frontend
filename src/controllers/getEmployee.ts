import axios from "axios"
import { ToastError, ToastSuccess } from "../toastify/react-toastify"

const getEmployee = async (setEmployees: (employees: []) => void, page: number, setTotalPages: (totalPages: number) => void) => {
    try {

        const req = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-employees`, { params: { page: page }, withCredentials: true })
        if (!req?.data) return
console.log(req?.data?.data)
        if (req?.data?.success) {
            setEmployees(req?.data?.data)
            setTotalPages(req?.data?.TotalPages)
            ToastSuccess(req?.data?.message)
        }
    } catch (error) {
        console.log(error)
        ToastError("une erreur est survenue")
    }
}
export default getEmployee
