import axios from "axios";
import { ToastError } from "@/toastify/react-toastify";

const fetchHistory = async (setLeaves:any,setLoading:any) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leave/my-history`, {
                withCredentials: true
            });
            if (res.data.success) {
                setLeaves(res.data.data);
            }
        } catch (error) {
            console.error("Erreur chargement historique", error);
            ToastError("Impossible de charger l'historique.");
        } finally {
            setLoading(false);
        }
    };


    export default fetchHistory