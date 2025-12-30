import submitLeaveRequest from "@/controllers/submitleaverequest"
import EmployeeStore from "@/Store/EmployeeStore"
import type { formLeaveRequestType } from "@/types"
import { Calendar, Clock, Save } from "lucide-react"
import { useRef, useState, type ChangeEvent } from "react"

const NewRequestHolidays = () => {

    const ref = useRef<HTMLFormElement>(null)


    const { Employee, addrequestleave } = EmployeeStore()

    const [formLeaveRequest, setFormLeaveRequest] = useState<formLeaveRequestType>({
        type: "",
        intervaltime:0,
        startDate: "",
        endDate: "",
        reason: "",
        requestDate: new Date(),
        status: "pending"
    })

    const handelChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormLeaveRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Nouvelle demande de congé</h2>
                    <p className="text-sm text-gray-500 mt-1">Remplissez le formulaire ci-dessous pour soumettre votre demande.</p>
                </div>

            </div>

            <form ref={ref} className="space-y-6" onSubmit={(e) => submitLeaveRequest(e, formLeaveRequest, Employee, addrequestleave, ref)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Leave Type */}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Type de congé</label>
                        <select
                            name="type"
                            onChange={(e) => handelChange(e)}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3">
                            <option value="">Sélectionner un type</option>
                            <option value="paid">Congés Payés</option>
                            <option value="sick">Maladie</option>
                            <option value="unpaid">Sans Solde</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Start Date */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Date de début</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                            <input required
                                type="date"
                                name="startDate"
                                onChange={(e) => handelChange(e)}
                                className="pl-10 w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3"
                            />
                        </div>
                    </div>

                    {/* End Date */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Date de fin</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                            <input required
                                name="endDate"
                                onChange={(e) => handelChange(e)}
                                type="date"
                                className="pl-10 w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3"
                            />
                        </div>
                    </div>
                </div>

                {/* Duration Estimation (Static for now) */}
                <div className="p-4 bg-violet-50 rounded-xl border border-violet-100 flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Clock className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-violet-900">Durée estimée : <span className="font-bold">0 jours</span></p>
                        <p className="text-xs text-violet-600">Le calcul exact sera fait à la validation.</p>
                    </div>
                </div>

                {/* Reason */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Motif (Optionnel)</label>
                    <textarea
                        required
                        name="reason"
                        onChange={(e) => handelChange(e)}
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3"
                        placeholder="Précisez la raison de votre demande..."
                    ></textarea>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => {
                            const id = document.getElementById("my_modal_8")
                            id?.click()
                        }}
                        className="btn px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-gray-200 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2.5 text-sm font-medium text-white bg-violet-600 rounded-xl hover:bg-violet-700 focus:ring-4 focus:ring-violet-100 transition-colors flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Envoyer la demande
                    </button>
                </div>
            </form>
        </>
    )
}

export default NewRequestHolidays
