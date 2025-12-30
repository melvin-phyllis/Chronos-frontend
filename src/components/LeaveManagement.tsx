import { Baby, Calendar, CalendarDays, CheckCircle, ChevronDown, Clock, Coffee, Filter, Heart, MoreVertical, Palmtree, Plus, Search, XCircle } from "lucide-react"

const LeaveManagement = () => {
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
                            <span className="text-4xl font-bold text-gray-900">12</span>
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
                            <span className="text-4xl font-bold text-gray-900">45</span>
                        </div>
                        <div className="text-sm text-gray-500">Ce mois-ci</div>
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
                            <span className="text-4xl font-bold text-gray-900">3</span>
                        </div>
                        <div className="text-sm text-gray-500">This month</div>
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
                            <span className="text-4xl font-bold text-gray-900">8</span>
                        </div>
                        <div className="text-sm text-gray-500">Employés</div>
                    </div>
                </div>
            </div>

            {/* Leave Types Summary */}
            <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
                <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Palmtree className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Congé annuel</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-gray-900">156</span>
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
                        <span className="text-2xl font-bold text-gray-900">42</span>
                        <span className="text-xs text-gray-500">days used</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-pink-100 rounded-lg">
                            <Baby className="w-5 h-5 text-pink-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Congé parental</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-gray-900">28</span>
                        <span className="text-xs text-gray-500">days used</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <CalendarDays className="w-5 h-5 text-amber-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Autre congé</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-gray-900">18</span>
                        <span className="text-xs text-gray-500">days used</span>
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
                                    className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent w-64 transition-all"
                                />
                            </div>

                            {/* Filter */}
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors">
                                <Filter className="w-4 h-4 text-gray-500" />
                                Filtrer
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>

                            {/* New Request */}
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors shadow-sm">
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
                            {[
                                { name: "Jean Dupont", type: "Annuel", from: "24 Déc", to: "31 Déc", days: 5, status: "En attente" },
                                { name: "Sarah Martin", type: "Maladie", from: "20 Déc", to: "22 Déc", days: 3, status: "Approuvé" },
                                { name: "Michel Kouassi", type: "Annuel", from: "26 Déc", to: "02 Jan", days: 5, status: "En attente" },
                                { name: "Emma Bernard", type: "Parental", from: "05 Jan", to: "05 Mar", days: 60, status: "Approuvé" },
                                { name: "David Koné", type: "Maladie", from: "18 Déc", to: "19 Déc", days: 2, status: "Refusé" },
                                { name: "Lisa Chen", type: "Annuel", from: "27 Déc", to: "30 Déc", days: 4, status: "En attente" },
                            ].map((leave, index) => (
                                <tr key={index} className="hover:bg-violet-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                                                {leave.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900">{leave.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-lg ${leave.type === "Annuel" ? "bg-blue-100 text-blue-700" :
                                            leave.type === "Maladie" ? "bg-rose-100 text-rose-700" :
                                                "bg-pink-100 text-pink-700"
                                            }`}>
                                            {leave.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{leave.from}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{leave.to}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{leave.days}</td>
                                    <td className="px-6 py-4">
                                        {leave.status === "Approuvé" && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-lg">
                                                <CheckCircle className="w-3 h-3" />
                                                Approuvé
                                            </span>
                                        )}
                                        {leave.status === "En attente" && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-lg">
                                                <Clock className="w-3 h-3" />
                                                En attente
                                            </span>
                                        )}
                                        {leave.status === "Refusé" && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-rose-100 text-rose-700 rounded-lg">
                                                <XCircle className="w-3 h-3" />
                                                Refusé
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {leave.status === "En attente" && (
                                                <>
                                                    <button className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-200 transition-colors">
                                                        Approuver
                                                    </button>
                                                    <button className="px-3 py-1.5 bg-rose-100 text-rose-700 text-xs font-medium rounded-lg hover:bg-rose-200 transition-colors">
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
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="text-sm text-gray-600">
                            Affichage <span className="font-semibold">1-6</span> sur <span className="font-semibold">60</span> demandes
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
                                10
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

export default LeaveManagement
