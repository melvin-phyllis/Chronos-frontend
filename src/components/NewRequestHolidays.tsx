import { type formLeaveRequestType } from "@/types";
import { Calendar, Clock, Save } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import axios from "axios";
import { ToastError, ToastSuccess } from "@/toastify/react-toastify";

interface NewRequestHolidaysProps {
    onSuccess?: () => void;
}

const NewRequestHolidays = ({ onSuccess }: NewRequestHolidaysProps) => {
    const ref = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<formLeaveRequestType>({
        type_conge: "",
        date_debut: "",
        date_fin: "",
        justificatif_texte: ""
    });

    const [estimatedDays, setEstimatedDays] = useState(0);

    const calculateDifference = (start: string, end: string) => {
        if (!start || !end) return 0;
        const d1 = new Date(start);
        const d2 = new Date(end);
        const diff = d2.getTime() - d1.getTime();
        const days = Math.ceil(diff / (1000 * 3600 * 24)) + 1;
        return days > 0 ? days : 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updated = { ...prev, [name]: value };
            if (name === 'date_debut' || name === 'date_fin') {
                setEstimatedDays(calculateDifference(
                    name === 'date_debut' ? value : prev.date_debut,
                    name === 'date_fin' ? value : prev.date_fin
                ));
            }
            return updated;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/leave/create`, formData, {
                withCredentials: true
            });

            if (res.data.success) {
                ToastSuccess("Demande envoyée avec succès !");

                ref.current?.reset();
                setFormData({ type_conge: "", date_debut: "", date_fin: "", justificatif_texte: "" });
                setEstimatedDays(0);
                document.getElementById("my_modal_8")?.click(); // Fermer modal

                if (onSuccess) {
                    onSuccess();
                }
            } else {
                ToastError(res.data.message);
            }
        } catch (error: any) {
            ToastError(error.response?.data?.message || "Erreur lors de l'envoi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Nouvelle demande de congé</h2>
                    <p className="text-sm text-gray-500 mt-1">Remplissez le formulaire ci-dessous pour soumettre votre demande.</p>
                </div>
            </div>

            <form ref={ref} className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Leave Type */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Type de congé</label>
                        <select
                            name="type_conge"
                            required
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3">
                            <option value="">Sélectionner un type</option>
                            <option value="conge_paye">Congés Payés</option>
                            <option value="conge_maladie">Maladie</option>
                            <option value="conge_sans_solde">Sans Solde</option>
                            <option value="conge_exceptionnel">Exceptionnel</option>
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
                                name="date_debut"
                                onChange={handleChange}
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
                                name="date_fin"
                                onChange={handleChange}
                                type="date"
                                className="pl-10 w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3"
                            />
                        </div>
                    </div>
                </div>

                {/* Duration Estimation */}
                <div className="p-4 bg-violet-50 rounded-xl border border-violet-100 flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Clock className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-violet-900">Durée estimée : <span className="font-bold">{estimatedDays} jours</span></p>
                        <p className="text-xs text-violet-600">Le calcul exact sera fait à la validation.</p>
                    </div>
                </div>

                {/* Reason */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Motif (Optionnel)</label>
                    <textarea
                        name="justificatif_texte"
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block p-3"
                        placeholder="Précisez la raison de votre demande..."
                    ></textarea>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <div
                        onClick={() => document.getElementById("my_modal_8")?.click()}
                        className="btn px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer"
                    >
                        Annuler
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-violet-600 rounded-xl hover:bg-violet-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? 'Envoi...' : 'Envoyer la demande'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default NewRequestHolidays
