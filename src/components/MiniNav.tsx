import { Bell, Menu, Moon, Search, Settings, Sun, X } from "lucide-react"
import { useState } from "react"

const MiniNav = () => {
    const [searchOpen, setSearchOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

    return (
        <nav className="bg-white rounded-2xl shadow-sm p-4 mb-4">
            {/* Bouton menu mobile */}
            <div className="flex lg:hidden items-center justify-between mb-4">
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="avatar">
                        <div className="w-9 h-9 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">M</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nav Desktop */}
            <div className="hidden lg:flex items-center justify-between">
                {/* Gauche - Salutation */}
                <div className="flex flex-col">
                    <span className="text-sm text-gray-400 font-medium">Bienvenue 👋</span>
                    <h2 className="text-xl font-bold text-gray-900">Bonjour, Melvin</h2>
                </div>

                {/* Droite - Actions */}
                <div className="flex items-center gap-3">
                    {/* Barre de recherche */}
                    <div className={`flex items-center transition-all duration-300 ${searchOpen ? 'w-72' : 'w-48'}`}>
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Rechercher..."
                                onFocus={() => setSearchOpen(true)}
                                onBlur={() => setSearchOpen(false)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                            />
                            {searchOpen && (
                                <button
                                    onClick={() => setSearchOpen(false)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Séparateur */}
                    <div className="w-px h-8 bg-gray-200"></div>

                    {/* Toggle thème */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
                        title="Changer de thème"
                    >
                        {isDarkMode ? (
                            <Sun className="w-5 h-5 text-amber-500" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-500" />
                        )}
                    </button>

                    {/* Paramètres */}
                    <button
                        className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
                        title="Paramètres"
                    >
                        <Settings className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Notifications */}
                    <button
                        className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors relative"
                        title="Notifications"
                    >
                        <Bell className="w-5 h-5 text-gray-500" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </button>

                    {/* Séparateur */}
                    <div className="w-px h-8 bg-gray-200"></div>



                </div>
            </div>

            {/* Recherche Mobile */}
            <div className="lg:hidden">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Rechercher employés, rapports..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>
        </nav>
    )
}

export default MiniNav
