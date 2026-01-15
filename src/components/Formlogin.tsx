import { useState } from "react"
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { login } from "../controllers/login"
import type { ForminputType } from "../types"

const Formlogin = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [load, setLoading] = useState(false)
    const [formlogin, setFormlogin] = useState<ForminputType>({
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormlogin(prev => ({
            ...prev, [name]: value
        }))
    }

    return (
        <form className="space-y-5" onSubmit={(e) => login(e, formlogin, navigate, setLoading)}>
            {/* Email Field */}
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Adresse email
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                    Mot de passe
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        required
                        type={show ? "text" : "password"}
                        name="password"
                        id="password"
                        onChange={handleChange}
                        placeholder="••••••••••"
                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-violet-600 transition-colors"
                    >
                        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
                <label htmlFor="remember" className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        Se souvenir de moi
                    </span>
                </label>
                <a href="#" className="text-sm font-medium text-violet-600 hover:text-violet-700 hover:underline transition-colors">
                    Mot de passe oublié ?
                </a>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={load}
                className={`
                    w-full py-4 rounded-xl font-semibold text-white
                    flex items-center justify-center gap-2
                    transition-all duration-200
                    ${load
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 active:translate-y-0'
                    }
                `}
            >
                {load ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Connexion en cours...
                    </>
                ) : (
                    'Se connecter'
                )}
            </button>
        </form>
    )
}

export default Formlogin
