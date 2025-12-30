import { Calendar, Save } from "lucide-react"
import { useRef, useState } from "react"
import MakeTask from "../controllers/MakeTask"
import EmployeeStore from "../Store/EmployeeStore"
import type { formAddTAskType } from "../types"

const CreatenoteEmployee = () => {

    const ref = useRef<HTMLFormElement>(null)
    const { Employee, addTasks } = EmployeeStore()
    const [formAddTAsk, setFormAddTask] = useState<formAddTAskType>({
        employeeCode: `${Employee?.employeeCode}`,
        title: "",
        status: "",
        priorite: "",
        expiryDate: "",
        notes: ""
    })
    const today = new Date().toISOString().split("T")[0]


    const handlechange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormAddTask(prev => ({
            ...prev, [name]: value
        }))

    }

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Nouvelle Tâche / Note</h2>
                    <p className="text-sm text-gray-500 mt-1">Ajoutez une nouvelle tâche à votre planning personnel.</p>
                </div>
            </div>

            <form ref={ref} className="space-y-6"
                onSubmit={(e) => {
                    MakeTask(e, formAddTAsk, addTasks,ref)
                }}>
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Titre de la tâche</label>
                    <input required
                        onChange={(e) => handlechange(e)}
                        type="text"
                        name="title"
                        placeholder="Ex: Préparer la réunion client..."
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Status */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Statut</label>
                        <select
                            required
                            onChange={(e) => handlechange(e)}
                            name="status"

                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3">
                                
                            <option value="todo">À Faire</option>
                            <option value="progress">En Cours</option>
                            <option value="done">Terminé</option>
                        </select>
                    </div>

                    {/* Priority */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Priorité</label>
                        <select
                            required
                            onChange={(e) => handlechange(e)}
                            name="priorite" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3">
                            <option value="normal">Normale</option>
                            <option value="high">Haute</option>
                            <option value="low">Basse</option>
                        </select>
                    </div>
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Date d'échéance</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            required
                            onChange={(e) => handlechange(e)}
                            min={today}
                            name="expiryDate"
                            type="date"
                            className="pl-10 w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Description / Notes</label>
                    <textarea
                        required
                        onChange={(e) => handlechange(e)}
                        name="notes"
                        rows={4}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3"
                        placeholder="Détails supplémentaires..."
                    ></textarea>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => {
                            const id = document.getElementById("my_modal_note")
                            ref?.current?.reset()
                            id?.click()
                        }}
                        className="btn px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="btn px-5 py-2.5 text-sm font-medium text-white bg-violet-600 rounded-xl hover:bg-violet-700 focus:ring-4 focus:ring-violet-100 transition-colors flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Enregistrer
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreatenoteEmployee
