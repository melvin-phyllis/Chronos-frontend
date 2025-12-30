import axios from "axios"
import type { formAddTAskType } from "../types"
import { ToastError, ToastSuccess } from "../toastify/react-toastify"

const updateNote = async (
    e: React.FormEvent<HTMLFormElement>,
    formAddTAsk: formAddTAskType,
    updateTasks: (task: formAddTAskType) => void
) => {
    try {

        e?.preventDefault()

        const req = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/updatetask/${formAddTAsk._id}`, formAddTAsk,
            { withCredentials: true }
        )

        if (!req?.data) return

        if (req?.data.success) {


            updateTasks(formAddTAsk)
            
            const id = document.getElementById("my_modal_2")

            id?.click()

            return ToastSuccess("Mise a jour reussie")
        }

        ToastError("Une erreur c'est produite")
    } catch (error) {
        console.log(error)
        ToastError("Une erreur c'est produite")
    }
}

export default updateNote