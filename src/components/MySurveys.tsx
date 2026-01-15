import { useEffect, useState } from "react";
import { CheckCircle, MessageSquare, Send, X } from "lucide-react";
import { fetchSurveys, submitSurvey, type SurveyType } from "@/controllers/fetchSurveys";

const MySurveys = () => {
    const [surveys, setSurveys] = useState<SurveyType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSurvey, setSelectedSurvey] = useState<SurveyType | null>(null);
    const [responses, setResponses] = useState<{ [key: number]: any }>({});

    useEffect(() => {
        fetchSurveys(setSurveys, setLoading);
    }, []);

    const handleOpenSurvey = (survey: SurveyType) => {
        if (!survey.responded) {
            setSelectedSurvey(survey);
            setResponses({});
        }
    };

    const handleCloseModal = () => {
        setSelectedSurvey(null);
        setResponses({});
    };

    const handleInputChange = (index: number, value: any) => {
        setResponses(prev => ({ ...prev, [index]: value }));
    };

    const handleSubmit = () => {
        if (!selectedSurvey) return;

        // Validation simple
        for (let i = 0; i < selectedSurvey.questions.length; i++) {
            if (selectedSurvey.questions[i].obligatoire && !responses[i]) {
                alert(`La question "${selectedSurvey.questions[i].question}" est obligatoire.`);
                return;
            }
        }

        const formattedResponses = Object.entries(responses).map(([key, value]) => ({
            question_index: parseInt(key),
            reponse: value
        }));

        submitSurvey(selectedSurvey._id, formattedResponses, () => {
            handleCloseModal();
            fetchSurveys(setSurveys, setLoading); // Rafraîchir
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Sondages & Enquêtes</h1>
                    <p className="text-sm text-gray-500 mt-1">Participez à la vie de l'entreprise en donnant votre avis</p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-400">Chargement...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {surveys.length === 0 ? (
                        <div className="col-span-full text-center py-10 bg-white rounded-2xl border border-gray-100">
                            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">Aucun sondage disponible pour le moment.</p>
                        </div>
                    ) : (
                        surveys.map((survey) => (
                            <div
                                key={survey._id}
                                className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between transition-all hover:shadow-md ${survey.responded ? 'opacity-70' : 'hover:border-violet-200'}`}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-xl ${survey.responded ? 'bg-green-50 text-green-600' : 'bg-violet-50 text-violet-600'}`}>
                                            {survey.responded ? <CheckCircle className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                                        </div>
                                        {survey.responded && (
                                            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                Répondu
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{survey.titre}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">{survey.description}</p>

                                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                                        <span>{survey.questions.length} question(s)</span>
                                        <span>•</span>
                                        <span>Fin le {survey.date_fin ? new Date(survey.date_fin).toLocaleDateString() : 'Indéterminé'}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleOpenSurvey(survey)}
                                    disabled={survey.responded}
                                    className={`w-full py-2.5 rounded-xl font-medium transition-colors ${survey.responded
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-gray-900 text-white hover:bg-violet-600'
                                        }`}
                                >
                                    {survey.responded ? 'Déjà participé' : 'Participer maintenant'}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Modal de réponse */}
            {selectedSurvey && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedSurvey.titre}</h3>
                                <p className="text-sm text-gray-500 mt-1">Merci de répondre honnêtement</p>
                            </div>
                            <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-8">
                            {selectedSurvey.questions.map((q, idx) => (
                                <div key={idx} className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                                        {idx + 1}. {q.question} {q.obligatoire && <span className="text-red-500">*</span>}
                                    </label>

                                    {/* Types de réponses */}
                                    {q.type === 'texte_libre' && (
                                        <textarea
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                                            rows={3}
                                            placeholder="Votre réponse..."
                                            onChange={(e) => handleInputChange(idx, e.target.value)}
                                        />
                                    )}

                                    {q.type === 'oui_non' && (
                                        <div className="flex gap-4">
                                            {['Oui', 'Non'].map((opt) => (
                                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`q_${idx}`}
                                                        value={opt}
                                                        onChange={(e) => handleInputChange(idx, e.target.value)}
                                                        className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                                                    />
                                                    <span className="text-sm text-gray-700">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {q.type === 'choix_multiple' && q.options && (
                                        <div className="space-y-2">
                                            {q.options.map((opt) => (
                                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`q_${idx}`}
                                                        value={opt}
                                                        onChange={(e) => handleInputChange(idx, e.target.value)}
                                                        className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                                                    />
                                                    <span className="text-sm text-gray-700">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {q.type === 'echelle' && (
                                        <div className="flex justify-between max-w-sm">
                                            {[1, 2, 3, 4, 5].map((val) => (
                                                <label key={val} className="cursor-pointer flex flex-col items-center gap-1 group">
                                                    <input
                                                        type="radio"
                                                        name={`q_${idx}`}
                                                        value={val}
                                                        onChange={(e) => handleInputChange(idx, e.target.value)}
                                                        className="peer sr-only"
                                                    />
                                                    <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-sm font-medium text-gray-500 peer-checked:border-violet-600 peer-checked:bg-violet-50 peer-checked:text-violet-600 transition-all group-hover:border-violet-300">
                                                        {val}
                                                    </div>
                                                    <span className="text-[10px] text-gray-400">
                                                        {val === 1 && 'Faible'}
                                                        {val === 5 && 'Excellent'}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
                            <button
                                onClick={handleCloseModal}
                                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-violet-600 transition-colors flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Envoyer ma réponse
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MySurveys;
