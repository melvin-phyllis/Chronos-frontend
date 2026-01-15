import { useState, useEffect } from "react";
import { ClipboardList, Clock, CheckCircle, XCircle, AlertTriangle, Send, Calendar } from "lucide-react";
import axios from "axios";
import { ToastSuccess, ToastError } from "@/toastify/react-toastify";
import { io } from "socket.io-client";

interface Task {
    _id: string;
    titre: string;
    description: string;
    progression: number;
    statut: 'en_attente' | 'en_cours' | 'valide' | 'rejete';
    priorite: 'basse' | 'moyenne' | 'haute';
    date_echeance?: string;
    commentaire_admin?: string;
    createdAt: string;
}

const MyTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyTasks();

        const socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.on('task_update', () => fetchMyTasks());
        return () => { socket.disconnect(); };
    }, []);

    const fetchMyTasks = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/my`, { withCredentials: true });
            if (res.data.success) setTasks(res.data.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
            ToastError("Erreur chargement des tâches");
        } finally {
            setLoading(false);
        }
    };

    const handleProgressChange = async (taskId: string, newProgress: number) => {
        try {
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}/progress`,
                { progression: newProgress },
                { withCredentials: true }
            );
            // Optimistic update
            setTasks(prev => prev.map(t => t._id === taskId ? { ...t, progression: newProgress } : t));
        } catch (error: any) {
            ToastError(error.response?.data?.message || "Erreur mise à jour");
            fetchMyTasks();
        }
    };

    const handleSubmit = async (taskId: string) => {
        try {
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}/submit`, {}, { withCredentials: true });
            if (res.data.success) {
                ToastSuccess("Tâche soumise pour validation !");
                fetchMyTasks();
            }
        } catch (error: any) {
            ToastError(error.response?.data?.message || "Erreur soumission");
        }
    };

    // Progress bar color
    const getProgressColor = (progress: number) => {
        if (progress < 30) return "from-rose-400 to-rose-600";
        if (progress < 70) return "from-amber-400 to-amber-600";
        return "from-emerald-400 to-emerald-600";
    };

    const getProgressBg = (progress: number) => {
        if (progress < 30) return "bg-rose-100";
        if (progress < 70) return "bg-amber-100";
        return "bg-emerald-100";
    };

    // Status badge
    const getStatusInfo = (statut: string) => {
        const info: Record<string, { bg: string; text: string; icon: any; label: string }> = {
            en_cours: { bg: "bg-blue-100", text: "text-blue-700", icon: Clock, label: "En cours" },
            en_attente: { bg: "bg-amber-100", text: "text-amber-700", icon: AlertTriangle, label: "En attente de validation" },
            valide: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle, label: "Validée ✓" },
            rejete: { bg: "bg-rose-100", text: "text-rose-700", icon: XCircle, label: "Rejetée - À corriger" }
        };
        return info[statut] || info.en_cours;
    };

    // Priority badge
    const getPriorityStyle = (priorite: string) => {
        const styles: Record<string, string> = {
            basse: "border-gray-300 bg-gray-50",
            moyenne: "border-blue-300 bg-blue-50",
            haute: "border-rose-300 bg-rose-50"
        };
        return styles[priorite] || styles.moyenne;
    };

    const getPriorityLabel = (priorite: string) => {
        const labels: Record<string, string> = {
            basse: "Priorité basse",
            moyenne: "Priorité moyenne",
            haute: "🔥 Priorité haute"
        };
        return labels[priorite] || "Priorité moyenne";
    };

    // Categorize tasks
    const activeTasks = tasks.filter(t => t.statut === 'en_cours' || t.statut === 'rejete');
    const pendingTasks = tasks.filter(t => t.statut === 'en_attente');
    const completedTasks = tasks.filter(t => t.statut === 'valide');

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg">
                    <ClipboardList className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mes Tâches</h1>
                    <p className="text-gray-500">Suivez votre progression et soumettez vos tâches</p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <div className="text-3xl font-bold text-blue-700">{activeTasks.length}</div>
                    <div className="text-sm text-blue-600">En cours</div>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                    <div className="text-3xl font-bold text-amber-700">{pendingTasks.length}</div>
                    <div className="text-sm text-amber-600">En attente</div>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                    <div className="text-3xl font-bold text-emerald-700">{completedTasks.length}</div>
                    <div className="text-sm text-emerald-600">Terminées</div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Chargement...</div>
            ) : tasks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                    <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Aucune tâche assignée pour le moment</p>
                </div>
            ) : (
                <>
                    {/* Active Tasks */}
                    {activeTasks.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                Tâches en cours ({activeTasks.length})
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                {activeTasks.map((task) => {
                                    const statusInfo = getStatusInfo(task.statut);
                                    const StatusIcon = statusInfo.icon;
                                    const canEdit = ['en_cours', 'rejete'].includes(task.statut);
                                    const canSubmit = task.progression === 100 && task.statut !== 'en_attente';

                                    return (
                                        <div key={task._id} className={`bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 ${task.statut === 'rejete' ? 'border-rose-500' : 'border-blue-500'}`}>
                                            <div className="p-5">
                                                {/* Header */}
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-gray-900 text-lg">{task.titre}</h3>
                                                        <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded border ${getPriorityStyle(task.priorite)}`}>
                                                            {getPriorityLabel(task.priorite)}
                                                        </span>
                                                    </div>
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg ${statusInfo.bg} ${statusInfo.text}`}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {statusInfo.label}
                                                    </span>
                                                </div>

                                                {/* Description */}
                                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>

                                                {/* Admin Comment if rejected */}
                                                {task.statut === 'rejete' && task.commentaire_admin && (
                                                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 mb-4">
                                                        <p className="text-xs font-bold text-rose-700 mb-1">Commentaire admin:</p>
                                                        <p className="text-sm text-rose-600">{task.commentaire_admin}</p>
                                                    </div>
                                                )}

                                                {/* Progress Section */}
                                                <div className={`rounded-xl p-4 ${getProgressBg(task.progression)}`}>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-bold text-gray-700">Progression</span>
                                                        <span className={`text-2xl font-bold ${task.progression < 30 ? 'text-rose-600' : task.progression < 70 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                                            {task.progression}%
                                                        </span>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="w-full bg-white/50 rounded-full h-3 mb-3 shadow-inner">
                                                        <div
                                                            className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(task.progression)} transition-all duration-300 shadow`}
                                                            style={{ width: `${task.progression}%` }}
                                                        />
                                                    </div>

                                                    {/* Slider */}
                                                    {canEdit && (
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            step="5"
                                                            value={task.progression}
                                                            onChange={(e) => handleProgressChange(task._id, parseInt(e.target.value))}
                                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                                                        />
                                                    )}
                                                </div>

                                                {/* Deadline */}
                                                {task.date_echeance && (
                                                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                                                        <Calendar className="w-4 h-4" />
                                                        Échéance: {new Date(task.date_echeance).toLocaleDateString('fr-FR')}
                                                    </div>
                                                )}

                                                {/* Submit Button */}
                                                {canSubmit && (
                                                    <button
                                                        onClick={() => handleSubmit(task._id)}
                                                        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-medium hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                        Soumettre pour validation
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Pending Tasks */}
                    {pendingTasks.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                                En attente de validation ({pendingTasks.length})
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                {pendingTasks.map((task) => (
                                    <div key={task._id} className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
                                        <h3 className="font-bold text-gray-900">{task.titre}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                        <div className="mt-3 flex items-center gap-2 text-amber-700 text-sm">
                                            <Clock className="w-4 h-4 animate-pulse" />
                                            En attente de validation par l'admin
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Completed Tasks */}
                    {completedTasks.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                                Tâches terminées ({completedTasks.length})
                            </h2>
                            <div className="grid gap-4 md:grid-cols-3">
                                {completedTasks.map((task) => (
                                    <div key={task._id} className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{task.titre}</h3>
                                                <p className="text-xs text-emerald-600 mt-1">Validée ✓</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyTasks;
