import { ArrowRight, BarChart3, Calendar, CheckCircle, ChevronRight, Clock, FileText, Github, Linkedin, Mail, Menu, Play, Shield, Sparkles, Star, Twitter, Users, X, Zap } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Landingpage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const features = [
        {
            icon: <Users className="w-6 h-6" />,
            title: "Gestion des Employés",
            description: "Centralisez toutes les informations de vos collaborateurs dans un annuaire intelligent et sécurisé."
        },
        {
            icon: <Calendar className="w-6 h-6" />,
            title: "Congés & Absences",
            description: "Automatisez les demandes de congés avec validation en temps réel et suivi des soldes."
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Pointage Digital",
            description: "Check-in/check-out simplifié avec géolocalisation et rapports de présence détaillés."
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Analytics RH",
            description: "Tableaux de bord intelligents pour piloter votre capital humain avec précision."
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Gestion des Tâches",
            description: "Assignez, suivez et validez les missions de vos équipes en toute transparence."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Sécurité Avancée",
            description: "Vos données sont protégées avec un chiffrement de bout en bout et des accès contrôlés."
        }
    ]

    const stats = [
        { value: "99.9%", label: "Disponibilité" },
        { value: "10k+", label: "Utilisateurs actifs" },
        { value: "50+", label: "Entreprises" },
        { value: "4.9/5", label: "Satisfaction" }
    ]

    const testimonials = [
        {
            quote: "NEXA a transformé notre gestion RH. Le gain de temps est impressionnant et nos équipes adorent l'interface intuitive.",
            author: "Marie Dupont",
            role: "DRH, TechCorp",
            avatar: "MD"
        },
        {
            quote: "Enfin une solution qui comprend les besoins des PME. Simple, efficace et abordable.",
            author: "Jean Martin",
            role: "CEO, StartupFlow",
            avatar: "JM"
        },
        {
            quote: "Le support client est exceptionnel. Chaque question trouve une réponse en moins d'une heure.",
            author: "Sophie Bernard",
            role: "Office Manager, DigitalAge",
            avatar: "SB"
        }
    ]

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                NEXA
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors">Fonctionnalités</a>
                            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors">Tarifs</a>
                            <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors">Témoignages</a>
                            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors">Contact</a>
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors">
                                Connexion
                            </Link>
                            <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all hover:-translate-y-0.5">
                                Démarrer gratuitement
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3 animate-in slide-in-from-top duration-300">
                        <a href="#features" className="block py-2 text-gray-700 font-medium">Fonctionnalités</a>
                        <a href="#pricing" className="block py-2 text-gray-700 font-medium">Tarifs</a>
                        <a href="#testimonials" className="block py-2 text-gray-700 font-medium">Témoignages</a>
                        <Link to="/login" className="block w-full py-3 text-center bg-violet-600 text-white rounded-xl font-semibold">
                            Connexion
                        </Link>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200 rounded-full blur-3xl opacity-40 animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-30" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-100 rounded-full text-sm font-medium text-violet-700 mb-8 animate-in fade-in slide-in-from-bottom duration-500">
                            <Zap className="w-4 h-4" />
                            <span>Nouveau : Intégration IA pour l'onboarding</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '100ms' }}>
                            La gestion RH qui
                            <span className="relative inline-block mx-3">
                                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                                    inspire
                                </span>
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                                    <path d="M2 10C50 4 150 4 198 10" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                                            <stop stopColor="#8B5CF6" />
                                            <stop offset="1" stopColor="#EC4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                            vos équipes
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '200ms' }}>
                            Simplifiez la gestion des congés, du pointage et des tâches de vos collaborateurs.
                            Une plateforme tout-en-un pour les RH modernes.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '300ms' }}>
                            <Link to="/login" className="group w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl hover:shadow-xl hover:shadow-violet-500/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                                Commencer maintenant
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="group w-full sm:w-auto px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-2xl hover:border-violet-300 hover:bg-violet-50 transition-all flex items-center justify-center gap-2">
                                <Play className="w-5 h-5 text-violet-600" />
                                Voir la démo
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500 animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '400ms' }}>
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {['A', 'B', 'C', 'D'].map((letter, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                                            {letter}
                                        </div>
                                    ))}
                                </div>
                                <span>+1000 utilisateurs actifs</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                ))}
                                <span className="ml-1">4.9/5 sur Trustpilot</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image/Dashboard Preview */}
                    <div className="mt-16 relative animate-in fade-in slide-in-from-bottom duration-1000" style={{ animationDelay: '500ms' }}>
                        <div className="relative mx-auto max-w-5xl">
                            {/* Glow effect */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl blur-2xl opacity-20" />

                            {/* Dashboard mockup */}
                            <div className="relative bg-gray-900 rounded-2xl shadow-2xl p-2 border border-gray-800">
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <div className="px-4 py-1 bg-gray-800 rounded-lg text-xs text-gray-400">
                                            app.nexa.hr/dashboard
                                        </div>
                                    </div>
                                </div>
                                <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg overflow-hidden">
                                    {/* Simplified dashboard preview */}
                                    <div className="p-6 grid grid-cols-4 gap-4 h-full opacity-90">
                                        {/* Sidebar */}
                                        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
                                            <div className="w-full h-8 bg-violet-100 rounded-lg" />
                                            <div className="w-3/4 h-4 bg-gray-100 rounded" />
                                            <div className="w-full h-4 bg-gray-100 rounded" />
                                            <div className="w-2/3 h-4 bg-gray-100 rounded" />
                                            <div className="w-full h-4 bg-violet-50 rounded" />
                                            <div className="w-4/5 h-4 bg-gray-100 rounded" />
                                        </div>
                                        {/* Main */}
                                        <div className="col-span-3 space-y-4">
                                            {/* Stats row */}
                                            <div className="grid grid-cols-4 gap-4">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                                                        <div className="w-8 h-8 bg-violet-100 rounded-lg mb-3" />
                                                        <div className="w-12 h-6 bg-gray-200 rounded mb-1" />
                                                        <div className="w-16 h-3 bg-gray-100 rounded" />
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Chart area */}
                                            <div className="bg-white rounded-xl shadow-sm p-4 flex-1">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-32 h-4 bg-gray-200 rounded" />
                                                    <div className="flex gap-2">
                                                        <div className="w-16 h-6 bg-violet-100 rounded-lg" />
                                                        <div className="w-16 h-6 bg-gray-100 rounded-lg" />
                                                    </div>
                                                </div>
                                                <div className="flex items-end justify-between h-32 gap-2">
                                                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                                                        <div key={i} className="flex-1 bg-gradient-to-t from-violet-500 to-purple-400 rounded-t-lg" style={{ height: `${h}%` }} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-violet-600 to-purple-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-violet-200 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-2 bg-violet-100 text-violet-700 text-sm font-semibold rounded-full mb-4">
                            Fonctionnalités
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Tout ce dont vos RH ont besoin
                        </h2>
                        <p className="text-lg text-gray-600">
                            Une suite complète d'outils pour digitaliser et optimiser votre gestion des ressources humaines.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <div key={i} className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-violet-200">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-violet-500/30">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-2 bg-violet-100 text-violet-700 text-sm font-semibold rounded-full mb-4">
                            Témoignages
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Ils nous font confiance
                        </h2>
                        <p className="text-lg text-gray-600">
                            Découvrez ce que nos clients disent de leur expérience avec NEXA.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-violet-200 transition-colors">
                                <div className="flex items-center gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map((_, j) => (
                                        <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 leading-relaxed mb-6 italic">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.author}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500" />
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
                        Prêt à transformer votre gestion RH ?
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        Rejoignez des centaines d'entreprises qui ont déjà simplifié leur quotidien avec NEXA.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/login" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-violet-600 bg-white rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                            Démarrer gratuitement
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            <Mail className="w-5 h-5" />
                            Nous contacter
                        </button>
                    </div>
                    <p className="mt-6 text-white/60 text-sm">
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        Essai gratuit de 14 jours • Aucune carte requise
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold">NEXA</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                La solution RH nouvelle génération pour les entreprises modernes.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Produit</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Intégrations</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Entreprise</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Légal</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Sécurité</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">RGPD</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-400">
                            © 2026 NEXA. Tous droits réservés.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-violet-600 transition-colors" target="_blank">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/melvin-akou" className="p-2 bg-gray-800 rounded-lg hover:bg-violet-600 transition-colors" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/melvin-phyllis" className="p-2 bg-gray-800 rounded-lg hover:bg-violet-600 transition-colors" target="_blank">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Landingpage