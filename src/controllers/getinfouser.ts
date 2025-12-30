import axios from "axios"
import type { employeeType } from "../types"

const getinfouser = async (setEmployee: (Employee: employeeType) => void) => {
    try {

        const req = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-user-info`, { withCredentials: true })

        if (!req.data) return

        if (req?.data.success) {

            setEmployee(req?.data.data)

        }

        console.log(req?.data)

    } catch (error) {
        console.log(error)

    }
}

export default getinfouser
