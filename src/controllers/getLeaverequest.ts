import { ToastError } from "@/toastify/react-toastify"
import type { employeeType, formLeaveRequestType } from "@/types"
import axios from "axios"

const getLeaveRequest = async (setListrequestleave: (Listrequestleave: formLeaveRequestType[]) => void, Employee: employeeType | null) => {
    try {



        const req = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leaverequest/${Employee?.employeeCode}`, { withCredentials: true })

        if (!req.data) return

        console.log("ok", req.data)
        if (req?.data.success !== true) return ToastError("Une erreur est survenue veuillez ressayer plus tard")

        setListrequestleave(req.data.data)

    } catch (error) {

        console.log(error)
        ToastError("Une erreur est survenue veuillez ressayer plus tard")
    }
}

export default getLeaveRequest
