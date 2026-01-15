import axios from "axios";
import { ToastError } from "@/toastify/react-toastify";

export interface DashboardStats {
    totalEmployees: number;
    presentToday: number;
    onLeaveToday: number;
    pendingLeaves: number;
    payrollTotal: number;
}

export const fetchDashboardStats = async (setStats: (data: DashboardStats) => void, setLoading: (loading: boolean) => void) => {
    try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stats/dashboard`, {
            withCredentials: true
        });

        if (res.data.success) {
            setStats(res.data.data);
        }
    } catch (error) {
        console.error("Erreur chargement stats", error);
        ToastError("Impossible de charger les statistiques.");
    } finally {
        setLoading(false);
    }
};
