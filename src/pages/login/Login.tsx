import { Sparkles, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import Formlogin from "../../components/Formlogin"

const Login = () => {
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 login-img-background" />
            

                {/* Animated blobs */}
                

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        
                    </Link>

                   

                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
                {/* Mobile header */}
                <div className="lg:hidden p-6 bg-gradient-to-r from-violet-600 to-purple-600">
                    <Link to="/" className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold">NEXA</span>
                    </Link>
                </div>

                {/* Form container */}
                <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                    <div className="w-full max-w-md">
                        {/* Back link (desktop) */}
                        <Link to="/" className="hidden lg:inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-8 transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Retour à l'accueil
                        </Link>

                        {/* Card */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 lg:p-10 border border-gray-100">
                            {/* Logo */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30 mb-6">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Heureux de vous revoir !
                                </h2>
                                <p className="text-gray-500">
                                    Connectez-vous pour accéder à votre espace
                                </p>
                            </div>

                            {/* Form */}
                            <Formlogin />

                        </div>

                        {/* Footer */}
                        <p className="text-center text-sm text-gray-400 mt-8">
                            En vous connectant, vous acceptez nos{' '}
                            <a href="#" className="text-violet-600 hover:underline">Conditions d'utilisation</a>
                            {' '}et notre{' '}
                            <a href="#" className="text-violet-600 hover:underline">Politique de confidentialité</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
