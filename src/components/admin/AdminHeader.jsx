import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/lib/theme.jsx';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Menu, X, LayoutDashboard, FileText, UserCheck, Users, LinkIcon, LogOut, GraduationCap } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import AdminNotifications from './AdminNotification';

const links = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/requests', label: 'Requests', icon: FileText },
    { path: '/admin/applications', label: 'Applications', icon: UserCheck },
    { path: '/admin/tutors', label: 'Tutors', icon: Users },
    { path: '/admin/assignments', label: 'Assignments', icon: LinkIcon },
];

export default function AdminHeader() {
    const { theme, toggleTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const { logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
            <div className="flex items-center justify-between px-4 sm:px-6 h-14">
                <div className="flex items-center gap-3 lg:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    <Link to="/admin" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                            <GraduationCap className="w-3.5 h-3.5 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-sm">Admin</span>
                    </Link>
                </div>
                <div className="hidden lg:block" />
                <div className="flex items-center gap-2">
                    <AdminNotifications />
                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
                        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </Button>
                    <Link to="/">
                        <Button variant="ghost" size="sm" className="text-muted-foreground text-xs">
                            View Site
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <div className="lg:hidden border-t border-border bg-card px-4 pb-4 space-y-0.5">
                    {links.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                        >
                            <link.icon className="w-4 h-4" />
                            {link.label}
                        </Link>
                    ))}
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive w-full"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
}