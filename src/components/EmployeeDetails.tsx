import { Download, FileText, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import EmployeeStore from "../Store/EmployeeStore"
import type { employeeType } from "../types"
import MiddleStatsChartNotes from "./MiddleStatsChartNotes"
import ProfileCard from "./ProfileCard"

const EmployeeDetails = ({ id }: { id: string }) => {

    const { ListEmployees } = EmployeeStore()

    const [employee, setEmployee] = useState<employeeType>()

    useEffect(() => {
        const array = ListEmployees.find(item => item._id == id)
        if (array) {
            setEmployee(array)
            console.log(array)
        }
    }, [id])


    return (
        <div className="flex gap-6 lg:flex-row flex-col p-5">
            {/* Left Column - Profile & Personal Info */}

            <ProfileCard employee={employee} />
            {/* Middle Column - Stats, Chart, Notes */}
            <MiddleStatsChartNotes />


            {/* Right Column - Payroll & Documents */}
            <div className="lg:w-80 space-y-6">
                {/* Payroll Summary */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-gray-900">Payroll Summary</h2>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-400">
                                <th className="pb-2 font-normal">Description</th>
                                <th className="pb-2 text-right font-normal">
                                    Amount <span className="text-xs">USD</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="py-2 text-gray-700">Base Salary</td>
                                <td className="py-2 text-right font-semibold text-gray-900">$3,200</td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-500 font-medium">Allowances</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="py-1.5 pl-3 text-gray-600">Meal</td>
                                <td className="py-1.5 text-right text-gray-700">$110</td>
                            </tr>
                            <tr>
                                <td className="py-1.5 pl-3 text-gray-600">Internet</td>
                                <td className="py-1.5 text-right text-gray-700">$70</td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-500 font-medium">Benefits</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="py-1.5 pl-3 text-gray-600">Health Insurance</td>
                                <td className="py-1.5 text-right text-gray-700">$120</td>
                            </tr>
                            <tr>
                                <td className="py-1.5 pl-3 text-gray-600">Life Insurance</td>
                                <td className="py-1.5 text-right text-gray-700">$40</td>
                            </tr>
                            <tr>
                                <td className="py-1.5 pl-3 text-gray-600">Training</td>
                                <td className="py-1.5 text-right text-gray-700">$80</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="border-t-2 border-gray-200">
                                <td className="pt-3 font-bold text-gray-900">Monthly Total</td>
                                <td className="pt-3 text-right font-bold text-lg text-violet-600">$3,620</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Documents */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-gray-900">Documents</h2>
                        <button className="text-xs text-violet-600 font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <FileText className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">Performance_Evaluation.pdf</p>
                                <p className="text-xs text-gray-500">2.4 MB • Dec 2025</p>
                            </div>
                            <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white rounded-lg transition-all">
                                <Download className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">Contract_Agreement.pdf</p>
                                <p className="text-xs text-gray-500">1.8 MB • Mar 2022</p>
                            </div>
                            <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white rounded-lg transition-all">
                                <Download className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <FileText className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">ID_Document.pdf</p>
                                <p className="text-xs text-gray-500">0.5 MB • Mar 2022</p>
                            </div>
                            <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white rounded-lg transition-all">
                                <Download className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetails
