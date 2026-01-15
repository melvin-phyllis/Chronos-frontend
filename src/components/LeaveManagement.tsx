import { ToastError, ToastSuccess } from "@/toastify/react-toastify";
import axios from "axios";
import { Baby, Calendar, CheckCircle, ChevronDown, Clock, Coffee, Filter, Heart, MoreVertical, Palmtree, Plus, Search, XCircle, X, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";


interface LeaveRequest {
    _id: string;
    user_id: {
        _id: string;
        nom: string;
        firstname: string;
        email: string;
        employeeCode: string;
        post: string;
        department: string;
    };
    type_conge: string;
    date_debut: string;
    date_fin: string;
    nombre_jours: number;
    statut: 'en_attente' | 'valide' | 'rejete' | 'en_cours' | 'annule';
    date_demande: string;
}

interface LeaveStats {
    typeStats: {
        conge_paye: { jours: number; count: number };
        conge_maladie: { jours: number; count: number };
        conge_sans_solde: { jours: number; count: number };
        conge_exceptionnel: { jours: number; count: number };
    };
    onLeaveToday: number;
}

const LeaveManagement = () => {
    const [requests, setRequests] = useState<LeaveRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);
    const [stats, setStats] = useState<LeaveStats | null>(null);

    // Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [filterType, setFilterType] = useState<string>("all");
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    // New Request Modal
    const [showNewRequestModal, setShowNewRequestModal] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [newRequest, setNewRequest] = useState({
        user_id: "",
        type_conge: "conge_paye",
        date_debut: "",
        date_fin: "",
        justificatif_texte: ""
    });

    useEffect(() => {
        fetchLeaves();
        fetchStats();
        fetchEmployees();

        const socket = io(import.meta.env.VITE_BACKEND_URL);

        socket.on('leave_update', () => {
            fetchLeaves();
            fetchStats();
        });

        return () => {
            socket.disconnect();
        };
    }, [refresh]);

    const fetchLeaves = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leave/all`, { withCredentials: true });
            if (res.data.success) {
                setRequests(res.data.data);
            }
        } catch (error) {
            console.error("Erreur chargement congés", error);
            ToastError("Impossible de charger les demandes.");
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leave/stats`, { withCredentials: true });
            if (res.data.success) {
                setStats(res.data.data);
            }
        } catch (error) {
            console.error("Erreur chargement stats", error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-employees`, { withCredentials: true });
            if (res.data.success) {
                setEmployees(res.data.data);
            }
        } catch (error) {
            console.error("Erreur chargement employés", error);
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: 'valide' | 'rejete') => {
        try {
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/leave/status/${id}`,
                { statut: newStatus, commentaire_admin: newStatus === 'valide' ? "Validé par admin" : "Refusé par admin" },
                { withCredentials: true }
            );

            if (res.data.success) {
                ToastSuccess(`Demande ${newStatus === 'valide' ? 'validée' : 'refusée'} avec succès`);
                setRefresh(prev => prev + 1);
            }
        } catch (error) {
            console.error("Erreur mise à jour statut", error);
            ToastError("Erreur lors de la mise à jour.");
        }
    };

    const handleCreateRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Admin creates on behalf of employee - need custom endpoint or adjust
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/leave/create`, newRequest, { withCredentials: true });
            if (res.data.success) {
                ToastSuccess("Demande créée avec succès !");
                setShowNewRequestModal(false);
                setNewRequest({ user_id: "", type_conge: "conge_paye", date_debut: "", date_fin: "", justificatif_texte: "" });
                setRefresh(prev => prev + 1);
            }
        } catch (error: any) {
            ToastError(error.response?.data?.message || "Erreur création demande");
        }
    };

    // Stats calculation
    const pendingCount = requests.filter(r => r.statut === 'en_attente').length;
    const approvedCount = requests.filter(r => r.statut === 'valide').length;
    const rejectedCount = requests.filter(r => r.statut === 'rejete').length;

    // Filtered requests
    const filteredRequests = requests.filter(r => {
        const matchesSearch = searchTerm === "" ||
            `${r.user_id?.firstname} ${r.user_id?.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.user_id?.employeeCode?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || r.statut === filterStatus;
        const matchesType = filterType === "all" || r.type_conge === filterType;
        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {/* Pending Requests */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-amber-100 to-amber-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-amber-700">En attente</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <Clock className="w-4 h-4 text-amber-600" />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-4xl font-bold text-gray-900">{loading ? "..." : pendingCount}</span>
                        </div>
                        <div className="text-sm text-gray-500">En attente d'approbation</div>
                    </div>
                </div>

                {/* Approved */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-emerald-100 to-emerald-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-emerald-700">Approuvées</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-4xl font-bold text-gray-900">{loading ? "..." : approvedCount}</span>
                        </div>
                        <div className="text-sm text-gray-500">Total approuvées</div>
                    </div>
                </div>

                {/* Rejected */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-rose-100 to-rose-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-rose-700">Refusées</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <XCircle className="w-4 h-4 text-rose-600" />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-4xl font-bold text-gray-900">{loading ? "..." : rejectedCount}</span>
                        </div>
                        <div className="text-sm text-gray-500">Total refusées</div>
                    </div>
                </div>

                {/* On Leave Today */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-violet-100 to-violet-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-violet-700">En congé aujourd'hui</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <Coffee className="w-4 h-4 text-violet-600" />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-4xl font-bold text-gray-900">{stats?.onLeaveToday ?? "--"}</span>
                        </div>
                        <div className="text-sm text-gray-500">Employés</div>
                    </div>
                </div>
            </div>

            {/* Leave Types Summary - Dynamic */}
            <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
                <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Palmtree className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Congé payé</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-gray-900">{stats?.typeStats?.conge_paye?.jours || 0}</span>
                        <span className="text-xs text-gray-500">jours utilisés</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-rose-100 rounded-lg">
                            <Heart className="w-5 h-5 text-rose-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Congé maladie</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-gray-900">{stats?.typeStats?.conge_maladie?.jours || 0}</span>
                        <span className="text-xs text-gray-500">jours utilisés</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <Briefcase className="w-5 h-5 text-amber-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Sans solde</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-gray-900">{stats?.typeStats?.conge_sans_solde?.jours || 0}</span>
                        <span className="text-xs text-gray-500">jours utilisés</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Baby className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Exceptionnel</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-gray-900">{stats?.typeStats?.conge_exceptionnel?.jours || 0}</span>
                        <span className="text-xs text-gray-500">jours utilisés</span>
                    </div>
                </div>
            </div>

            {/* Leave Requests Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-violet-100 rounded-lg">
                                <Calendar className="w-5 h-5 text-violet-600" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Demandes de congés</h1>
                                <p className="text-sm text-gray-500">Gérer les demandes de congés des employés</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 items-center">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un employé..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent w-64 transition-all"
                                />
                            </div>

                            {/* Filter Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
                                >
                                    <Filter className="w-4 h-4 text-gray-500" />
                                    Filtrer
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>
                                {showFilterDropdown && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-50 p-4 space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Statut</label>
                                            <select
                                                value={filterStatus}
                                                onChange={(e) => setFilterStatus(e.target.value)}
                                                className="select select-bordered w-full select-sm rounded-lg"
                                            >
                                                <option value="all">Tous</option>
                                                <option value="en_attente">En attente</option>
                                                <option value="valide">Validé</option>
                                                <option value="rejete">Refusé</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Type</label>
                                            <select
                                                value={filterType}
                                                onChange={(e) => setFilterType(e.target.value)}
                                                className="select select-bordered w-full select-sm rounded-lg"
                                            >
                                                <option value="all">Tous</option>
                                                <option value="conge_paye">Congé payé</option>
                                                <option value="conge_maladie">Maladie</option>
                                                <option value="conge_sans_solde">Sans solde</option>
                                                <option value="conge_exceptionnel">Exceptionnel</option>
                                            </select>
                                        </div>
                                        <button
                                            onClick={() => { setFilterStatus("all"); setFilterType("all"); }}
                                            className="text-xs text-violet-600 hover:underline"
                                        >
                                            Réinitialiser les filtres
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* New Request */}
                            <button
                                onClick={() => setShowNewRequestModal(true)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors shadow-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Nouvelle demande
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employé</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type de congé</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Du</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Au</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Jours</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={7} className="text-center py-8 text-gray-500">Chargement...</td></tr>
                            ) : filteredRequests.length === 0 ? (
                                <tr><td colSpan={7} className="text-center py-8 text-gray-500">Aucune demande trouvée.</td></tr>
                            ) : (
                                filteredRequests.map((leave) => (
                                    <tr key={leave._id} className="hover:bg-violet-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm uppercase">
                                                    {leave.user_id?.nom?.charAt(0) || "?"}{leave.user_id?.firstname?.charAt(0) || "?"}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">{leave.user_id?.firstname} {leave.user_id?.nom}</div>
                                                    <div className="text-xs text-gray-500 font-mono">{leave.user_id?.employeeCode}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-700`}>
                                                {leave.type_conge.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{new Date(leave.date_debut).toLocaleDateString('fr-FR')}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{new Date(leave.date_fin).toLocaleDateString('fr-FR')}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{leave.nombre_jours}</td>
                                        <td className="px-6 py-4">
                                            {leave.statut === "valide" && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-lg">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Approuvé
                                                </span>
                                            )}
                                            {leave.statut === "en_attente" && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-lg">
                                                    <Clock className="w-3 h-3" />
                                                    En attente
                                                </span>
                                            )}
                                            {leave.statut === "rejete" && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-rose-100 text-rose-700 rounded-lg">
                                                    <XCircle className="w-3 h-3" />
                                                    Refusé
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {leave.statut === "en_attente" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdateStatus(leave._id, 'valide')}
                                                            className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-200 transition-colors">
                                                            Approuver
                                                        </button>
                                                        <button
                                                            onClick={() => handleUpdateStatus(leave._id, 'rejete')}
                                                            className="px-3 py-1.5 bg-rose-100 text-rose-700 text-xs font-medium rounded-lg hover:bg-rose-200 transition-colors">
                                                            Refuser
                                                        </button>
                                                    </>
                                                )}
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <MoreVertical className="w-4 h-4 text-gray-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="text-sm text-gray-600">
                            Affichage <span className="font-semibold">{filteredRequests.length}</span> sur <span className="font-semibold">{requests.length}</span> demandes
                        </div>
                    </div>
                </div>
            </div>

            {/* New Request Modal */}
            {showNewRequestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Nouvelle demande de congé</h3>
                            <button onClick={() => setShowNewRequestModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateRequest} className="space-y-4">
                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2">Employé</label>
                                <select
                                    required
                                    value={newRequest.user_id}
                                    onChange={(e) => setNewRequest({ ...newRequest, user_id: e.target.value })}
                                    className="select select-bordered w-full rounded-xl"
                                >
                                    <option value="">Sélectionner un employé</option>
                                    {employees.map(emp => (
                                        <option key={emp._id} value={emp._id}>{emp.fullname} ({emp.employeeCode})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2">Type de congé</label>
                                <select
                                    required
                                    value={newRequest.type_conge}
                                    onChange={(e) => setNewRequest({ ...newRequest, type_conge: e.target.value })}
                                    className="select select-bordered w-full rounded-xl"
                                >
                                    <option value="conge_paye">Congé payé</option>
                                    <option value="conge_maladie">Maladie</option>
                                    <option value="conge_sans_solde">Sans solde</option>
                                    <option value="conge_exceptionnel">Exceptionnel</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-2">Date début</label>
                                    <input
                                        type="date"
                                        required
                                        value={newRequest.date_debut}
                                        onChange={(e) => setNewRequest({ ...newRequest, date_debut: e.target.value })}
                                        className="input input-bordered w-full rounded-xl"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-2">Date fin</label>
                                    <input
                                        type="date"
                                        required
                                        value={newRequest.date_fin}
                                        onChange={(e) => setNewRequest({ ...newRequest, date_fin: e.target.value })}
                                        className="input input-bordered w-full rounded-xl"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2">Motif (optionnel)</label>
                                <textarea
                                    value={newRequest.justificatif_texte}
                                    onChange={(e) => setNewRequest({ ...newRequest, justificatif_texte: e.target.value })}
                                    placeholder="Raison de la demande..."
                                    className="textarea textarea-bordered w-full rounded-xl"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowNewRequestModal(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                                    Annuler
                                </button>
                                <button type="submit" className="px-6 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors font-medium">
                                    Créer la demande
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LeaveManagement
