import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, UserCheck, Users, LinkIcon, LogOut, GraduationCap, Briefcase } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

const links = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/requests', label: 'Tutor Requests', icon: FileText },
    { path: '/admin/applications', label: 'Applications', icon: UserCheck },
    { path: '/admin/tutors', label: 'Tutors', icon: Users },
    { path: '/admin/assignments', label: 'Assignments', icon: LinkIcon },
    { path: '/admin/posted-jobs', label: 'Posted Jobs', icon: Briefcase },
];

export default function AdminSidebar() {
    const location = useLocation();
    const { logout } = useAuth();

    return (
        <aside className="w-64 bg-card border-r border-border min-h-screen hidden lg:flex flex-col">
            <div className="p-5 border-b border-border">
                <Link to="/admin" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                        <span className="font-bold text-foreground text-sm">TutorHub</span>
                        <span className="text-[10px] text-muted-foreground block -mt-0.5">Admin Panel</span>
                    </div>
                </Link>
            </div>
            <nav className="flex-1 p-3 space-y-0.5">
                {links.map(link => {
                    const active = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                        >
                            <link.icon className="w-4 h-4" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-3 border-t border-border">
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}