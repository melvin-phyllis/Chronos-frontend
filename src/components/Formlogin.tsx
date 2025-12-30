import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { login } from "../controllers/login"
import type { ForminputType } from "../types"

const Formlogin = () => {

    const navigate = useNavigate()
    const [show, setShow] = useState(true)
    const [load, setLoading] = useState(false)
    const [formlogin, setFormlogin] = useState<ForminputType>({
        email: "",
        password: ""
    })

    const Handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormlogin(prev => ({
            ...prev, [name]: value
        }))
    }
    return (
        <>
            <form action="" className=" p-5 space-y-10" onSubmit={(e) => login(e, formlogin, navigate, setLoading)}>
                <div className="flex flex-col space-y-3">
                    <label htmlFor="email">Identifiant</label>
                    <input required type="email" name="email" id="email"
                        onChange={(e) => Handlechange(e)}
                        placeholder=" votre@email.com" className="bg-gray-100 p-3 rounded-xl outline-violet-300" />
                </div>
                <div className="flex flex-col space-y-3">
                    <label htmlFor="password">Mot de passe</label>
                    <div className="w-full flex items-center divpass bg-gray-100 p-3 rounded-xl gap-2 outline-violet-300">
                        <input required type={show ? "password" : 'text'} name="password" id="password"
                            onChange={(e) => Handlechange(e)}
                            placeholder="Saisissez votre mot de passe sécurisé" className=" w-full outline-none inputpass" />

                        <button className="btn btn-sm btn-neutral btn-outline bg-violet-500 " type="button"
                            onClick={() => {
                                setShow(show ? false : true)
                            }}>
                            {show ? (<FaRegEye className="text-2xl" />) : <FaRegEyeSlash className="text-2xl" />}
                        </button>
                    </div>
                </div>
                <div className="flex  justify-between">
                    <label htmlFor="savelogin" className="flex gap-2 items-center">
                        <input type="checkbox" name="savelogin" id="savelogin" />
                        <span className="text-sm font-semibold"> Rester connecté</span>
                    </label>
                    <a href="" className="text-sm underline font-semibold ">Identifiants oubliés ?</a>
                </div>
                <button disabled={load} className={`btn ${load ? "bg-gray-200" : 'bg-violet-500'} w-full rounded-xl p-2 font-bold text-white w-full"`} >{load ? "chargement ..." : "Se connecter"} </button>
            </form>
        </>
    )
}

export default Formlogin
