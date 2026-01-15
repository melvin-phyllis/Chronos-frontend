import axios from "axios";
import { type LeaveBalanceType } from "@/types";

const fetchBalance = async (setBalance: (balance: LeaveBalanceType) => void) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leave/balance`, {
            withCredentials: true
        });
        if (res.data.success) {
            setBalance(res.data.data);
        }
    } catch (error) {
        console.error("Erreur chargement solde congés", error);
    }
};

export default fetchBalance;
