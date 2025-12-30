import axios from "axios"
import { ToastError, ToastSuccess } from "../toastify/react-toastify"
import type { formAddTAskType } from "../types"

const UpdateTask = async (
    e: React.FormEvent<HTMLFormElement>,
    taskData: formAddTAskType,
    updateTaskStore: (tasks: formAddTAskType[]) => void,
    tasksList: formAddTAskType[],
    ref: React.RefObject<HTMLFormElement | null>
) => {
    try {
        e?.preventDefault()

        const req = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/update-tasks/${taskData.id}`, taskData,
            { withCredentials: true }
        )

        if (!req?.data) return

        if (req?.data?.success) {

            // Update local store
            const newTasks = tasksList.map(t => t.id === taskData.id ? { ...t, ...taskData } : t)
            updateTaskStore(newTasks)

            ToastSuccess("Tâche mise à jour avec succès")

            // Close modal
            const closeBtn = document.getElementById("my_modal_note8") as HTMLInputElement
            if (closeBtn) {
                closeBtn.checked = false;
            }

            ref?.current?.reset()
        }

    } catch (error) {
        console.log(error)
        ToastError("Erreur lors de la mise à jour")
    }
}

export default UpdateTask
