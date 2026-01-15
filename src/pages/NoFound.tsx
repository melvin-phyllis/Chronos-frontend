import { Home, ArrowLeft, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

const NoFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 flex flex-col">
            {/* Header */}
            <header className="p-6">
                <Link to="/" className="inline-flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/20">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        NEXA
                    </span>
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="text-center max-w-lg">
                    {/* 404 Illustration */}
                    <div className="relative mb-8">
                        {/* Animated background blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-200 rounded-full blur-3xl opacity-50 animate-pulse" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full blur-2xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />

                        {/* 404 Text */}
                        <div className="relative">
                            <h1 className="text-[180px] sm:text-[220px] font-black leading-none bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent select-none">
                                404
                            </h1>
                            {/* Decorative elements */}
                            <div className="absolute top-8 right-4 w-6 h-6 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="absolute bottom-12 left-8 w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                            <div className="absolute top-1/2 right-0 w-3 h-3 bg-pink-400 rounded-full animate-bounce" />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="relative z-10 space-y-4 mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Oups ! Page introuvable
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            La page que vous recherchez semble avoir pris des vacances.
                            Elle n'existe pas ou a été déplacée.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            Retour à l'accueil
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="group w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Page précédente
                        </button>
                    </div>

                    
                </div>
            </main>

            {/* Footer */}
            <footer className="p-6 text-center text-sm text-gray-400">
                © 2026 NEXA. Tous droits réservés.
            </footer>
        </div>
    )
}

export default NoFound
