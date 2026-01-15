import { useState, useEffect } from "react";
import { Plus, Trash, X, CheckCircle, AlertCircle, Eye } from "lucide-react";
import axios from "axios";
import { ToastSuccess, ToastError } from "@/toastify/react-toastify";

const AdminSurveys = () => {
    const [activeTab, setActiveTab] = useState<'create' | 'list'>('list');
    const [surveys, setSurveys] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [viewResponse, setViewResponse] = useState<any>(null); // Pour voir les réponses d'un employé spécifique

    // Form states
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [questions, setQuestions] = useState<any[]>([
        { question: "", type: "choix_multiple", options: ["Oui", "Non"], obligatoire: true }
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (activeTab === 'list') {
            fetchSurveys();
        }
    }, [activeTab]);

    const fetchSurveys = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/surveys/admin/all`, { withCredentials: true });
            if (res.data.success) {
                setSurveys(res.data.data);
            }
        } catch (error) {
            console.error("Erreur chargement sondages", error);
        }
    };

    const fetchStats = async (id: string) => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/surveys/${id}/stats`, { withCredentials: true });
            if (res.data.success) {
                setStats(res.data.data);

                // Open modal
                const modal = document.getElementById('survey_stats_modal') as HTMLDialogElement;
                if (modal) modal.showModal();
            }
        } catch (error) {
            console.error("Erreur chargement stats", error);
            ToastError("Impossible de charger les statistiques.");
        } finally {
            setLoading(false);
        }
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: "", type: "choix_multiple", options: [], obligatoire: true }]);
    };

    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const updateQuestion = (index: number, field: string, value: any) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex: number, optionsString: string) => {
        const options = optionsString.split(',').map(s => s.trim()).filter(s => s !== "");
        updateQuestion(qIndex, 'options', options);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/surveys/create`, {
                titre,
                description,
                questions,
                date_fin: dateFin ? new Date(dateFin) : null
            }, {
                withCredentials: true
            });

            if (res.data.success) {
                ToastSuccess("Sondage créé et publié avec succès !");
                setTitre("");
                setDescription("");
                setDateFin("");
                setQuestions([{ question: "", type: "choix_multiple", options: ["Oui", "Non"], obligatoire: true }]);
                setActiveTab('list'); // Retour à la liste
            }
        } catch (error) {
            console.error(error);
            ToastError("Erreur lors de la création du sondage.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Sondages</h1>
                    <p className="text-sm text-gray-500 mt-1">Créez et suivez les enquêtes employés</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('list')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Liste des sondages
                    </button>
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'create' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Nouveau sondage
                    </button>
                </div>
            </div>

            {activeTab === 'list' ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4">Titre</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4">Date Fin</th>
                                    <th className="px-6 py-4">Questions</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {surveys.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-400">Aucun sondage créé.</td>
                                    </tr>
                                ) : (
                                    surveys.map((survey) => (
                                        <tr key={survey._id} className="border-b hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{survey.titre}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                                    ${survey.statut === 'actif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {survey.statut}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {survey.date_fin ? new Date(survey.date_fin).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="px-6 py-4">{survey.questions?.length || 0}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => fetchStats(survey._id)}
                                                    className="text-violet-600 hover:text-violet-800 font-medium text-xs bg-violet-50 px-3 py-1.5 rounded-lg transition-colors border border-violet-100 hover:border-violet-200"
                                                >
                                                    Voir Stats
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
                    {/* Infos Générales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Titre du sondage</label>
                            <input
                                type="text"
                                required
                                value={titre}
                                onChange={(e) => setTitre(e.target.value)}
                                placeholder="Ex: Satisfaction Q1 2026"
                                className="input input-bordered w-full rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Date de fin (Optionnel)</label>
                            <input
                                type="date"
                                value={dateFin}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDateFin(e.target.value)}
                                className="input input-bordered w-full rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="col-span-full space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Objectif du sondage..."
                                className="textarea textarea-bordered w-full rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all min-h-[80px]"
                            />
                        </div>
                    </div>

                    <div className="divider">Questions</div>

                    <div className="space-y-6">
                        {questions.map((q, idx) => (
                            <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group">
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(idx)}
                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 col-span-full md:col-span-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Question {idx + 1}</label>
                                        <input
                                            type="text"
                                            required
                                            value={q.question}
                                            onChange={(e) => updateQuestion(idx, 'question', e.target.value)}
                                            placeholder="Votre question ?"
                                            className="input input-bordered w-full rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Type de réponse</label>
                                        <select
                                            value={q.type}
                                            onChange={(e) => updateQuestion(idx, 'type', e.target.value)}
                                            className="select select-bordered w-full rounded-xl"
                                        >
                                            <option value="choix_multiple">Choix Multiple</option>
                                            <option value="texte_libre">Texte Libre</option>
                                            <option value="oui_non">Oui / Non</option>
                                            <option value="echelle">Echelle (1-5)</option>
                                        </select>
                                    </div>

                                    {q.type === 'choix_multiple' && (
                                        <div className="col-span-full space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Options (séparées par des virgules)</label>
                                            <input
                                                type="text"
                                                placeholder="Ex: Option A, Option B, Option C"
                                                defaultValue={q.options?.join(', ')}
                                                onBlur={(e) => handleOptionChange(idx, e.target.value)}
                                                className="input input-bordered w-full rounded-xl border-dashed"
                                            />
                                        </div>
                                    )}

                                    <div className="col-span-full pt-2">
                                        <label className="flex items-center gap-2 cursor-pointer w-fit">
                                            <input
                                                type="checkbox"
                                                checked={q.obligatoire}
                                                onChange={(e) => updateQuestion(idx, 'obligatoire', e.target.checked)}
                                                className="checkbox checkbox-sm checkbox-primary rounded-md"
                                            />
                                            <span className="text-sm text-gray-700">Réponse obligatoire</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addQuestion}
                        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 font-bold hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Ajouter une question
                    </button>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn bg-gray-900 hover:bg-violet-600 text-white border-none rounded-xl px-8"
                        >
                            {loading ? "Publication..." : "Publier le sondage"}
                        </button>
                    </div>
                </form>
            )}

            {/* Modal Stats */}
            <dialog id="survey_stats_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl bg-white rounded-2xl p-0 overflow-hidden text-gray-900 relative">
                    {/* Overlay pour voir les réponses individuelles */}
                    {viewResponse && (
                        <div className="absolute inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-right duration-300">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-violet-50">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setViewResponse(null)} className="btn btn-sm btn-circle btn-ghost hover:bg-white/50">
                                        <X className="w-5 h-5" />
                                    </button>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">Réponses de {viewResponse.fullname}</h3>
                                        <p className="text-xs text-gray-500">{viewResponse.post}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 overflow-y-auto flex-1 space-y-6">
                                {stats?.survey?.questions?.map((q: any, idx: number) => {
                                    const answer = viewResponse.surveyResponses?.find((r: any) => r.question_index === idx);
                                    let displayAnswer = "Non répondu";

                                    if (answer) {
                                        if (q.type === 'choix_multiple' && Array.isArray(answer.reponse)) {
                                            displayAnswer = answer.reponse.join(', ');
                                        } else if (typeof answer.reponse === 'boolean') {
                                            displayAnswer = answer.reponse ? "Oui" : "Non";
                                        } else {
                                            displayAnswer = String(answer.reponse);
                                        }
                                    }

                                    return (
                                        <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <p className="text-sm font-bold text-gray-700 mb-2">Q{idx + 1}. {q.question}</p>
                                            <p className="text-gray-900 bg-white p-3 rounded-lg border border-gray-200 text-sm">
                                                {displayAnswer}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {stats && (
                        <>
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900">{stats.survey.titre}</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Taux de réponse : {Math.round((stats.responseCount / stats.totalEmployees) * 100)}%
                                        ({stats.responseCount}/{stats.totalEmployees})
                                    </p>
                                </div>
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-gray-200">
                                        <X className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto">
                                {/* Colonne Répondants */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 bg-green-50 p-3 rounded-xl border border-green-100">
                                        <div className="p-2 bg-green-100 rounded-lg text-green-700">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-green-900">Ont répondu ({stats.respondents.length})</h4>
                                            <p className="text-xs text-green-700">Merci pour leur participation</p>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden bg-white">
                                        {stats.respondents.map((emp: any) => (
                                            <div key={emp._id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">
                                                        {emp.fullname?.substring(0, 2).toUpperCase() || "NA"}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">{emp.fullname || "Employé Inconnu"}</p>
                                                        <p className="text-xs text-gray-500">{emp.post} - {emp.department}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setViewResponse(emp)}
                                                    className="px-3 py-1 text-xs font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors border border-violet-100 flex items-center gap-1"
                                                >
                                                    <Eye className="w-3 h-3" />
                                                    Voir réponses
                                                </button>
                                            </div>
                                        ))}
                                        {stats.respondents.length === 0 && (
                                            <div className="p-6 text-center text-gray-400 text-sm italic">
                                                Aucun répondant pour le moment.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Colonne Non Répondants */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-xl border border-amber-100">
                                        <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                                            <AlertCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-amber-900">En attente ({stats.nonRespondents.length})</h4>
                                            <p className="text-xs text-amber-700">N'ont pas encore soumis</p>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden bg-white">
                                        {stats.nonRespondents.map((emp: any) => (
                                            <div key={emp._id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                                                        {emp.fullname?.substring(0, 2).toUpperCase() || 'NA'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">{emp.fullname || "Nom Inconnu"}</p>
                                                        <p className="text-xs text-gray-500">{emp.post} - {emp.department}</p>
                                                    </div>
                                                </div>
                                                <button className="px-3 py-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors border border-amber-100">
                                                    Relancer
                                                </button>
                                            </div>
                                        ))}
                                        {stats.nonRespondents.length === 0 && (
                                            <div className="p-6 text-center text-gray-400 text-sm italic">
                                                Tous les employés ont répondu ! 🎉
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default AdminSurveys;
