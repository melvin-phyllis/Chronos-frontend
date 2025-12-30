import { Bell, Calendar, Clock, PieChart, Wallet } from "lucide-react";
import { useEffect } from "react";
import getinfouser from "../controllers/getinfouser";
import EmployeeStore from "../Store/EmployeeStore";

const DashbordEmployee = ({ setCurrentLink }: { setCurrentLink: React.Dispatch<React.SetStateAction<string>> }) => {
    const { Employee, setEmployee } = EmployeeStore()


    useEffect(() => {
        getinfouser(setEmployee)
    }, [])


    return (
        <>
            <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
                {/* Header / Welcome Section */}
                <div className="relative bg-violet-600 rounded-2xl p-6 sm:p-10 overflow-hidden shadow-lg">
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <img
                                src="/122871.jpg"
                                alt="Profile"
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/20 shadow-md"
                            />
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">{Employee?.fullname}👋</h1>
                                <p className="text-violet-100 mt-1">{Employee?.post} </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className="text-violet-100 text-sm">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Leave Balance */}
                    <div
                        onClick={() => setCurrentLink('/my-leave')}
                        className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-violet-200 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-violet-50 rounded-xl group-hover:bg-violet-100 transition-colors">
                                <PieChart className="w-6 h-6 text-violet-600" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-lg">Accumulé</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">18.5 <span className="text-sm font-medium text-gray-400">Jours</span></h3>
                        <p className="text-sm text-gray-500 mt-1">Congés Payés Restants</p>
                    </div>

                    {/* Payslip */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-violet-200 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                                <Wallet className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">Dans 4 jours</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Décembre 2024</h3>
                        <p className="text-sm text-gray-500 mt-1">Prochaine Paie</p>
                    </div>

                    {/* Hours Logged */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-violet-200 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors">
                                <Clock className="w-6 h-6 text-orange-600" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-lg">Cette semaine</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">38h <span className="text-sm font-medium text-gray-400">/ 40h</span></h3>
                        <p className="text-sm text-gray-500 mt-1">Heures Travaillées</p>
                    </div>
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Schedule & Tasks */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Schedule */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    Mon Planning
                                </h2>
                                <button className="text-violet-600 text-sm font-medium hover:underline">Voir tout</button>
                            </div>
                            <div className="space-y-4">
                                {/* Today */}
                                <div className="flex gap-4 p-4 rounded-xl bg-violet-50 border border-violet-100">
                                    <div className="flex flex-col items-center justify-center min-w-[60px] bg-white rounded-lg p-2 shadow-sm">
                                        <span className="text-xs font-bold text-violet-600 uppercase">Auj</span>
                                        <span className="text-xl font-bold text-gray-900">26</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Réunion d'équipe Sprint</h4>
                                        <p className="text-sm text-gray-600">10:00 - 11:30 • Salle de réunion A</p>
                                        <div className="flex gap-2 mt-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-200 border border-white"></div>
                                            <div className="w-6 h-6 rounded-full bg-gray-300 border border-white -ml-3"></div>
                                            <div className="w-6 h-6 rounded-full bg-gray-400 border border-white -ml-3 flex items-center justify-center text-[10px] text-white font-medium">+3</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tomorrow */}
                                <div className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                    <div className="flex flex-col items-center justify-center min-w-[60px] bg-white rounded-lg p-2 border border-gray-200">
                                        <span className="text-xs font-bold text-gray-400 uppercase">Dem</span>
                                        <span className="text-xl font-bold text-gray-900">27</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Revue de Code avec Thomas</h4>
                                        <p className="text-sm text-gray-600">14:00 - 15:00 • En ligne</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Notifications & Documents */}
                    <div className="space-y-6">

                        {/* Notifications */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Bell className="w-5 h-5 text-gray-400" />
                                <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-3 items-start p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0"></div>
                                    <div>
                                        <p className="text-sm text-gray-800 font-medium">Demande de congés validée</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Votre demande pour le 24/12 a été acceptée par RH.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
                                    <div>
                                        <p className="text-sm text-gray-800 font-medium">Nouveau document disponible</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Votre fiche de paie de Novembre est disponible.</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </>
    );
};

export default DashbordEmployee;
