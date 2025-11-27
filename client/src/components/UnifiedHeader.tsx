import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navItems = [
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Agent", href: "/agent" },
    { label: "How It Works", href: "/about" },
];

export default function UnifiedHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { currentUser, userProfile, logout } = useAuth();

    return (
        <nav className="bg-white/10 backdrop-blur-md sticky top-0 z-50 border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2">
                    <img
                        src="/logoria.gif"
                        alt="Ria logo"
                        className="h-[68px] w-[68px] object-contain"
                    />
                    <span className="text-2xl font-bold text-gray-900 drop-shadow">Ria</span>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 md:gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-gray-900 hover:text-indigo-600 transition-colors text-sm md:text-base font-medium drop-shadow-sm"
                        >
                            {item.label}
                        </a>
                    ))}

                    {currentUser && userProfile ? (
                        <div className="flex items-center gap-3">
                            <a href="/dashboard" className="flex items-center gap-2">
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                                        {userProfile.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-gray-900">{userProfile.name}</span>
                            </a>
                            <button
                                onClick={logout}
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <a
                            href="/signin"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-md"
                        >
                            Sign In
                        </a>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-gray-900"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 py-4 space-y-3">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="block py-2 text-gray-900 hover:text-indigo-600 font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        {currentUser && userProfile ? (
                            <>
                                <a
                                    href="/dashboard"
                                    className="block py-2 text-gray-900 hover:text-indigo-600 font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </a>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left py-2 text-gray-600 hover:text-gray-900"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <a
                                href="/signin"
                                className="block py-2 text-indigo-600 font-semibold"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign In
                            </a>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
