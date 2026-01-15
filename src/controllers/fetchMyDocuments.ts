import axios from "axios";
import { ToastError } from "@/toastify/react-toastify";

export interface EmployeeDocuments {
    cvAndPortfolio?: string;
    proofOfIdentity?: string;
    signedContract?: string;
    offerLetter?: string;
}

export const fetchMyDocuments = async (setDocuments: (docs: EmployeeDocuments) => void, setLoading: (loading: boolean) => void) => {
    try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-user-info`, {
            withCredentials: true
        });

        if (res.data.success && res.data.data) {
            setDocuments(res.data.data.documents || {});
        }
    } catch (error) {
        console.error("Erreur chargement documents", error);
        ToastError("Impossible de charger les documents.");
    } finally {
        setLoading(false);
    }
};
