import { FileEdit, Send, X } from "lucide-react";

const FormUpdateDocumentsEmployee = () => {
    return (
        <>
            <form className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Document à modifier</label>
                    <select className="select select-bordered w-full rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all">
                        <option disabled selected>Choisir un document...</option>
                        <option value={"r"}>Choisir un document...</option>
                        <option value={"r"}>Choisir un document...</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Détails de la modification</label>
                    <textarea
                        placeholder="Ex: Mise à jour de mon adresse ou correction d'une erreur..."
                        className="textarea textarea-bordered min-h-[120px] w-full rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all resize-none p-4"
                    />
                </div>

                <div className="modal-action gap-3 pt-4">
                    <form method="dialog" className="flex-1">
                        <button className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-2xl transition-all">
                            Annuler
                        </button>
                    </form>
                    <button type="button" className="flex-1 py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-2 active:scale-95">
                        <Send className="w-4 h-4" />
                        Envoyer
                    </button>
                </div>
            </form>
        </>
    );
};

export default FormUpdateDocumentsEmployee;