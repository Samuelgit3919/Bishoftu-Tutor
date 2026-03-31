import { Toaster } from "@/components/ui/sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { LanguageProvider } from '@/lib/i18n.jsx';
import { ThemeProvider } from '@/lib/theme.jsx';

// Public pages
import PublicLayout from '@/components/layout/PublicLayout';
import Landing from '@/pages/Landing';
import RequestTutor from '@/pages/RequestTutor';
import BecomeTutor from '@/pages/BecomeTutor';
import AIExperience from '@/pages/AIExperience';

// Admin pages
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import Requests from '@/pages/admin/Requests';
import Applications from '@/pages/admin/Application';
import Tutors from '@/pages/admin/Tutors';
import Assignments from '@/pages/admin/Assignments';
import PostedJobs from '@/pages/admin/PostedJob';
import Jobs from '@/pages/Jobs';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/request-tutor" element={<RequestTutor />} />
        <Route path="/become-tutor" element={<BecomeTutor />} />
        <Route path="/ai-experience" element={<AIExperience />} />
        <Route path="/jobs" element={<Jobs />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="requests" element={<Requests />} />
        <Route path="applications" element={<Applications />} />
        <Route path="tutors" element={<Tutors />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="posted-jobs" element={<PostedJobs />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <ThemeProvider>
          <LanguageProvider>
            <Router>
              <AuthenticatedApp />
            </Router>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App