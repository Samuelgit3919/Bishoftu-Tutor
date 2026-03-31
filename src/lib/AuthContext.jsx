import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockAuth } from '@/lib/mockApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [appPublicSettings, setAppPublicSettings] = useState({ name: 'TutorHub' });

    useEffect(() => {
        checkUserAuth();
    }, []);

    const checkAppState = async () => {
        checkUserAuth();
    };

    const checkUserAuth = async () => {
        try {
            setIsLoadingAuth(true);
            const currentUser = await mockAuth.me();
            setUser(currentUser);
            setIsAuthenticated(true);
            setIsLoadingAuth(false);
            setAuthError(null);
        } catch (error) {
            console.warn('User auth check failed:', error.message);
            setIsLoadingAuth(false);
            setIsAuthenticated(false);

            if (window.location.pathname.startsWith('/admin')) {
                setAuthError({
                    type: 'auth_required',
                    message: 'Authentication required'
                });
            }
        }
    };

    const login = async (email, password) => {
        setIsLoadingAuth(true);
        try {
            await mockAuth.login(email, password);
            await checkUserAuth();
            return true;
        } catch (error) {
            setIsLoadingAuth(false);
            throw error;
        }
    };

    const logout = (shouldRedirect = true) => {
        setUser(null);
        setIsAuthenticated(false);
        mockAuth.logout();
    };

    const navigateToLogin = () => {
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isLoadingAuth,
            isLoadingPublicSettings,
            authError,
            appPublicSettings,
            login,
            logout,
            navigateToLogin,
            checkAppState
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
