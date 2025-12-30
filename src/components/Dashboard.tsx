import { ArrowDownRight, ArrowUpRight, Calendar, Clock, DollarSign, MoreHorizontal, TrendingUp, UserCheck, Users } from "lucide-react"
import MiniNav from "./MiniNav"

const Dashboard = () => {
    return (
        <div className="w-full font-medium min-h-screen">
            <header>
                <MiniNav />
            </header>

            <main className="space-y-6 mt-4">
                {/* Cartes de statistiques */}
                <section className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Carte 1 - Total Employés */}
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-violet-100 rounded-xl">
                                    <Users className="w-6 h-6 text-violet-600" />
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Total Employés</p>
                            <div className="flex items-end justify-between">
                                <h3 className="text-3xl font-bold text-gray-900">128</h3>
                                <div className="flex items-center gap-1 text-emerald-500 text-sm font-semibold">
                                    <ArrowUpRight className="w-4 h-4" />
                                    <span>+12%</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-linear-to-br from-emerald-50 to-emerald-100 px-5 py-3">
                            <p className="text-sm text-emerald-700">
                                <span className="font-semibold">+8 nouveaux</span> ce mois
                            </p>
                        </div>
                    </div>

                    {/* Carte 2 - Présents aujourd'hui */}
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-emerald-100 rounded-xl">
                                    <UserCheck className="w-6 h-6 text-emerald-600" />
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Présents aujourd'hui</p>
                            <div className="flex items-end justify-between">
                                <h3 className="text-3xl font-bold text-gray-900">112</h3>
                                <div className="flex items-center gap-1 text-emerald-500 text-sm font-semibold">
                                    <ArrowUpRight className="w-4 h-4" />
                                    <span>87.5%</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-linear-to-br from-blue-50 to-blue-100 px-5 py-3">
                            <p className="text-sm text-blue-700">
                                <span className="font-semibold">16 absents</span> aujourd'hui
                            </p>
                        </div>
                    </div>

                    {/* Carte 3 - En congé */}
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-amber-100 rounded-xl">
                                    <Clock className="w-6 h-6 text-amber-600" />
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-1">En congé</p>
                            <div className="flex items-end justify-between">
                                <h3 className="text-3xl font-bold text-gray-900">8</h3>
                                <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                                    <ArrowDownRight className="w-4 h-4" />
                                    <span>-3</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-linear-to-br from-amber-50 to-amber-100 px-5 py-3">
                            <p className="text-sm text-amber-700">
                                <span className="font-semibold">5 demandes</span> en attente
                            </p>
                        </div>
                    </div>

                    {/* Carte 4 - Masse salariale */}
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-rose-100 rounded-xl">
                                    <DollarSign className="w-6 h-6 text-rose-600" />
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Masse salariale</p>
                            <div className="flex items-end justify-between">
                                <h3 className="text-3xl font-bold text-gray-900">45.2K €</h3>
                                <div className="flex items-center gap-1 text-emerald-500 text-sm font-semibold">
                                    <ArrowUpRight className="w-4 h-4" />
                                    <span>+5%</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-linear-to-br from-rose-50 to-rose-100 px-5 py-3">
                            <p className="text-sm text-rose-700">
                                <span className="font-semibold">Échéance</span> dans 5 jours
                            </p>
                        </div>
                    </div>
                </section>

                {/* Deuxième ligne - Graphiques & Activité */}
                <section className="grid gap-5 grid-cols-1 lg:grid-cols-3">
                    {/* Placeholder graphique de performance */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Performance des employés</h3>
                                <p className="text-sm text-gray-500">Aperçu mensuel</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 text-sm font-medium text-violet-600 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors">
                                    Semaine
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                                    Mois
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                                    Année
                                </button>
                            </div>
                        </div>

                        {/* Placeholder graphique */}
                        <div className="h-64 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                            <div className="text-center">
                                <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-400 text-sm">Graphique de performance</p>
                                <p className="text-gray-300 text-xs">Ajoutez votre bibliothèque de graphiques ici</p>
                            </div>
                        </div>
                    </div>

                    {/* Activité récente */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Activité récente</h3>
                            <button className="text-sm text-violet-600 font-medium hover:underline">
                                Voir tout
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Élément d'activité 1 */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                                    <UserCheck className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">Jean Dupont a pointé</p>
                                    <p className="text-xs text-gray-500">08:32 - Aujourd'hui</p>
                                </div>
                            </div>

                            {/* Élément d'activité 2 */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-violet-100 rounded-lg shrink-0">
                                    <Users className="w-4 h-4 text-violet-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">Nouvel employé ajouté</p>
                                    <p className="text-xs text-gray-500">Hier à 14:45</p>
                                </div>
                            </div>

                            {/* Élément d'activité 3 */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-amber-100 rounded-lg shrink-0">
                                    <Calendar className="w-4 h-4 text-amber-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">Congé approuvé</p>
                                    <p className="text-xs text-gray-500">Hier à 11:20</p>
                                </div>
                            </div>

                            {/* Élément d'activité 4 */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-rose-100 rounded-lg shrink-0">
                                    <DollarSign className="w-4 h-4 text-rose-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">Paie traitée</p>
                                    <p className="text-xs text-gray-500">20 Déc 2025</p>
                                </div>
                            </div>

                            {/* Élément d'activité 5 */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                                    <TrendingUp className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">Évaluation terminée</p>
                                    <p className="text-xs text-gray-500">19 Déc 2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Troisième ligne - Actions rapides & À venir */}
                <section className="grid gap-5 grid-cols-1 lg:grid-cols-2">
                    {/* Actions rapides */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Actions rapides</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <button className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-linear-to-br from-violet-50 to-violet-100 hover:from-violet-100 hover:to-violet-200 transition-all duration-300">
                                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                    <Users className="w-6 h-6 text-violet-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Ajouter employé</span>
                            </button>

                            <button className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300">
                                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                    <UserCheck className="w-6 h-6 text-emerald-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Présences</span>
                            </button>

                            <button className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-linear-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 transition-all duration-300">
                                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                    <Calendar className="w-6 h-6 text-amber-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Congés</span>
                            </button>

                            <button className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-linear-to-br from-rose-50 to-rose-100 hover:from-rose-100 hover:to-rose-200 transition-all duration-300">
                                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                    <DollarSign className="w-6 h-6 text-rose-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Paie</span>
                            </button>
                        </div>
                    </div>

                    {/* Événements à venir */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Événements à venir</h3>
                            <button className="text-sm text-violet-600 font-medium hover:underline">
                                Voir calendrier
                            </button>
                        </div>

                        <div className="space-y-3">
                            {/* Événement 1 */}
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-linear-to-br from-violet-50 to-transparent hover:from-violet-100 transition-colors cursor-pointer">
                                <div className="text-center bg-white rounded-lg p-2 shadow-sm min-w-12.5">
                                    <p className="text-xs text-gray-500 uppercase font-medium">Déc</p>
                                    <p className="text-lg font-bold text-violet-600">25</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Jour de Noël</p>
                                    <p className="text-sm text-gray-500">Bureau fermé</p>
                                </div>
                            </div>

                            {/* Événement 2 */}
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-linear-to-br from-emerald-50 to-transparent hover:from-emerald-100 transition-colors cursor-pointer">
                                <div className="text-center bg-white rounded-lg p-2 shadow-sm min-w-12.5">
                                    <p className="text-xs text-gray-500 uppercase font-medium">Déc</p>
                                    <p className="text-lg font-bold text-emerald-600">28</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Réunion d'équipe</p>
                                    <p className="text-sm text-gray-500">10:00 - Salle de conférence A</p>
                                </div>
                            </div>

                            {/* Événement 3 */}
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-linear-to-br from-amber-50 to-transparent hover:from-amber-100 transition-colors cursor-pointer">
                                <div className="text-center bg-white rounded-lg p-2 shadow-sm min-w-12.5">
                                    <p className="text-xs text-gray-500 uppercase font-medium">Jan</p>
                                    <p className="text-lg font-bold text-amber-600">01</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Jour de l'An</p>
                                    <p className="text-sm text-gray-500">Bureau fermé</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Dashboard
