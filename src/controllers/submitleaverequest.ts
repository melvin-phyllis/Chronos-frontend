import { ToastError, ToastSuccess } from "@/toastify/react-toastify"
import type { employeeType, formLeaveRequestType } from "@/types"
import axios from "axios"
import type { FormEvent } from "react"

const submitLeaveRequest = async (
    e: FormEvent<HTMLFormElement>, formLeaveRequest: formLeaveRequestType, Employee: employeeType | null, addrequestleave: (requestleave: formLeaveRequestType) => void, ref: React.RefObject<HTMLFormElement | null>) => {
    try {
        e?.preventDefault()
        console.log("congedemander", formLeaveRequest, Employee)
        const intervalTime = (time1: string, time2: string) => {
            const startDate = new Date(time1); // Date de début
            const endDate = new Date(time2);   // Date de fin

            // 1. Calculer la différence en millisecondes
            const differenceEnMs = endDate.getTime() - startDate.getTime();

            // 2. Convertir les millisecondes en jours
            const msParJour = 1000 * 60 * 60 * 24;
            const differenceEnJours = differenceEnMs / msParJour;

            return differenceEnJours

        }


        formLeaveRequest.intervaltime = intervalTime(formLeaveRequest?.startDate, formLeaveRequest?.endDate)

        if (formLeaveRequest.intervaltime > 30 && formLeaveRequest?.type == "paid") return ToastError("Nombre de conge paye autoriser est de -30 jours")

            formLeaveRequest.startDate = new Date(formLeaveRequest?.startDate).toISOString()
        formLeaveRequest.endDate = new Date(formLeaveRequest?.endDate).toISOString()

        const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/leave-request/${Employee?.employeeCode}`, formLeaveRequest,
            { withCredentials: true }
        )

        console.log(req?.data)
        ref?.current?.reset()
        addrequestleave({ ...formLeaveRequest, ...req.data?.data })
        ToastSuccess("Demande de congé soumise avec succès")
    } catch (error:any) {

        console.log(error)
        ToastError("Une erreur est survenue veuillez ressayer plus tard")
        if(error.response.data.message) return  ToastError(error.response.data.message)
    }
}

export default submitLeaveRequest
