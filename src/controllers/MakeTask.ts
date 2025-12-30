import axios from "axios"
import { ToastError, ToastSuccess } from "../toastify/react-toastify"
import type { formAddTAskType } from "../types"

const MakeTask = async (e: React.FormEvent<HTMLFormElement>, formAddTAsk: formAddTAskType,
    addTasks: (task: formAddTAskType) => void,
    ref: React.RefObject<HTMLFormElement | null>
) => {
    try {
        e?.preventDefault()

        const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/add-tasks`, formAddTAsk,

            { withCredentials: true }
        )

        if (!req?.data) return

        console.log(formAddTAsk)

        if (req?.data?.success) {


            addTasks({ id: req?.data?.data, ...formAddTAsk })

            ToastSuccess("Nouvelle tache ajouter")
            
            ref?.current?.reset()

            console.log(req?.data?.data)
        }

    } catch (error) {

        console.log(error)
        ToastError("une erreur est subvenue")
    }
}

export default MakeTask
