import Formlogin from "../../components/Formlogin"

const Login = () => {
    return (
        <>
            <div className="md:min-h-screen grid md:grid-cols-2">
                <div className="bg-amber-200 h-screen text-center relative login-img-background text-white flex  items-center ">
                    <div className=" w-full h-full bg-black opacity-6 absolute "></div>
                    <div className="absolute w-full   mt-20 space-y-8">
                        <h1 className="text-5xl font-bold">Bienvenue sur NEXA</h1>
                        <span className="font-extrabold tex-sm">
                            Gérez vos ressources humaines de manière intelligente et efficace <br />
                            avec une solution tout-en-un</span>

                    </div>
                </div>
                <div className="bg-white flex justify-center items-center h-screen">
                    <div className="sapce-y-4">
                        <div className="text-center flex flex-col mb-6">
                            <img src="/téléchargement (1).png" alt="" className="h-30 object-contain" />
                            <h1 className="text-xl font-semibold ">Heureux de vous revoir !</h1>
                            <span className="">
                                Accédez à votre espace NEXA pour piloter votre équipe en toute simplicité.
                            </span>
                        </div>


                        <Formlogin />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login









//

//

// Nouveau sur TeamHub ? Créer un compte
