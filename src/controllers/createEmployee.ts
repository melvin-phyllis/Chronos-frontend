import axios from "axios"
import { ToastError, ToastSuccess } from "../toastify/react-toastify"
import type { formDocumentsType, FormEmploymentType, FormPersonalType } from "../types"

const createEmployee = async (
    e: React.FormEvent<HTMLFormElement>,

    formEmployee: FormPersonalType & formDocumentsType & FormEmploymentType,
    setLoad: React.Dispatch<React.SetStateAction<boolean>>,
    handleReset: () => void) => {

    try {
        setLoad(true)
        e?.preventDefault()

        const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addEmployee`, formEmployee,
            { withCredentials: true }
        )

        if (req?.data?.message === "Employee added successfully") {
            handleReset()
            return ToastSuccess("Employee added successfully")
        }

    } catch (error: any) {
        console.log(error)
        if (error?.response?.data?.message.includes("déjà utilisé")) {

            return ToastError(`${error?.response?.data?.message}`)
        }
        return ToastError("Employee not added")
    } finally {
        setLoad(false)
    }
}

export default createEmployee
