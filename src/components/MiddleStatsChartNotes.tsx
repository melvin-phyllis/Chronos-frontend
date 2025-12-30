import { Award, Clock, Coffee, TrendingUp } from "lucide-react"

const MiddleStatsChartNotes = () => {
    return (
        <>
            <div className="flex-1 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {/* All Leaves */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 text-center hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Coffee className="w-4 h-4 text-amber-500" />
                            <h3 className="text-sm font-medium text-gray-600">All Leaves</h3>
                        </div>
                        <div className="relative w-20 h-20 mx-auto">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                                <circle cx="40" cy="40" r="35" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="220" strokeDashoffset="66" strokeLinecap="round" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">14/20</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Days remaining</p>
                    </div>

                    {/* Attendance */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 text-center hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Clock className="w-4 h-4 text-emerald-500" />
                            <h3 className="text-sm font-medium text-gray-600">Attendance</h3>
                        </div>
                        <div className="relative w-20 h-20 mx-auto">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                                <circle cx="40" cy="40" r="35" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="220" strokeDashoffset="22" strokeLinecap="round" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">96%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">This month</p>
                    </div>

                    {/* Performance */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 text-center hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-violet-500" />
                            <h3 className="text-sm font-medium text-gray-600">Performance</h3>
                        </div>
                        <div className="relative w-20 h-20 mx-auto">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                                <circle cx="40" cy="40" r="35" fill="none" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="220" strokeDashoffset="33" strokeLinecap="round" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">85%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Score rating</p>
                    </div>

                    {/* Projects */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 text-center hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Award className="w-4 h-4 text-blue-500" />
                            <h3 className="text-sm font-medium text-gray-600">Projects</h3>
                        </div>
                        <div className="relative w-20 h-20 mx-auto">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                                <circle cx="40" cy="40" r="35" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="220" strokeDashoffset="88" strokeLinecap="round" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">12</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Completed</p>
                    </div>
                </div>

                {/* Activity Chart Placeholder */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Activity Overview</h3>
                        <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                            <option>This Month</option>
                            <option>Last Month</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className="h-48 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                        <div className="text-center">
                            <TrendingUp className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-400 text-sm">Activity Chart</p>
                            <p className="text-gray-300 text-xs">Add your chart library here</p>
                        </div>
                    </div>
                </div>

                {/* Internal Notes */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Internal Notes</h2>
                        <button className="text-sm text-violet-600 font-medium hover:underline">+ Add Note</button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-linear-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-gray-800">Promotion Review</span>
                                <span className="text-xs text-gray-500">10 Jan 2026</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                Excellent performance in Q4. Recommended for senior position in next review cycle.
                            </p>
                        </div>
                        <div className="p-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-gray-800">Training Complete</span>
                                <span className="text-xs text-gray-500">05 Dec 2025</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                Successfully completed leadership training program with distinction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiddleStatsChartNotes
