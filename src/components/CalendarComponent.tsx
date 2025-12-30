import React from "react"
import { Calendar18 } from "./Calendar18"
import { Clock, MoreHorizontal, Plus, Users } from "lucide-react"

const CalendarComponent = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    // Événements
    const events = [
        { title: "Réunion d'équipe", time: "10:00", duration: "1h", type: "meeting", attendees: 8 },
        { title: "Jour de Noël", time: "Toute la journée", duration: "", type: "holiday", attendees: 0 },
        { title: "Évaluation de performance", time: "14:00", duration: "30min", type: "review", attendees: 2 },
        { title: "Intégration nouvel employé", time: "09:00", duration: "2h", type: "onboarding", attendees: 5 },
    ]

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 bg-gray-50/50 rounded-3xl">
            {/* Grille Calendrier */}
            <div className="flex-1 flex flex-col gap-4">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 capitalize">
                            {date?.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) || "Calendrier"}
                        </h1>
                        <p className="text-sm text-gray-500">Gérez votre emploi du temps et vos congés</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 text-sm font-bold text-violet-600 bg-violet-50 rounded-xl hover:bg-violet-100 transition-all active:scale-95" onClick={() => setDate(new Date())}>
                            Aujourd'hui
                        </button>
                    </div>
                </div>
                <Calendar18 date={date} setDate={setDate} />
            </div>

            {/* Barre latérale - Événements */}
            <div className="lg:w-80 space-y-6">
                {/* Événements du jour */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-gray-900">
                            {date ? date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : "Événements"}
                        </h2>
                        <button className="p-2 bg-violet-100 rounded-lg hover:bg-violet-200 transition-colors">
                            <Plus className="w-4 h-4 text-violet-600" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-xl border-l-4 transition-all hover:shadow-md cursor-pointer ${event.type === "meeting" ? "bg-violet-50 border-violet-500" :
                                    event.type === "holiday" ? "bg-rose-50 border-rose-500" :
                                        event.type === "review" ? "bg-amber-50 border-amber-500" :
                                            "bg-emerald-50 border-emerald-500"
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-sm">{event.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock className="w-3 h-3 text-gray-400" />
                                            <span className="text-xs text-gray-500">{event.time}</span>
                                            {event.duration && (
                                                <span className="text-xs text-gray-400">• {event.duration}</span>
                                            )}
                                        </div>
                                        {event.attendees > 0 && (
                                            <div className="flex items-center gap-1 mt-2">
                                                <Users className="w-3 h-3 text-gray-400" />
                                                <span className="text-xs text-gray-500">{event.attendees} participants</span>
                                            </div>
                                        )}
                                    </div>
                                    <button className="p-1 hover:bg-white/50 rounded transition-colors">
                                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Stats rapides */}
                <div className="bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl shadow-sm p-5 text-white">
                    <h2 className="font-bold mb-4">Ce mois-ci</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-xl p-3 text-center">
                            <p className="text-2xl font-bold">12</p>
                            <p className="text-xs text-white/80">Réunions</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3 text-center">
                            <p className="text-2xl font-bold">3</p>
                            <p className="text-xs text-white/80">Jours fériés</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3 text-center">
                            <p className="text-2xl font-bold">8</p>
                            <p className="text-xs text-white/80">En congé</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3 text-center">
                            <p className="text-2xl font-bold">5</p>
                            <p className="text-xs text-white/80">Événements</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarComponent
