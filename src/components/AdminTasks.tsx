import { useState, useEffect } from "react";
import { Plus, ClipboardList, CheckCircle, XCircle, Clock, AlertTriangle, Search, Filter, ChevronDown, X, Eye } from "lucide-react";
import axios from "axios";
import { ToastSuccess, ToastError } from "@/toastify/react-toastify";
import { io } from "socket.io-client";

interface Task {
    _id: string;
    user_id: { _id: string; nom: string; firstname: string; email: string };
    employeeDetails?: { fullname: string; employeeCode: string; department: string; post: string };
    titre: string;
    description: string;
    progression: number;
    statut: 'en_attente' | 'en_cours' | 'valide' | 'rejete';
    priorite: 'basse' | 'moyenne' | 'haute';
    date_echeance?: string;
    createdAt: string;
}

interface TaskStats {
    en_cours: number;
    en_attente: number;
    valide: number;
    rejete: number;
}

const AdminTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [stats, setStats] = useState<TaskStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState<any[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showValidateModal, setShowValidateModal] = useState<Task | null>(null);
    const [showDetailModal, setShowDetailModal] = useState<Task | null>(null);

    // Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    // New Task Form
    const [newTask, setNewTask] = useState({
        user_id: "",
        titre: "",
        description: "",
        priorite: "moyenne",
        date_echeance: ""
    });

    useEffect(() => {
        fetchTasks();
        fetchStats();
        fetchEmployees();

        const socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.on('task_update', () => {
            fetchTasks();
            fetchStats();
        });

        return () => { socket.disconnect(); };
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/all`, { withCredentials: true });
            if (res.data.success) setTasks(res.data.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
            ToastError("Erreur chargement des tâches");
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/stats`, { withCredentials: true });
            if (res.data.success) setStats(res.data.data);
        } catch (error) {
            console.error("Error fetching stats", error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/employees-for-tasks`, { withCredentials: true });
            if (res.data.success) setEmployees(res.data.data);
        } catch (error) {
            console.error("Error fetching employees", error);
        }
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tasks/create`, newTask, { withCredentials: true });
            if (res.data.success) {
                ToastSuccess("Tâche créée avec succès !");
                setShowCreateModal(false);
                setNewTask({ user_id: "", titre: "", description: "", priorite: "moyenne", date_echeance: "" });
                fetchTasks();
                fetchStats();
            }
        } catch (error: any) {
            ToastError(error.response?.data?.message || "Erreur création tâche");
        }
    };

    const handleValidate = async (taskId: string, statut: 'valide' | 'rejete', commentaire?: string) => {
        try {
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}/validate`,
                { statut, commentaire_admin: commentaire },
                { withCredentials: true }
            );
            if (res.data.success) {
                ToastSuccess(`Tâche ${statut === 'valide' ? 'validée' : 'rejetée'} !`);
                setShowValidateModal(null);
                fetchTasks();
                fetchStats();
            }
        } catch (error: any) {
            ToastError(error.response?.data?.message || "Erreur validation");
        }
    };

    // Progress bar color
    const getProgressColor = (progress: number) => {
        if (progress < 30) return "bg-rose-500";
        if (progress < 70) return "bg-amber-500";
        return "bg-emerald-500";
    };

    // Status badge
    const getStatusBadge = (statut: string) => {
        const badges: Record<string, { bg: string; text: string; icon: any; label: string }> = {
            en_cours: { bg: "bg-blue-100", text: "text-blue-700", icon: Clock, label: "En cours" },
            en_attente: { bg: "bg-amber-100", text: "text-amber-700", icon: AlertTriangle, label: "Soumise" },
            valide: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle, label: "Validée" },
            rejete: { bg: "bg-rose-100", text: "text-rose-700", icon: XCircle, label: "Rejetée" }
        };
        const badge = badges[statut] || badges.en_cours;
        const Icon = badge.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg ${badge.bg} ${badge.text}`}>
                <Icon className="w-3 h-3" />
                {badge.label}
            </span>
        );
    };

    // Priority badge
    const getPriorityBadge = (priorite: string) => {
        const colors: Record<string, string> = {
            basse: "bg-gray-100 text-gray-600",
            moyenne: "bg-blue-100 text-blue-700",
            haute: "bg-rose-100 text-rose-700"
        };
        return <span className={`px-2 py-1 text-xs font-medium rounded-lg ${colors[priorite] || colors.moyenne}`}>{priorite}</span>;
    };

    // Filtered tasks
    const filteredTasks = tasks.filter(t => {
        const matchesSearch = searchTerm === "" ||
            t.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.employeeDetails?.fullname?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || t.statut === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-blue-700">En cours</span>
                        <div className="p-2 bg-white/80 rounded-lg"><Clock className="w-4 h-4 text-blue-600" /></div>
                    </div>
                    <div className="p-5">
                        <span className="text-4xl font-bold text-gray-900">{stats?.en_cours || 0}</span>
                        <div className="text-sm text-gray-500">Tâches actives</div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gradient-to-br from-amber-100 to-amber-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-amber-700">À valider</span>
                        <div className="p-2 bg-white/80 rounded-lg"><AlertTriangle className="w-4 h-4 text-amber-600" /></div>
                    </div>
                    <div className="p-5">
                        <span className="text-4xl font-bold text-gray-900">{stats?.en_attente || 0}</span>
                        <div className="text-sm text-gray-500">En attente de validation</div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-emerald-700">Validées</span>
                        <div className="p-2 bg-white/80 rounded-lg"><CheckCircle className="w-4 h-4 text-emerald-600" /></div>
                    </div>
                    <div className="p-5">
                        <span className="text-4xl font-bold text-gray-900">{stats?.valide || 0}</span>
                        <div className="text-sm text-gray-500">Tâches terminées</div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gradient-to-br from-rose-100 to-rose-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-rose-700">Rejetées</span>
                        <div className="p-2 bg-white/80 rounded-lg"><XCircle className="w-4 h-4 text-rose-600" /></div>
                    </div>
                    <div className="p-5">
                        <span className="text-4xl font-bold text-gray-900">{stats?.rejete || 0}</span>
                        <div className="text-sm text-gray-500">À corriger</div>
                    </div>
                </div>
            </div>

            {/* Tasks Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-violet-100 rounded-lg">
                                <ClipboardList className="w-5 h-5 text-violet-600" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Gestion des Tâches</h1>
                                <p className="text-sm text-gray-500">Créer, suivre et valider les tâches employés</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 items-center">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 w-64"
                                />
                            </div>

                            <div className="relative">
                                <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-100">
                                    <Filter className="w-4 h-4 text-gray-500" />
                                    Filtrer
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>
                                {showFilters && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50 p-3">
                                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="select select-bordered w-full select-sm rounded-lg">
                                            <option value="all">Tous les statuts</option>
                                            <option value="en_cours">En cours</option>
                                            <option value="en_attente">À valider</option>
                                            <option value="valide">Validées</option>
                                            <option value="rejete">Rejetées</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 shadow-sm">
                                <Plus className="w-4 h-4" />
                                Nouvelle tâche
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Employé</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Tâche</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Priorité</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Progression</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Statut</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Échéance</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={7} className="text-center py-8 text-gray-500">Chargement...</td></tr>
                            ) : filteredTasks.length === 0 ? (
                                <tr><td colSpan={7} className="text-center py-8 text-gray-500">Aucune tâche trouvée.</td></tr>
                            ) : (
                                filteredTasks.map((task) => (
                                    <tr key={task._id} className="hover:bg-violet-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm uppercase">
                                                    {task.employeeDetails?.fullname?.substring(0, 2) || task.user_id?.nom?.charAt(0) || "?"}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">{task.employeeDetails?.fullname || `${task.user_id?.firstname} ${task.user_id?.nom}`}</div>
                                                    <div className="text-xs text-gray-500">{task.employeeDetails?.department || "N/A"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-gray-900">{task.titre}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1 max-w-xs">{task.description}</div>
                                        </td>
                                        <td className="px-6 py-4">{getPriorityBadge(task.priorite)}</td>
                                        <td className="px-6 py-4">
                                            <div className="w-32">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="font-medium text-gray-700">{task.progression}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className={`h-2 rounded-full transition-all ${getProgressColor(task.progression)}`} style={{ width: `${task.progression}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{getStatusBadge(task.statut)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {task.date_echeance ? new Date(task.date_echeance).toLocaleDateString('fr-FR') : "--"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setShowDetailModal(task)} className="px-3 py-1.5 bg-violet-100 text-violet-700 text-xs font-medium rounded-lg hover:bg-violet-200" title="Voir détails">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {task.statut === "en_attente" && (
                                                    <>
                                                        <button onClick={() => handleValidate(task._id, 'valide')} className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-200">
                                                            Valider
                                                        </button>
                                                        <button onClick={() => setShowValidateModal(task)} className="px-3 py-1.5 bg-rose-100 text-rose-700 text-xs font-medium rounded-lg hover:bg-rose-200">
                                                            Rejeter
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Task Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Nouvelle tâche</h3>
                            <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2">Employé</label>
                                <select required value={newTask.user_id} onChange={(e) => setNewTask({ ...newTask, user_id: e.target.value })} className="select select-bordered w-full rounded-xl">
                                    <option value="">Sélectionner un employé</option>
                                    {employees.map(emp => (
                                        <option key={emp._id} value={emp.userId || emp._id}>{emp.fullname} ({emp.employeeCode})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2">Titre</label>
                                <input type="text" required minLength={5} maxLength={100} value={newTask.titre} onChange={(e) => setNewTask({ ...newTask, titre: e.target.value })} placeholder="Titre de la tâche" className="input input-bordered w-full rounded-xl" />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2">Description</label>
                                <textarea required minLength={10} maxLength={1000} value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} placeholder="Description détaillée..." className="textarea textarea-bordered w-full rounded-xl" rows={3} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-2">Priorité</label>
                                    <select value={newTask.priorite} onChange={(e) => setNewTask({ ...newTask, priorite: e.target.value })} className="select select-bordered w-full rounded-xl">
                                        <option value="basse">Basse</option>
                                        <option value="moyenne">Moyenne</option>
                                        <option value="haute">Haute</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-2">Échéance</label>
                                    <input type="date" value={newTask.date_echeance} onChange={(e) => setNewTask({ ...newTask, date_echeance: e.target.value })} className="input input-bordered w-full rounded-xl" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl">Annuler</button>
                                <button type="submit" className="px-6 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 font-medium">Créer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {showValidateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Rejeter la tâche</h3>
                        <p className="text-gray-600 mb-4">Êtes-vous sûr de vouloir rejeter "{showValidateModal.titre}" ?</p>
                        <textarea id="reject-comment" placeholder="Commentaire (optionnel)..." className="textarea textarea-bordered w-full rounded-xl mb-4" />
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowValidateModal(null)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl">Annuler</button>
                            <button onClick={() => handleValidate(showValidateModal._id, 'rejete', (document.getElementById('reject-comment') as HTMLTextAreaElement)?.value)} className="px-6 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 font-medium">Rejeter</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Task Detail Modal */}
            {showDetailModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl animate-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm uppercase">
                                    {showDetailModal.employeeDetails?.fullname?.substring(0, 2) || showDetailModal.user_id?.nom?.charAt(0) || "?"}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{showDetailModal.titre}</h3>
                                    <p className="text-sm text-gray-500">{showDetailModal.employeeDetails?.fullname || `${showDetailModal.user_id?.firstname} ${showDetailModal.user_id?.nom}`}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowDetailModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            {/* Employee Info */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase">Informations Employé</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <span className="text-xs text-gray-400">Code Employé</span>
                                        <p className="font-medium text-gray-900">{showDetailModal.employeeDetails?.employeeCode || "N/A"}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400">Département</span>
                                        <p className="font-medium text-gray-900">{showDetailModal.employeeDetails?.department || "N/A"}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400">Poste</span>
                                        <p className="font-medium text-gray-900">{showDetailModal.employeeDetails?.post || "N/A"}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400">Email</span>
                                        <p className="font-medium text-gray-900">{showDetailModal.user_id?.email || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Task Details */}
                            <div className="bg-violet-50 rounded-xl p-4">
                                <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase">Détails de la Tâche</h4>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-xs text-gray-400">Description</span>
                                        <p className="font-medium text-gray-900 whitespace-pre-wrap">{showDetailModal.description}</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <span className="text-xs text-gray-400">Priorité</span>
                                            <p className="font-medium">{getPriorityBadge(showDetailModal.priorite)}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-400">Statut</span>
                                            <p className="font-medium">{getStatusBadge(showDetailModal.statut)}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-400">Échéance</span>
                                            <p className="font-medium text-gray-900">
                                                {showDetailModal.date_echeance ? new Date(showDetailModal.date_echeance).toLocaleDateString('fr-FR') : "--"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-semibold text-gray-700">Progression</span>
                                    <span className="font-bold text-gray-900">{showDetailModal.progression}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className={`h-3 rounded-full transition-all ${getProgressColor(showDetailModal.progression)}`} style={{ width: `${showDetailModal.progression}%` }} />
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="flex justify-between text-sm text-gray-500 border-t pt-4">
                                <span>Créée le: {new Date(showDetailModal.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                            <button onClick={() => setShowDetailModal(null)} className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-xl font-medium">Fermer</button>
                            {showDetailModal.statut === "en_attente" && (
                                <>
                                    <button onClick={() => { handleValidate(showDetailModal._id, 'valide'); setShowDetailModal(null); }} className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">
                                        Valider
                                    </button>
                                    <button onClick={() => { setShowValidateModal(showDetailModal); setShowDetailModal(null); }} className="px-6 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 font-medium">
                                        Rejeter
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTasks;
