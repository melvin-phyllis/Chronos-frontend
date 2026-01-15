import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import handleCancel from "@/controllers/handleCancel";
import fetchHistory from "@/controllers/fetchHistory";
import { io } from "socket.io-client";

interface LeaveRequestHistoryProps {
    refreshTrigger?: number;
    onActionComplete?: () => void;
}

const LeaveRequestHistory = ({ refreshTrigger = 0, onActionComplete }: LeaveRequestHistoryProps) => {
    const [leaves, setLeaves] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedLeaveId, setSelectedLeaveId] = useState<string>("");

    const formattedDate = (dateString: string): string => {
        if (!dateString) return "-";
        return new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(dateString));
    };

    useEffect(() => {
        fetchHistory(setLeaves, setLoading);

        const socket = io(import.meta.env.VITE_BACKEND_URL);

        socket.on('leave_update', () => {
            fetchHistory(setLeaves, setLoading);
        });

        return () => {
            socket.disconnect();
        };
    }, [refreshTrigger]); // Recharge quand le trigger change

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'valide': return "bg-emerald-50 text-emerald-700";
            case 'rejete': return "bg-red-50 text-red-700";
            case 'en_attente': return "bg-amber-50 text-amber-700";
            case 'annule': return "bg-gray-50 text-gray-700";
            default: return "bg-gray-50 text-gray-700";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'valide': return <CheckCircle className="w-3.5 h-3.5" />;
            case 'rejete': return <XCircle className="w-3.5 h-3.5" />;
            case 'en_attente': return <Clock className="w-3.5 h-3.5" />;
            default: return <AlertCircle className="w-3.5 h-3.5" />;
        }
    };

    const formatType = (type: string) => {
        switch (type) {
            case 'conge_paye': return 'Congés Payés';
            case 'conge_maladie': return 'Maladie';
            case 'conge_sans_solde': return 'Sans Solde';
            case 'conge_exceptionnel': return 'Exceptionnel';
            default: return type;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Historique des demandes</h2>
                {/* Filtres futurs */}
            </div>

            {loading ? (
                <div className="p-8 text-center text-gray-500">Chargement...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Dates</th>
                                <th scope="col" className="px-6 py-3">Durée</th>
                                <th scope="col" className="px-6 py-3">Motif</th>
                                <th scope="col" className="px-6 py-3">Date demande</th>
                                <th scope="col" className="px-6 py-3">Statut</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                                        Aucune demande trouvée.
                                    </td>
                                </tr>
                            ) : (
                                leaves.map((item) => (
                                    <tr key={item._id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {formatType(item.type_conge)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formattedDate(item.date_debut)} - {formattedDate(item.date_fin)}
                                        </td>
                                        <td className="px-6 py-4">{item.nombre_jours} jours</td>
                                        <td className="px-6 py-4 truncate max-w-[200px]" title={item.justificatif_texte}>
                                            {item.justificatif_texte || "-"}
                                        </td>
                                        <td className="px-6 py-4">{formattedDate(item.date_demande || item.createdAt)}</td>

                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${getStatusColor(item.statut)}`}>
                                                {getStatusIcon(item.statut)}
                                                <span className="capitalize">{item.statut.replace('_', ' ')}</span>
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            {/* Bouton visible si 'en_attente' OU 'valide' (annulation possible à tout moment selon demande utilisateur) */}
                                            {(item?.statut === 'en_attente' || item?.statut === 'valide') && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedLeaveId(item._id)
                                                        const id = document.getElementById('my_modal_90') as HTMLDialogElement
                                                        id?.showModal()
                                                    }}
                                                    className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
                                                >
                                                    Annuler
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination simple si besoin */}
            {leaves.length > 10 && (
                <div className="p-4 border-t border-gray-100 flex items-center justify-center">
                    <span className="text-sm text-gray-500">Voir tout l'historique</span>
                </div>
            )}


            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_90" className="modal">
                <div className="modal-box !p-0 !max-w-[28rem] !rounded-2xl bg-white overflow-hidden shadow-2xl">
                    <div className="p-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 border border-red-100">
                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                    Annuler la demande
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Êtes-vous sûr de vouloir annuler cette demande de congé ?
                                    Cette action est immédiate et notifiera l'équipe RH.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50/80 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100">
                        <form method="dialog">
                            {/* Close button */}
                            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
                                Retour
                            </button>
                        </form>

                        <button
                            type="button"
                            onClick={() => {
                                handleCancel(selectedLeaveId, setLeaves, leaves, onActionComplete);
                                // Close modal after action
                                const modal = document.getElementById('my_modal_90') as HTMLDialogElement;
                                modal?.close();
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-xl hover:bg-red-700 transition-colors shadow-sm inline-flex items-center gap-2"
                        >
                            <span>Confirmer l'annulation</span>
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default LeaveRequestHistory;
