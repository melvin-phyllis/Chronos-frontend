import axios from "axios"
import { ToastError } from "../toastify/react-toastify"
import type { employeeType } from "../types"

const searchemployee = async (search: string, setEmployeeSearch: React.Dispatch<React.SetStateAction<employeeType[]>>) => {
    try {
        console.log("search", search)

        if (search?.length < 3) return ToastError("Entrer plus de 4 caractrer pour lance la recherche")

        const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/search-employee`, { search }, { withCredentials: true })

        if (!req?.data) return

        console.log("search", req?.data.message)

        if (req?.data.success) {
            setEmployeeSearch(req?.data?.data)
        }

        console.log(req?.data.data)

    } catch (error) {
        console.log(error)
        ToastError("une erreur est subvenue lors de la recherche")
    }
}

export default searchemployee
