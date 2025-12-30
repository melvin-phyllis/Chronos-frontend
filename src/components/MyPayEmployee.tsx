import { CreditCard, Download, Eye, TrendingUp, Wallet } from "lucide-react"
import { useState } from "react"
import EditBankingInformations from "./EditBankingInformations"

const MyPayEmployee = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Ma Paie</h1>
                    <p className="text-sm text-gray-500 mt-1">Consultez vos bulletins de salaire et informations bancaires</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Dernière mise à jour : 25 Déc 2024</span>
                </div>
            </div>

            {/* Salary Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Last Net Salary */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-violet-200 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Wallet className="w-16 h-16 text-violet-600" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Dernier Salaire Net</h3>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900">2 850,00 €</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Versé le 25 Déc 2024</p>
                </div>

                {/* Next Payment */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-blue-200 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CreditCard className="w-16 h-16 text-blue-600" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Prochain Virement</h3>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900">25 Jan</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Estimation date de valeur</p>
                </div>

                {/* YTD Earnings */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-emerald-200 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp className="w-16 h-16 text-emerald-600" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Cumul Annuel Net</h3>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900">34 200 €</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Année 2024</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Payslip History */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Bulletin de Paie</h2>
                        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block p-2">
                            <option>2024</option>
                            <option>2023</option>
                        </select>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Mois</th>
                                    <th scope="col" className="px-6 py-3">Date de versement</th>
                                    <th scope="col" className="px-6 py-3">Salaire Net</th>
                                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">Décembre 2024</td>
                                    <td className="px-6 py-4">25/12/2024</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">2 850,00 €</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors" title="Voir">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors" title="Télécharger">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">Novembre 2024</td>
                                    <td className="px-6 py-4">25/11/2024</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">2 850,00 €</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors" title="Voir">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors" title="Télécharger">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">Octobre 2024</td>
                                    <td className="px-6 py-4">25/10/2024</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">2 850,00 €</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors" title="Voir">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors" title="Télécharger">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Banking Informations */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <CreditCard className="w-5 h-5 text-gray-400" />
                            <h2 className="text-lg font-bold text-gray-900">Informations Bancaires</h2>
                        </div>

                        <div className="p-4 bg-linear-to-br from-gray-900 to-gray-800 rounded-xl text-white shadow-lg mb-6">
                            <div className="flex justify-between items-start mb-8">
                                <span className="font-bold tracking-wider">BANQUE</span>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-8 opacity-80" alt="Mastercard" />
                            </div>
                            <div className="mb-4">
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">IBAN</p>
                                <p className="font-mono text-lg tracking-wider">FR76 **** **** **** 4242</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Titulaire</p>
                                    <p className="font-medium">Sarah Martin</p>
                                </div>
                                <span className="text-xs bg-white/20 px-2 py-1 rounded">Principal</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-500">Banque</span>
                                <span className="text-sm font-medium text-gray-900">Crédit Mutuel</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-500">Code BIC/SWIFT</span>
                                <span className="text-sm font-medium text-gray-900">CMCIFR2A</span>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="w-full mt-2 py-2 text-sm font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors"
                            >
                                Modifier mes coordonnées
                            </button>
                        </div>
                    </div>
                </div>

                <EditBankingInformations
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                />
            </div>
        </div>
    )
}

export default MyPayEmployee