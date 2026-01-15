import axios from "axios";
import { ToastError } from "@/toastify/react-toastify";

export interface PayrollType {
    _id: string;
    mois: number;
    annee: number;
    montant_brut: number;
    montant: number;
    statut: 'en_attente' | 'paye';
    date_paiement?: string;
    pdf_url?: string;
    details?: {
        salaire_base: number;
        primes: number;
        deductions: number;
        heures_supplementaires: number;
    };
    createdAt?: string;
    updatedAt?: string;
}

export const fetchPayrolls = async (setPayrolls: (data: PayrollType[]) => void, setLoading: (loading: boolean) => void) => {
    try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/payroll/my-history`, {
            withCredentials: true
        });
        if (res.data.success) {
            setPayrolls(res.data.data);
        }
    } catch (error) {
        console.error("Erreur chargement paie", error);
        ToastError("Impossible de charger les bulletins de paie.");
    } finally {
        setLoading(false);
    }
};
