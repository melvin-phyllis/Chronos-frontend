import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect } from "react"

const BtnSubmit = ({ step, setStep, load, handleReset }: {
    step: number, setStep: React.Dispatch<React.SetStateAction<number>>,
    load: boolean,
    handleReset: () => void
}) => {


    const Nextstep = () => {
        if (step < 2) {
            setStep(step + 1)
        }
    }

    const Previousstep = () => {
        if (step > 0) {
            setStep(step - 1)
        }
        console.log(step)
    }


    useEffect(() => {
        console.log("step")
    }, [step])

    return (
        <>
            <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex gap-3">

                        <button type="button" onClick={() => { handleReset() }} className="px-4 py-2 text-rose-500 hover:text-rose-700 text-sm font-medium">
                            Annuler
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <button type={"button"} onClick={
                            () => Previousstep()
                        } className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium  ${step == 0 ? "cursor-not-allowed bg-gray-100 text-gray-400" : "btn "}`}>
                            <ChevronLeft className="w-4 h-4" />
                            Précédent
                        </button>

                        {step < 2 ? (
                            <button type={"button"} onClick={
                                () => {
                                    console.log("ok next")
                                    Nextstep()
                                }
                            } className={`flex items-center gap-2 px-6 py-2.5  text-white rounded-xl text-sm font-medium   transition-all shadow-sm ${step == 2 ? "cursor-not-allowed bg-gray-100 text-gray-400 " : "bg-violet-600 hover:bg-violet-700 btn"}`}>
                                Suivant
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (

                            /* Bouton Soumettre - à afficher à l'étape 3 */
                            <label htmlFor="my_modal_7" className="btn">Ajouter </label>

                        )}
                    </div>
                </div>
            </div >

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Ajouter un employé</h3>
                    <p className="py-4">Voulez-vous vraiment ajouter ce employé ?</p>

                    <div className="modal-action">
                        <button disabled={load} type={"submit"} 
                        className={`flex btn items-center gap-2 px-6 py-2.5 ${load ? "cursor-not-allowed bg-gray-100 text-gray-400 " : "bg-emerald-600 hover:bg-emerald-700"} text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-all shadow-sm`}>
                            <Check className="w-4 h-4" />
                            Ajouter
                        </button>
                        <label htmlFor="my_modal_7" className="btn">Annuler</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BtnSubmit
