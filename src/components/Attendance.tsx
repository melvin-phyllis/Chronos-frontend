import { io } from "socket.io-client";
import axios from "axios";
import { Clock, Filter, UserCheck, UserX } from "lucide-react";
import { useEffect, useState } from "react";
import type { PresenceType } from "../types";

const Attendance = () => {
    const [presences, setPresences] = useState<PresenceType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPresences();

        const socket = io(import.meta.env.VITE_BACKEND_URL);

        socket.on('presence_update', () => {
            fetchPresences();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const fetchPresences = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/presence/all-today`, {
                withCredentials: true
            });
            if (res.data.success) {
                setPresences(res.data.data);
            }
        } catch (error) {
            console.error("Erreur chargement présences", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculs statistiques
    const presentCount = presences.filter(p => p.statut === 'present' || p.statut === 'retard').length;
    const retardCount = presences.filter(p => p.statut === 'retard').length;
    // const absentCount = 0; // TODO: Calcul des absents à implémenter plus tard


    // Pour l'affichage, on va itérer sur `presences`

    return (
        <div className="space-y-6">
            {/* Cartes de statistiques (Dynamiques basées sur les données récupérées) */}
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {/* Carte Présent */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-emerald-100 to-emerald-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-emerald-700">Présents</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <UserCheck className="w-4 h-4 text-emerald-600" />
                        </div>
                    </div>
                    <div className="p-5 flex flex-col items-center">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-bold text-gray-900">{loading ? "..." : presentCount}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <span>Employés pointés</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="font-bold text-gray-900">{presentCount - retardCount}</span>
                                <span className="text-gray-500">À l'heure</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                <span className="font-bold text-gray-900">{retardCount}</span>
                                <span className="text-gray-500">En retard</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carte Absent (Simplifiée car on ne connait pas qui est absent sans comparer avec toute la liste des employés) */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-rose-100 to-rose-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-rose-700">Absents</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <UserX className="w-4 h-4 text-rose-600" />
                        </div>
                    </div>
                    <div className="p-5 flex flex-col items-center">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-bold text-gray-900">--</span>
                        </div>
                        <div className="text-center text-sm text-gray-500">
                            Donnée non disponible <br /> (Calcul automatique à venir)
                        </div>
                    </div>
                </div>

                {/* Carte Retards */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-violet-100 to-violet-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-violet-700">Retards</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <Clock className="w-4 h-4 text-violet-600" />
                        </div>
                    </div>
                    <div className="p-5 flex flex-col items-center">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-bold text-gray-900">{loading ? "..." : retardCount}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <span>Employés en retard</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tableau des présences */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-violet-100 rounded-lg">
                                <UserCheck className="w-5 h-5 text-violet-600" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">Présences des employés</h1>
                        </div>
                        <button onClick={fetchPresences} className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Actualiser">
                            <Filter className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employé</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Poste</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mode de travail</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Entrée/Sortie</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Durée</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">Chargement...</td>
                                </tr>
                            ) : presences.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">Aucune présence enregistrée aujourd'hui.</td>
                                </tr>
                            ) : (
                                presences.map((presence) => (
                                    <tr key={presence._id} className="hover:bg-violet-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm overflow-hidden">
                                                    {presence.employeeDetails?.documents?.proofOfIdentity ? (
                                                        <img src={presence.employeeDetails.documents.proofOfIdentity} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        presence.employeeDetails?.fullname?.substring(0, 2).toUpperCase() || "EI"
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">{presence.employeeDetails?.fullname || "Employé Inconnu"}</div>
                                                    <div className="text-xs text-gray-500 font-mono">{presence.employeeDetails?.employeeCode || "N/A"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{presence.employeeDetails?.department || "N/A"}</div>
                                            <div className="text-xs text-gray-500">{presence.employeeDetails?.post || "Poste inconnu"}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {new Date(presence.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-lg">
                                                {presence.employeeDetails?.workingMethod || "Sur site"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-emerald-600 font-medium">
                                                    {presence.check_in ? new Date(presence.check_in).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                                </span>
                                                <span className="text-gray-400">—</span>
                                                <span className="text-rose-600 font-medium">
                                                    {presence.check_out ? new Date(presence.check_out).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-gray-900">{presence.duree_travail ? `${presence.duree_travail}h` : "--"}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${presence.statut === 'retard' ? 'bg-amber-100 text-amber-700' :
                                                presence.statut === 'absent' ? 'bg-rose-100 text-rose-700' :
                                                    'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                {presence.statut === 'retard' ? 'En retard' : presence.statut === 'absent' ? 'Absent' : "À l'heure"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Attendance
