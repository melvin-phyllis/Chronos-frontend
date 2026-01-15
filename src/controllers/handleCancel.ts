import { ToastError, ToastSuccess } from "@/toastify/react-toastify";
import axios from "axios";

const handleCancel = async (
    id: string,
    setLeaves: any,
    leaves: any,
    onBalanceUpdate?: () => void
) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cancel-leaverequest`, { id }, {
            withCredentials: true
        });

        if (res.data.success) {
            setLeaves(leaves.map((l: any) => l._id === id ? { ...l, statut: 'annule' } : l));

            // Si c'était un congé validé, on doit mettre à jour le solde
            if (leaves.find((l: any) => l._id === id)?.statut === 'valide') {
                if (onBalanceUpdate) {
                    onBalanceUpdate();
                }
            }
            ToastSuccess("Demande annulée avec succès.");
        } else {
            ToastError(res.data.message);
        }

    } catch (error) {
        console.error("Erreur annulation", error);
        ToastError("Impossible d'annuler la demande.");
    }
};

export default handleCancel;
