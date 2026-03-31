import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n.jsx';
import { useTheme } from '@/lib/theme.jsx';
import { Sun, Moon, Globe, Menu, X, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
    const { lang, setLang, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const isAdmin = location.pathname.startsWith('/admin');
    if (isAdmin) return null;

    const navLinks = [
        { path: '/', label: t('nav.home') },
        { path: '/jobs', label: t('common.jobBoard') },
        { path: '/request-tutor', label: t('nav.requestTutor') },
        { path: '/become-tutor', label: t('nav.becomeTutor') },
        { path: '/ai-experience', label: t('nav.aiExperience') },
    ];

    const langLabels = { en: 'EN', am: 'አማ', or: 'OR' };

    return (
        <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                            <GraduationCap className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-bold text-foreground hidden sm:block">
                            TutorHub
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        {/* Language Switcher */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-accent text-muted-foreground text-xs font-semibold outline-none transition-colors">
                                <Globe className="w-4 h-4" />
                                <span>{langLabels[lang]}</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="z-[100]">
                                <DropdownMenuItem onSelect={() => setLang('en')} className="cursor-pointer">
                                    English
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLang('am')} className="cursor-pointer">
                                    አማርኛ (Amharic)
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLang('or')} className="cursor-pointer">
                                    Afaan Oromo
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Theme Toggle */}
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
                            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-muted-foreground"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-border bg-card px-4 pb-4">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setMobileOpen(false)}
                            className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}