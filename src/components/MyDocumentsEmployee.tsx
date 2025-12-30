import { Download, FileCheck, FileSignature, MailOpen, ShieldCheck, Eye, FileEdit, X } from "lucide-react"
import FormUpdateDocumentsEmployee from "./FormUpdateDocumentsEmployee";

const MyDocumentsEmployee = () => {
    // Liste des documents pour le rendu dynamique
    const documents = [
        { title: "CV & Portfolio", icon: FileCheck, subtitle: "Dernière mise à jour : --/--/----", action: "Voir" },
        { title: "Pièce d'Identité", icon: ShieldCheck, subtitle: "Vérifié • Expire le --/--/----", action: "Voir" },
        { title: "Contrat de Travail", icon: FileSignature, subtitle: "Signé le --/--/----", action: "Télécharger" },
        { title: "Lettre d'Offre", icon: MailOpen, subtitle: "Acceptée le --/--/----", action: "Voir" }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Mes Documents</h1>
                    <p className="text-sm text-gray-500 mt-2 max-w-md">
                        Gérez vos documents administratifs et contractuels indispensables à votre dossier employé.
                    </p>
                </div>

                <button className="btn" onClick={() => {
                    const id = document.getElementById('my_modal_44') as HTMLDialogElement;
                    id.showModal();
                }}>Modifier un Document</button>
            </div>

            {/* Essential Documents Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {documents.map((doc, index) => (
                    <div key={index} className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl ring-8 ring-violet-50/50">
                                <doc.icon className="w-6 h-6" />
                            </div>
                        </div>

                        <h3 className="font-bold text-gray-900 mb-1">{doc.title}</h3>
                        <p className="text-xs text-gray-500 mb-4">{doc.subtitle}</p>

                        <div className="flex items-center gap-2 mt-auto">
                            <button className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${doc.action === 'Télécharger'
                                ? 'bg-violet-600 text-white shadow-lg shadow-violet-200 hover:bg-violet-700'
                                : 'bg-gray-50 text-gray-600 hover:bg-violet-50 hover:text-violet-600'
                                }`}>
                                {doc.action === 'Télécharger' ? <Download className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                {doc.action}
                            </button>
                            {doc.action !== 'Télécharger' && (
                                <button className="p-2 bg-gray-50 text-gray-400 hover:bg-violet-50 hover:text-violet-600 rounded-xl transition-all">
                                    <Download className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>



            <dialog id="my_modal_44" className="modal modal-bottom sm:modal-middle backdrop-blur-xs">
                <div className="modal-box p-0 rounded-[2rem] border-none shadow-2xl overflow-hidden max-w-[480px] bg-white">
                    <div className="h-2 bg-linear-to-r from-violet-600 via-fuchsia-500 to-violet-600">

                    </div>

                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 ring-8 ring-violet-50/50">
                                <FileEdit className="w-6 h-6" />
                            </div>
                            <form method="dialog">
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </form>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Demande de Modification</h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Sélectionnez le document et décrivez les changements nécessaires.
                            </p>
                        </div>

                        <FormUpdateDocumentsEmployee />
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default MyDocumentsEmployee;
