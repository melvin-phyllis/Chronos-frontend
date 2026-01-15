import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";
import axios from "axios";

interface Task {
    _id: string;
    titre: string;
    description: string;
    progression: number;
    statut: 'en_attente' | 'en_cours' | 'valide' | 'rejete';
    priorite: 'basse' | 'moyenne' | 'haute';
    date_echeance?: string;
    employeeDetails?: { fullname: string };
    user_id?: { nom: string; firstname: string };
}

const TaskCalendar = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/all`, { withCredentials: true });
            if (res.data.success) setTasks(res.data.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        } finally {
            setLoading(false);
        }
    };

    // Calendar helpers
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

    const navigateMonth = (delta: number) => {
        setCurrentDate(new Date(year, month + delta, 1));
    };

    // Get tasks for a specific date
    const getTasksForDate = (day: number) => {
        const dateStr = new Date(year, month, day).toDateString();
        return tasks.filter(t => {
            if (!t.date_echeance) return false;
            return new Date(t.date_echeance).toDateString() === dateStr;
        });
    };

    // Status color for calendar dot
    const getStatusColor = (statut: string) => {
        const colors: Record<string, string> = {
            en_cours: "bg-blue-500",
            en_attente: "bg-amber-500",
            valide: "bg-emerald-500",
            rejete: "bg-rose-500"
        };
        return colors[statut] || "bg-gray-400";
    };

    // Today check
    const isToday = (day: number) => {
        const today = new Date();
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    // Selected date tasks
    const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate.getDate()) : [];

    // Generate calendar grid
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg">
                    <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Calendrier des Tâches</h1>
                    <p className="text-gray-500">Vue mensuelle des échéances</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Calendar Header */}
                <div className="p-6 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                    <div className="flex items-center justify-between">
                        <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h2 className="text-2xl font-bold">{monthNames[month]} {year}</h2>
                        <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
                    {dayNames.map(day => (
                        <div key={day} className="py-3 text-center text-sm font-semibold text-gray-500">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Chargement...</div>
                ) : (
                    <div className="grid grid-cols-7">
                        {calendarDays.map((day, index) => {
                            if (day === null) {
                                return <div key={`empty-${index}`} className="h-24 bg-gray-50/50" />;
                            }

                            const dayTasks = getTasksForDate(day);
                            const hasTasksDue = dayTasks.length > 0;

                            return (
                                <div
                                    key={day}
                                    onClick={() => hasTasksDue && setSelectedDate(new Date(year, month, day))}
                                    className={`
                                        h-24 p-2 border-b border-r border-gray-100 relative
                                        ${hasTasksDue ? 'cursor-pointer hover:bg-violet-50' : ''}
                                        ${isToday(day) ? 'bg-violet-50' : ''}
                                    `}
                                >
                                    <div className={`
                                        w-7 h-7 flex items-center justify-center text-sm font-medium rounded-full
                                        ${isToday(day) ? 'bg-violet-600 text-white' : 'text-gray-700'}
                                    `}>
                                        {day}
                                    </div>

                                    {/* Task dots */}
                                    {hasTasksDue && (
                                        <div className="mt-1 space-y-1">
                                            {dayTasks.slice(0, 3).map((task, i) => (
                                                <div key={i} className="flex items-center gap-1">
                                                    <div className={`w-2 h-2 rounded-full ${getStatusColor(task.statut)}`} />
                                                    <span className="text-xs text-gray-600 truncate">{task.titre}</span>
                                                </div>
                                            ))}
                                            {dayTasks.length > 3 && (
                                                <span className="text-xs text-violet-600 font-medium">+{dayTasks.length - 3} autres</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Legend */}
                <div className="p-4 border-t border-gray-100 flex flex-wrap gap-4 justify-center">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-3 h-3 rounded-full bg-blue-500" /> En cours
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-3 h-3 rounded-full bg-amber-500" /> À valider
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" /> Validée
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-3 h-3 rounded-full bg-rose-500" /> Rejetée
                    </div>
                </div>
            </div>

            {/* Selected Date Modal */}
            {selectedDate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedDate(null)}>
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                Tâches du {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </h3>
                            <button onClick={() => setSelectedDate(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {selectedDateTasks.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Aucune tâche pour ce jour</p>
                        ) : (
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {selectedDateTasks.map((task) => {
                                    const statusInfo: Record<string, { icon: any; color: string; label: string }> = {
                                        en_cours: { icon: Clock, color: "text-blue-600", label: "En cours" },
                                        en_attente: { icon: AlertTriangle, color: "text-amber-600", label: "À valider" },
                                        valide: { icon: CheckCircle, color: "text-emerald-600", label: "Validée" },
                                        rejete: { icon: XCircle, color: "text-rose-600", label: "Rejetée" }
                                    };
                                    const info = statusInfo[task.statut] || statusInfo.en_cours;
                                    const Icon = info.icon;

                                    return (
                                        <div key={task._id} className="p-4 bg-gray-50 rounded-xl">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{task.titre}</h4>
                                                    <p className="text-sm text-gray-500 mt-1">{task.employeeDetails?.fullname || `${task.user_id?.firstname} ${task.user_id?.nom}`}</p>
                                                </div>
                                                <span className={`flex items-center gap-1 text-sm font-medium ${info.color}`}>
                                                    <Icon className="w-4 h-4" />
                                                    {info.label}
                                                </span>
                                            </div>
                                            <div className="mt-3">
                                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                    <span>Progression</span>
                                                    <span className="font-medium">{task.progression}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${task.progression < 30 ? 'bg-rose-500' :
                                                                task.progression < 70 ? 'bg-amber-500' : 'bg-emerald-500'
                                                            }`}
                                                        style={{ width: `${task.progression}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCalendar;
