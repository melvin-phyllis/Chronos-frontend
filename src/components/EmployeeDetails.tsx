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
                        <h2 className="text-sm font-bold text-gray-900">Informations de Paie</h2>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-400">
                                <th className="pb-2 font-normal">Description</th>
                                <th className="pb-2 text-right font-normal">Valeur</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="py-2 text-gray-700">Salaire Mensuel</td>
                                <td className="py-2 text-right font-semibold text-gray-900">
                                    {employee?.payrollInformation?.monthlySalary ? `${employee.payrollInformation.monthlySalary} €` : "Non renseigné"}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-700">Banque</td>
                                <td className="py-2 text-right font-semibold text-gray-900">
                                    {employee?.payrollInformation?.bankName || "Non renseigné"}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-700">N° Compte</td>
                                <td className="py-2 text-right font-semibold text-gray-900">
                                    {employee?.payrollInformation?.accountNumber ? `****${employee.payrollInformation.accountNumber.slice(-4)}` : "Non renseigné"}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-700">N° Fiscal</td>
                                <td className="py-2 text-right font-semibold text-gray-900">
                                    {employee?.payrollInformation?.taxIdentificationNumber || "Non renseigné"}
                                </td>
                            </tr>
                            {employee?.allowances && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">Indemnités</td>
                                    <td className="py-2 text-right text-gray-700">{employee.allowances}</td>
                                </tr>
                            )}
                            {employee?.employeeBenefits && employee.employeeBenefits.length > 0 && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">Avantages</td>
                                    <td className="py-2 text-right text-gray-700 text-xs">
                                        {employee.employeeBenefits.join(", ")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Documents */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-gray-900">Documents</h2>
                    </div>
                    <div className="space-y-3">
                        {employee?.documents?.cvAndPortfolio && (
                            <a href={employee.documents.cvAndPortfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <FileText className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">CV / Portfolio</p>
                                    <p className="text-xs text-gray-500">Document téléchargé</p>
                                </div>
                                <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white rounded-lg transition-all">
                                    <Download className="w-4 h-4 text-gray-500" />
                                </button>
                            </a>
                        )}

                        {employee?.documents?.proofOfIdentity && (
                            <a href={employee.documents.proofOfIdentity} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <FileText className="w-5 h-5 text-amber-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">Pièce d'identité</p>
                                    <p className="text-xs text-gray-500">Document officiel</p>
                                </div>
                                <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white rounded-lg transition-all">
                                    <Download className="w-4 h-4 text-gray-500" />
                                </button>
                            </a>
                        )}

                        {employee?.documents?.signedContract && (
                            <a href={employee.documents.signedContract} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">Contrat signé</p>
                                    <p className="text-xs text-gray-500">Document légal</p>
                                </div>
                                <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white rounded-lg transition-all">
                                    <Download className="w-4 h-4 text-gray-500" />
                                </button>
                            </a>
                        )}

                        {employee?.documents?.offerLetter && (
                            <a href={employee.documents.offerLetter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                                <div className="p-2 bg-violet-100 rounded-lg">
                                    <FileText className="w-5 h-5 text-violet-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">Lettre d'offre</p>
                                    <p className="text-xs text-gray-500">Document RH</p>
                                </div>
                                <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white rounded-lg transition-all">
                                    <Download className="w-4 h-4 text-gray-500" />
                                </button>
                            </a>
                        )}

                        {(!employee?.documents?.cvAndPortfolio && !employee?.documents?.proofOfIdentity && !employee?.documents?.signedContract && !employee?.documents?.offerLetter) && (
                            <p className="text-sm text-gray-500 text-center py-4">Aucun document téléchargé</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetails
