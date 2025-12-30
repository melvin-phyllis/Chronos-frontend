import axios from "axios"
import { ToastError, ToastSuccess } from "../toastify/react-toastify"
import type { formAddTAskType } from "../types"

const deleteTask = async (
    updateTask: formAddTAskType | undefined,
    Tasks: formAddTAskType[],
    setTasks: (Tasks: formAddTAskType[]) => void
) => {

    try {

        console.log(updateTask)

        const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/deletetask`, { id: updateTask?._id },
            { withCredentials: true }
        )

        if (!req?.data) return

        if (req?.data.success) {
            const array = Tasks.filter(item => item._id !== updateTask?._id)
            setTasks(array)
            return ToastSuccess("Suppression reussie")
        }
        ToastError(req?.data?.message)

    } catch (error) {
        console.log(error)
        ToastError("Une erreur c'est produite")
    }
}

export default deleteTask
