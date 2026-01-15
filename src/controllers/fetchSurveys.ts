import axios from "axios";
import { ToastError, ToastSuccess } from "@/toastify/react-toastify";

export interface SurveyQuestion {
    _id: string;
    question: string;
    type: 'choix_multiple' | 'texte_libre' | 'echelle' | 'oui_non';
    options?: string[];
    obligatoire: boolean;
}

export interface SurveyType {
    _id: string;
    titre: string;
    description: string;
    questions: SurveyQuestion[];
    statut: string;
    date_fin?: string;
    responded: boolean;
}

export const fetchSurveys = async (setSurveys: (data: SurveyType[]) => void, setLoading: (loading: boolean) => void) => {
    try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/surveys/available`, {
            withCredentials: true
        });
        if (res.data.success) {
            setSurveys(res.data.data);
        }
    } catch (error) {
        console.error("Erreur chargement sondages", error);
        ToastError("Impossible de charger les sondages.");
    } finally {
        setLoading(false);
    }
};

export const submitSurvey = async (surveyId: string, responses: { question_index: number; reponse: any }[], onSuccess: () => void) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/surveys/submit`, {
            survey_id: surveyId,
            reponses: responses
        }, {
            withCredentials: true
        });

        if (res.data.success) {
            ToastSuccess("Merci pour votre réponse !");
            onSuccess();
        }
    } catch (error: any) {
        console.error("Erreur soumission sondage", error);
        ToastError(error.response?.data?.message || "Erreur lors de l'envoi de la réponse.");
    }
};
