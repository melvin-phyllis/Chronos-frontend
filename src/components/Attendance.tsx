import { ChevronDown, Clock, Coffee, Filter, MoreVertical, Search, UserCheck, UserX } from "lucide-react"

const Attendance = () => {
    return (
        <div className="space-y-6">
            {/* Cartes de statistiques */}
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
                            <span className="text-5xl font-bold text-gray-900">93</span>
                            <span className="text-emerald-500 text-lg font-semibold">+4</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <span>Employés</span>
                            <span className="text-gray-300">•</span>
                            <span>vs hier</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="font-bold text-gray-900">82</span>
                                <span className="text-gray-500">À l'heure</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                <span className="font-bold text-gray-900">11</span>
                                <span className="text-gray-500">En retard</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carte Absent */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-rose-100 to-rose-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-rose-700">Absents</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <UserX className="w-4 h-4 text-rose-600" />
                        </div>
                    </div>
                    <div className="p-5 flex flex-col items-center">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-bold text-gray-900">7</span>
                            <span className="text-rose-500 text-lg font-semibold">-2</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <span>Employés</span>
                            <span className="text-gray-300">•</span>
                            <span>vs hier</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                                <span className="font-bold text-gray-900">3</span>
                                <span className="text-gray-500">Non justifié</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <span className="font-bold text-gray-900">4</span>
                                <span className="text-gray-500">Maladie</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carte En congé */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-amber-100 to-amber-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-amber-700">En congé</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <Coffee className="w-4 h-4 text-amber-600" />
                        </div>
                    </div>
                    <div className="p-5 flex flex-col items-center">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-bold text-gray-900">12</span>
                            <span className="text-amber-500 text-lg font-semibold">+1</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <span>Employés</span>
                            <span className="text-gray-300">•</span>
                            <span>vs hier</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                <span className="font-bold text-gray-900">8</span>
                                <span className="text-gray-500">Annuel</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="font-bold text-gray-900">4</span>
                                <span className="text-gray-500">Autre</span>
                            </div>
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
                            <span className="text-5xl font-bold text-gray-900">11</span>
                            <span className="text-violet-500 text-lg font-semibold">-3</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <span>Employés</span>
                            <span className="text-gray-300">•</span>
                            <span>vs hier</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                                <span className="font-bold text-gray-900">5</span>
                                <span className="text-gray-500">&lt;15min</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                                <span className="font-bold text-gray-900">6</span>
                                <span className="text-gray-500">&gt;15min</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tableau des présences */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* En-tête */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-violet-100 rounded-lg">
                                <UserCheck className="w-5 h-5 text-violet-600" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">Présences des employés</h1>
                        </div>

                        <div className="flex flex-wrap gap-3 items-center">
                            {/* Recherche */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un employé..."
                                    className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent w-64 transition-all"
                                />
                            </div>

                            {/* Filtre */}
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors">
                                <Filter className="w-4 h-4 text-gray-500" />
                                Filtrer
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>

                            {/* Tri */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Trier par :</span>
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors">
                                    Nom
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tableau */}
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
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Heures sup.</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
                                <tr key={index} className="hover:bg-violet-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                                                OM
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">Olivia Mason</div>
                                                <div className="text-xs text-gray-500 font-mono">EMP-0234</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">Marketing</div>
                                        <div className="text-xs text-gray-500">Responsable Marketing</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">19 Juin 2035</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-lg">
                                            Hybride
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-emerald-600 font-medium">08:55</span>
                                            <span className="text-gray-400">—</span>
                                            <span className="text-rose-600 font-medium">17:05</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-gray-900">8h 10m</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-emerald-600">+10m</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-lg">
                                            À l'heure
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Afficher</span>
                            <select className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                            <span>sur <span className="font-semibold">102</span> résultats</span>
                        </div>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 cursor-not-allowed" disabled>
                                ‹
                            </button>
                            <button className="w-10 h-10 bg-violet-600 text-white rounded-xl flex items-center justify-center font-semibold shadow-sm">
                                1
                            </button>
                            <button className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-700">
                                2
                            </button>
                            <button className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-700">
                                3
                            </button>
                            <button className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                                ...
                            </button>
                            <button className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-700">
                                11
                            </button>
                            <button className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-700">
                                ›
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Attendance
