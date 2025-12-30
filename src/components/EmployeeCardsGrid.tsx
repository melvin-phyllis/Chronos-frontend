import { CirclePlus, Mail, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import type { employeeType } from "../types"
import EmployeeDetails from "./EmployeeDetails"

const EmployeeCardsGrid = ({ ListEmployees, employeeSearch }: { ListEmployees: employeeType[], employeeSearch: employeeType[] }) => {

    const [array, setArray] = useState<employeeType[]>([])

    const [id, setId] = useState("")

    useEffect(() => {
        setArray(employeeSearch.length > 0 ? employeeSearch : ListEmployees)
    }, [ListEmployees, employeeSearch])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 ">
                {array.length > 0 ? array.map((item, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-transparent hover:border-violet-200"
                    >
                        {/* Card Header with gradient */}
                        <div className="h-16 bg-linear-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 relative">
                        </div>
                        {/* Avatar & Basic Info */}
                        <div className="px-5 -mt-13">
                            <div className="flex-col flex items-center md:text-center gap-3">
                                <img
                                    src="/122871.jpg"
                                    alt=""
                                    className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-4 ring-white"
                                />
                                <div className="flex flex-col mt-1">
                                    <span className="text-xs font-medium text-gray-400 tracking-wider">{item.employeeCode} </span>
                                    <span className="text-lg font-bold text-gray-900">{item.fullname}</span>
                                </div>
                            </div>
                        </div>
                        {/* Info Section */}
                        <div className="px-5 py-4 mt-2">
                            <div className="bg-gray-50 rounded-xl divide-y divide-gray-100">
                                <div className="flex items-center justify-between px-4 py-2">
                                    <span className="text-[14px] text-gray-500">Job Title</span>
                                    <span className="text-[14px] font-semibold text-gray-800">
                                        {item.post}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between px-4 py-2">
                                    <span className="text-[14px] text-gray-500">Department</span>
                                    <span className="text-[14px] font-semibold text-gray-800">
                                        {item.department}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Tags & Status */}
                        <div className="px-5 pb-5">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg">
                                        {item.contractType}
                                    </span>
                                    <span className="px-3 py-1.5 text-xs font-medium bg-purple-50 text-purple-600 border border-purple-200 rounded-lg">
                                        {item.workingMethod}
                                    </span>
                                </div>
                                <span className="px-3 py-1.5 text-xs font-semibold bg-emerald-500 text-white rounded-lg shadow-sm">
                                    Active
                                </span>
                            </div>
                            {/* Quick Actions */}
                            <div className="w-full flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                                <ul className="text-[12px] w-full bg-gray-50">
                                    <li className="flex-1 flex items-center  gap-2 px-3 py-2  text-gray-600  font-medium rounded-lg hover:bg-gray-100 transition-colors">
                                        <Mail className="w-4 h-4" />
                                        {item.email}
                                    </li>
                                    <li className="flex-1 flex items-center  gap-2 px-3 py-2 text-gray-600  font-medium rounded-lg hover:bg-gray-100 transition-colors">
                                        <Phone className="w-4 h-4" />
                                        {item.phone.phoneNumber}
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => {
                                const id = document.getElementById("modal_full_width") as HTMLDialogElement
                                if (id) {
                                    setId(item?._id!)
                                    id.showModal()
                                }
                            }}

                                className="btn flex-1 mt-5 w-full flex items-center justify-center gap-2 px-3 py-2 bg-violet-50 text-violet-600 text-sm font-medium rounded-lg hover:bg-violet-100 transition-colors">
                                View
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="bg-red-200 col-span-full text-3xl  font-bold md:h-100 flex justify-center items-center">
                        <p> Aucun employé trouvé dans la Base de données</p>
                    </div>)}
                <dialog id="modal_full_width" className="modal p-0 ">
                    <div className="modal-box  w-11/12 max-w-800   h-[calc(100vh)]  rounded-2xl">
                        <form method="dialog" className="modal-backdrop flex justify-end">
                            <button className="btn btn-sm btn-neutral btn-outline rounded-full p-1 ">
                                <CirclePlus />
                            </button>
                        </form>
                        <EmployeeDetails id={id} />

                    </div>
                </dialog>
            </div>
        </>
    )
}

export default EmployeeCardsGrid
