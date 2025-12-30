import { Calendar, Save } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import EmployeeStore from "../Store/EmployeeStore"
import updateNote from "../controllers/updateNote"
import type { formAddTAskType } from "../types"

const UpdatenoteEmployee = ({ updateTask }: { updateTask: formAddTAskType }) => {

    const initialformAddTask: formAddTAskType = {

        title: "",
        status: "",
        priorite: "",
        expiryDate: "",
        notes: ""
    }

    const ref = useRef<HTMLFormElement>(null)

    const { updateTasks } = EmployeeStore()

    const [formAddTAsk, setFormAddTask] = useState<formAddTAskType>(initialformAddTask)

    const today = new Date().toISOString().split("T")[0]


    const handlechange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormAddTask(prev => ({
            ...prev, [name]: value
        }))

    }

    useEffect(() => {
        setFormAddTask(updateTask!)
    }, [updateTask!])

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Mettre a jour la note</h2>
                    <p className="text-sm text-gray-500 mt-1">Mettez a jour la note de la tâche.</p>
                </div>
            </div>

            <form ref={ref} className="space-y-6"
                onSubmit={(e) => {
                    updateNote(e, formAddTAsk, updateTasks)
                }}>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Titre de la tâche</label>
                    <input required
                        value={formAddTAsk?.title}
                        onChange={(e) => handlechange(e)}
                        type="text"
                        name="title"
                        placeholder="Ex: Préparer la réunion client..."
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Statut</label>
                        <select
                            value={formAddTAsk?.status}
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
                            value={formAddTAsk?.priorite}
                            required
                            onChange={(e) => handlechange(e)}
                            name="priorite"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3">
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
                            value={formAddTAsk?.expiryDate}
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
                        value={formAddTAsk?.notes}
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
                            const id = document.getElementById("my_modal_2")
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

export default UpdatenoteEmployee
