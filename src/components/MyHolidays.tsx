import EmployeeStore from "@/Store/EmployeeStore"
import type { PaidLeaveType } from "@/types"
import { Clock, FileText, PieChart, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import LeaveRequestHistory from "./LeaveRequestHistory"
import NewRequestHolidays from "./NewRequestHolidays"
import paidLeavePercentage from "@/controllers/paidLeavePercentage"

const MyHolidays = () => {
    const { Listrequestleave } = EmployeeStore()

    const [stattotal, setStatetotal] = useState<PaidLeaveType>({
        PaidLeave: 0,
        SickLeaveOther: 0,
        UnpaidLeave: 0
    });

    useEffect(() => {
        const calculateLeaveStats = () => {
            // Calculer tous les totaux en une seule fois
            const stats = Listrequestleave.reduce((acc, item) => {
                if (item?.status === "approved") {
                    const days = item?.intervaltime || 0;

                    if (item?.type === "paid") {
                        acc.PaidLeave += days;
                    } else if (item?.type === "sick") {
                        acc.SickLeaveOther += days;
                    } else if (item?.type === "unpaid") {
                        acc.UnpaidLeave += days;
                    }
                }
                return acc;
            }, {
                PaidLeave: 0,
                SickLeaveOther: 0,
                UnpaidLeave: 0
            });

            // Mettre à jour le state UNE SEULE fois
            setStatetotal(stats);
        };

        calculateLeaveStats();
    }, [Listrequestleave]); // Ajouter la dépendance



    return (
        <>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Mes Congés</h1>
                        <p className="text-sm text-gray-500 mt-1">Gérez vos absences et suivez vos soldes</p>
                    </div>
                    <label htmlFor="my_modal_8" className="btn px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl shadow-sm shadow-violet-200 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Faire une demande
                    </label>
                </div>


                {/* Balance Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Congés Payés */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-violet-200 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <PieChart className="w-16 h-16 text-violet-600" />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                                <PieChart className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Congés Payés</h3>
                        </div>
                        <div className="flex items-baseline gap-1">

                            <span className="text-3xl font-bold text-gray-900">{30-stattotal?.PaidLeave!} </span>
                            <span className="text-sm text-gray-500">jours restants</span>

                        </div>
                        <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
                            <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: `${paidLeavePercentage(stattotal)}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Sur un total de 25 jours</p>
                    </div>

                    {/* RTT / Maladie (Example) */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-pink-200 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Clock className="w-16 h-16 text-pink-600" />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                                <Clock className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Maladie / Autres</h3>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-gray-900">{stattotal?.SickLeaveOther}</span>
                            <span className="text-sm text-gray-500">jours pris</span>
                        </div>

                        <p className="text-xs text-gray-400 mt-2">Année courante 2024</p>
                    </div>

                    {/* Sans Solde */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-orange-200 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FileText className="w-16 h-16 text-orange-600" />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                                <FileText className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Sans Solde</h3>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-gray-900">{stattotal?.UnpaidLeave}</span>
                            <span className="text-sm text-gray-500">jours pris</span>
                        </div>

                        <p className="text-xs text-gray-400 mt-2">Aucune limite définie</p>
                    </div>
                </div>

                {/* History Table */}
                <LeaveRequestHistory />
            </div>

            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_8" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <NewRequestHolidays />
                    <div className="modal-action hidden">
                        <label htmlFor="my_modal_8" id="my_modal_8" className="btn">Close!</label>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MyHolidays
