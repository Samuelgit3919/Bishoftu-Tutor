import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { base44 } from '@/api/base44Client';
import { GraduationCap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout() {
    const [authState, setAuthState] = useState('loading'); // 'loading' | 'authenticated' | 'unauthenticated'
    const [user, setUser] = useState(null);

    useEffect(() => {
        base44.auth.me()
            .then(u => {
                setUser(u);
                setAuthState('authenticated');
            })
            .catch(() => {
                setAuthState('unauthenticated');
            });
    }, []);

    if (authState === 'loading') {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (authState === 'unauthenticated') {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background px-4">
                <div className="max-w-sm w-full text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5">
                        <GraduationCap className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Admin Dashboard</h1>
                    <p className="text-muted-foreground text-sm mb-6">
                        Sign in to your account to access the admin panel. New admins must be invited by an existing admin.
                    </p>
                    <div className="space-y-3">
                        <Button
                            className="w-full gap-2 rounded-xl h-11"
                            onClick={() => base44.auth.redirectToLogin(window.location.href)}
                        >
                            <Lock className="w-4 h-4" />
                            Sign In to Admin
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                        Don't have an account? Contact an existing admin to get invited.
                    </p>
                </div>
            </div>
        );
    }

    // Only allow admin role users
    if (user?.role !== 'admin') {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background px-4">
                <div className="max-w-sm w-full text-center">
                    <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-5">
                        <Lock className="w-8 h-8 text-destructive" />
                    </div>
                    <h1 className="text-xl font-bold text-foreground mb-2">Access Denied</h1>
                    <p className="text-muted-foreground text-sm mb-6">
                        Your account does not have admin privileges. Please contact an administrator.
                    </p>
                    <Button variant="outline" className="w-full rounded-xl" onClick={() => base44.auth.logout('/')}>
                        Go Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <AdminHeader />
                <main className="flex-1 p-4 sm:p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}