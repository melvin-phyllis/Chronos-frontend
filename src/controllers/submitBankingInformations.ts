import { ToastError, ToastSuccess } from "@/toastify/react-toastify";
import type { employeeType, formDataType } from "@/types";
import axios from "axios";
import type { FormEvent, RefObject } from "react";
import type { Dispatch, SetStateAction } from "react";

const submitBankingInformations = async (
    e: FormEvent<HTMLFormElement>,

    setLoading: Dispatch<SetStateAction<boolean>>,

    formData: formDataType,

    Employee: employeeType | null,

    setEmployee: (Employee: employeeType) => void,

    onClose: () => void,
    ref: RefObject<HTMLFormElement | null>

) => {


    try {

        e.preventDefault();

        setLoading(true);
        // We only update the banking details, keeping the salary as is


        const req = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/update-banking-info/${Employee?._id}`,
            formData,
            { withCredentials: true }
        )

        if (!req?.data.success) return ToastError("Une erreur est survenue veuillez reessayer plus tard")

        if (Employee) {

            Employee.payrollInformation = {
                ...Employee.payrollInformation,
                ...formData
            }

            setEmployee(Employee)

        }


        ToastSuccess("Les informations ont été mises à jour avec succès")
        ref?.current?.reset()
        
        onClose()

    } catch (error) {

        console.log(error)

        ToastError("Une erreur est survenue veuillez reessayer plus tard")


    } finally {
        setLoading(false);
    }
};

export default submitBankingInformations;
