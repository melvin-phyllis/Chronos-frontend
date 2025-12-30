import axios from "axios"
import { ToastError } from "../toastify/react-toastify"
import type { employeeType, formAddTAskType } from "../types"

const getAlltaskEmployee = async (setTasks: (Tasks: formAddTAskType[]) => void, Employee: employeeType | null) => {
    try {

        const req = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-all-tasks-employee`, { params: { employeeCode: Employee?.employeeCode }, withCredentials: true })

        if (!req?.data) return

        console.log("data", req?.data.data)
        setTasks(req?.data.data)

        if (Array.isArray(req?.data.data)) {

            setTasks(req?.data.data)

        }


    } catch (error) {

        console.log(error)

        ToastError("une erreur c'est produite")
    }
}

export default getAlltaskEmployee
