import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const Formlogin = () => {

    const [show, setShow] = useState(true)

    return (
        <>
            <form action="" className=" p-5 space-y-10">
                <div className="flex flex-col space-y-3">
                    <label htmlFor="email">Identifiant</label>
                    <input type="email" name="" id="" placeholder=" votre@email.com" className="bg-gray-100 p-3 rounded-xl outline-violet-300" />
                </div>
                <div className="flex flex-col space-y-3">
                    <label htmlFor="email">Mot de passe</label>
                    <div className="w-full flex items-center divpass bg-gray-100 p-3 rounded-xl gap-2 outline-violet-300">
                        <input type={show ? "password" : 'text'} name="" id="" placeholder="Saisissez votre mot de passe sécurisé" className=" w-full outline-none inputpass" />
                        <button className="btn btn-sm btn-neutral btn-outline bg-violet-500 " type="button" onClick={() => {
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
                <button className="btn bg-violet-500  rounded-xl p-2 font-bold text-white w-full">Se connecter</button>

            </form>
        </>
    )
}

export default Formlogin
