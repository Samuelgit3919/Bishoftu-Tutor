import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useAuth } from '@/lib/AuthContext';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout() {
    const { user, isAuthenticated, isLoadingAuth, navigateToLogin } = useAuth();

    if (isLoadingAuth) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Allow admin and administrator mock roles
    if (user?.role !== 'admin' && user?.role !== 'administrator') {
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
                    <Button variant="outline" className="w-full rounded-xl" onClick={() => window.location.href = '/'}>
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