import { Send } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { ToastSuccess, ToastError } from "@/toastify/react-toastify";

const FormUpdateDocumentsEmployee = () => {
    const [docType, setDocType] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => { // e: React.FormEvent added to prevent default form submission if button type wasn't button
        e.preventDefault();

        if (!docType || !reason) {
            ToastError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/update-file-document`, {
                documentType: docType,
                reason: reason
            }, {
                withCredentials: true
            });

            if (res.data.success) {
                ToastSuccess("Votre demande a été envoyée aux RH.");
                setDocType("");
                setReason("");
                // Fermer le modal via le DOM (daisyUI hack)
                const modal = document.getElementById('my_modal_44') as HTMLDialogElement;
                modal?.close();
            } else {
                ToastError("Erreur lors de l'envoi.");
            }
        } catch (error) {
            console.error(error);
            ToastError("Erreur serveur.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Document à modifier</label>
                    <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value)}
                        className="select select-bordered w-full rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all text-gray-900"
                    >
                        <option value="" disabled>Choisir un document...</option>
                        <option value="cvAndPortfolio">CV & Portfolio</option>
                        <option value="proofOfIdentity">Pièce d'Identité</option>
                        <option value="signedContract">Contrat de Travail</option>
                        <option value="payrollInformation">Coordonnées Bancaires</option>
                        <option value="other">Autre</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Détails de la modification</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Ex: Mise à jour de mon adresse ou correction d'une erreur..."
                        className="textarea textarea-bordered min-h-[120px] w-full rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all resize-none p-4 text-gray-900"
                    />
                </div>

                <div className="modal-action gap-3 pt-4">
                    <button type="button" className="flex-1 py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-2xl transition-all" onClick={() => {
                        const modal = document.getElementById('my_modal_44') as HTMLDialogElement;
                        modal?.close();
                    }}>
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                        {loading ? "Envoi..." : "Envoyer"}
                    </button>
                </div>
            </form>
        </>
    );
};

export default FormUpdateDocumentsEmployee;