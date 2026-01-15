import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, Key, LogOut, CheckCircle } from "lucide-react";
import type { PresenceType } from "../types";
import { ToastError, ToastSuccess } from "../toastify/react-toastify";
import { io } from "socket.io-client";

const PresenceWidget = () => {
    const [presence, setPresence] = useState<PresenceType | null>(null);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        fetchPresence();

        const socket = io(import.meta.env.VITE_BACKEND_URL);

        socket.on('presence_update', () => {
            fetchPresence();
        });

        return () => {
            clearInterval(timer);
            socket.disconnect();
        };
    }, []);

    const fetchPresence = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/presence/today`, {
                withCredentials: true
            });
            if (res.data.success) {
                setPresence(res.data.data);
            }
        } catch (error) {
            console.error("Erreur chargement présence", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/presence/check-in`, {}, {
                withCredentials: true
            });
            if (res.data.success) {
                ToastSuccess("Bienvenue ! Pointage enregistré.");
                setPresence(res.data.data);
            }
        } catch (error: any) {
            ToastError(error.response?.data?.message || "Erreur lors du pointage");
        } finally {
            setLoading(false);
        }
    };

    const handleCheckOut = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/presence/check-out`, {}, {
                withCredentials: true
            });
            if (res.data.success) {
                ToastSuccess("Au revoir ! Pointage de départ enregistré.");
                setPresence(res.data.data);
            }
        } catch (error: any) {
            ToastError(error.response?.data?.message || "Erreur lors du pointage");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !presence) return <div className="animate-pulse bg-gray-200 h-40 rounded-2xl"></div>;

    const isCheckedIn = !!presence?.check_in;
    const isCheckedOut = !!presence?.check_out;

    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-violet-200 transition-all group overflow-hidden relative">

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-xl transition-colors ${isCheckedIn ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <Clock className={`w-6 h-6 ${isCheckedIn ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-lg font-mono">
                    {time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">Pointage</h3>

            {/* Status Display */}
            {!isCheckedIn ? (
                <div>
                    <p className="text-sm text-gray-500 mb-4">Commencer la journée</p>
                    <button
                        onClick={handleCheckIn}
                        disabled={loading}
                        className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-violet-200"
                    >
                        <Key className="w-4 h-4" />
                        Check In
                    </button>
                </div>
            ) : !isCheckedOut ? (
                <div>
                    <p className="text-sm text-green-600 font-medium mb-1">En service depuis {new Date(presence!.check_in!).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>

                    {time.getHours() < 17 ? (
                        <div className="mb-4 p-2 bg-orange-50 rounded text-xs text-orange-600 border border-orange-100">
                            Départ possible à partir de 17h00
                        </div>
                    ) : (
                        <p className="text-xs text-gray-400 mb-4">N'oubliez pas de pointer en partant</p>
                    )}

                    <button
                        onClick={handleCheckOut}
                        disabled={loading || time.getHours() < 17}
                        className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg
                            ${time.getHours() < 17
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                                : 'bg-orange-500 hover:bg-orange-600 text-white active:scale-95 shadow-orange-200'
                            }`}
                    >
                        <LogOut className="w-4 h-4" />
                        Check Out
                    </button>
                </div>
            ) : (
                <div>
                    <p className="text-sm text-gray-500 mb-2">Journée terminée</p>
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-bold">{presence?.duree_travail} heures</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PresenceWidget;
