import { AlertCircle, Calendar, CheckCircle, ChevronDown, Clock, CreditCard, DollarSign, Download, Filter, MoreVertical, Search, TrendingUp, Users } from "lucide-react"

const Payroll = () => {
    return (
        <div className="space-y-6">
            {/* Cartes de statistiques */}
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total Paie */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-violet-100 to-violet-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-violet-700">Total Paie</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <DollarSign className="w-4 h-4 text-violet-600" />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-bold text-gray-900">128 450 €</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-emerald-500 font-medium flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                +5.2%
                            </span>
                            <span className="text-gray-500">vs mois dernier</span>
                        </div>
                    </div>
                </div>

                {/* Employés payés */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-emerald-100 to-emerald-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-emerald-700">Employés payés</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <Users className="w-4 h-4 text-emerald-600" />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-bold text-gray-900">124</span>
                            <span className="text-gray-500 text-sm">/128</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-amber-500 font-medium">4 en attente</span>
                        </div>
                    </div>
                </div>

                {/* Salaire net */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-blue-100 to-blue-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-blue-700">Salaire net</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-bold text-gray-900">98 200 €</span>
                        </div>
                        <div className="text-sm text-gray-500">Après déductions</div>
                    </div>
                </div>

                {/* Prochaine paie */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-linear-to-br from-amber-100 to-amber-50 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-amber-700">Prochaine paie</span>
                        <div className="p-2 bg-white/80 rounded-lg">
                            <Calendar className="w-4 h-4 text-amber-600" />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-bold text-gray-900">31 Déc</span>
                        </div>
                        <div className="text-sm text-gray-500">Dans 8 jours</div>
                    </div>
                </div>
            </div>

            {/* Tableau de la paie */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* En-tête */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-violet-100 rounded-lg">
                                <DollarSign className="w-5 h-5 text-violet-600" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Gestion de la paie</h1>
                                <p className="text-sm text-gray-500">Décembre 2025</p>
                            </div>
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

                            {/* Exporter */}
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors shadow-sm">
                                <Download className="w-4 h-4" />
                                Exporter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tableau */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employé</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Département</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Salaire brut</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Indemnités</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Déductions</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Salaire net</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { name: "Marie Dupont", dept: "Marketing", base: 3200, allow: 280, deduct: 320, status: "Payé" },
                                { name: "Jean Martin", dept: "Ingénierie", base: 4500, allow: 350, deduct: 450, status: "Payé" },
                                { name: "Sophie Bernard", dept: "Design", base: 3800, allow: 300, deduct: 380, status: "En attente" },
                                { name: "Michel Chen", dept: "RH", base: 3000, allow: 250, deduct: 300, status: "Payé" },
                                { name: "Sarah Kouassi", dept: "Finance", base: 4200, allow: 320, deduct: 420, status: "En cours" },
                                { name: "David Koné", dept: "Commercial", base: 3500, allow: 280, deduct: 350, status: "Payé" },
                            ].map((emp, index) => (
                                <tr key={index} className="hover:bg-violet-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                                                {emp.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">{emp.name}</div>
                                                <div className="text-xs text-gray-500 font-mono">EMP-{String(index + 234).padStart(4, '0')}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{emp.dept}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{emp.base.toLocaleString()} €</td>
                                    <td className="px-6 py-4 text-sm text-emerald-600 font-medium">+{emp.allow} €</td>
                                    <td className="px-6 py-4 text-sm text-rose-600 font-medium">-{emp.deduct} €</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{(emp.base + emp.allow - emp.deduct).toLocaleString()} €</td>
                                    <td className="px-6 py-4">
                                        {emp.status === "Payé" && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-lg">
                                                <CheckCircle className="w-3 h-3" />
                                                Payé
                                            </span>
                                        )}
                                        {emp.status === "En attente" && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-lg">
                                                <Clock className="w-3 h-3" />
                                                En attente
                                            </span>
                                        )}
                                        {emp.status === "En cours" && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-lg">
                                                <AlertCircle className="w-3 h-3" />
                                                En cours
                                            </span>
                                        )}
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
                        <div className="text-sm text-gray-600">
                            Affichage <span className="font-semibold">1-6</span> sur <span className="font-semibold">128</span> employés
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
                                22
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

export default Payroll
