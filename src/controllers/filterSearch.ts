import { ToastError } from "../toastify/react-toastify";
import type { employeeType } from "../types";

const filterSearch = (
    ListEmployees: employeeType[],
    setEmployeeSearch: (employees: employeeType[]) => void,
    filter: string
) => {
    const array = ListEmployees.filter(item => item.department == filter)

    console.log("array", array)

    if (array.length === 0) {
        console.log(array)
        return ToastError("Elelemnt corespondant no trouver dans la bd")
    }
setEmployeeSearch(array)

}

export default filterSearch
