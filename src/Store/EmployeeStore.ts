import { create } from 'zustand'
import type { employeeType, formAddTAskType, formLeaveRequestType } from '../types'

type Store = {
    ListEmployees: employeeType[]
    setEmployees: (employees: employeeType[]) => void
    Employee: employeeType | null

    setEmployee: (Employee: employeeType) => void

    Tasks: formAddTAskType[]
    addTasks: (task: formAddTAskType) => void
    updateTasks: (task: formAddTAskType) => void

    setTasks: (Tasks: formAddTAskType[]) => void


    Listrequestleave: formLeaveRequestType[]
    setListrequestleave: (Listrequestleave: formLeaveRequestType[]) => void
    addrequestleave: (requestleave: formLeaveRequestType) => void
}

const EmployeeStore = create<Store>()((set) => ({
    Employee: null,

    Tasks: [],
    addTasks: (task) => set((state) => ({ Tasks: [...state.Tasks, task] })),
    setEmployees: (employees: employeeType[]) => set(() => ({ ListEmployees: employees })),
    updateTasks: (task: formAddTAskType) => set((state) => ({ Tasks: state.Tasks.map((item) => item._id === task._id ? task : item) })),
    setTasks: (Tasks: formAddTAskType[]) => set(() => ({ Tasks: Tasks })),

    ListEmployees: [],
    setEmployee: (Employee: employeeType) => set(() => ({ Employee: Employee })),

    Listrequestleave: [],
    setListrequestleave: (Listrequestleave: formLeaveRequestType[]) => set(() => ({ Listrequestleave: Listrequestleave })),
    addrequestleave: (requestleave: formLeaveRequestType) => set((state) => ({ Listrequestleave: [...state.Listrequestleave, requestleave] })),

}))



export default EmployeeStore
