import getLeaveRequest from "@/controllers/getLeaverequest";
import EmployeeStore from "@/Store/EmployeeStore";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useEffect } from "react";

const LeaveRequestHistory = () => {
    const { Listrequestleave, Employee, setListrequestleave } = EmployeeStore()


    const formattedDate = (date: Date): string => {
        return `à ${new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(date)}`;
    };

    useEffect(() => {
        getLeaveRequest(setListrequestleave, Employee)
    }, [])


    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Historique des demandes</h2>
                    <div className="flex items-center gap-2">
                        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block p-2">
                            <option>Cette année</option>
                            <option>2023</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Dates</th>
                                <th scope="col" className="px-6 py-3">Durée</th>
                                <th scope="col" className="px-6 py-3">Raison</th>
                                <th scope="col" className="px-6 py-3">Date demande</th>
                                <th scope="col" className="px-6 py-3">Statut</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* Approved Item */}

                            {Listrequestleave.length > 0 && Listrequestleave.map((item, index) => (

                                <tr key={index} className="bg-white border-b hover:bg-gray-50 transition-colors">

                                    <td className="px-6 py-4 font-medium text-gray-900">{item?.type}</td>
                                    <td className="px-6 py-4">{formattedDate(new Date(item?.startDate))} - {formattedDate(new Date(item?.endDate))}</td>
                                    <td className="px-6 py-4">{item?.intervaltime} jours  </td>
                                    <td className="px-6 py-4">{item?.reason}</td>
                                    <td className="px-6 py-4">{item?.requestDate ? new Date(item?.requestDate).toLocaleDateString() : ""}</td>

                                    <td className="px-6 py-4">
                                        <span className={` inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${item?.status === "approved" ? "bg-emerald-50 text-emerald-700" : item?.status === "rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700 "} `} >
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            {item?.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-right">

                                        {["approved", "rejected"].includes(item?.status) ? (
                                            <button className="text-gray-400 hover:text-gray-600 btn">Voir</button>
                                        ) : (
                                            <button className="text-red-500 hover:text-red-700 text-xs font-medium">
                                                Annuler
                                            </button>
                                        )}

                                    </td>

                                </tr>

                            ))}

                            {/* Pending Item */}
                            <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">RTT</td>
                                <td className="px-6 py-4">15 Jan 2025</td>
                                <td className="px-6 py-4">1 jour</td>
                                <td className="px-6 py-4">Rendez-vous personnel</td>
                                <td className="px-6 py-4">26 Déc 2024</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-700">
                                        <Clock className="w-3.5 h-3.5" />
                                        En attente
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">

                                </td>
                            </tr>

                            {/* Rejected Item */}
                            <tr className="bg-white hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">Congés Payés</td>
                                <td className="px-6 py-4">10 Nov 2024 - 12 Nov 2024</td>
                                <td className="px-6 py-4">2 jours</td>
                                <td className="px-6 py-4">Pont du 11 novembre</td>
                                <td className="px-6 py-4">01 Nov 2024</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700">
                                        <XCircle className="w-3.5 h-3.5" />
                                        Refusé
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">Voir</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Affichage de 1 à 3 sur 12 demandes</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Précédent</button>
                        <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Suivant</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeaveRequestHistory
