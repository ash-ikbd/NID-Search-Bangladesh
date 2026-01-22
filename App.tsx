import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, DataProvider, useAuth } from './services/store';
import { Layout } from './components/Layout';
import { LandingPage, AuthPage, WaitingPage } from './pages/Public';
import { AdminDashboard, UserManagement } from './pages/Admin';
import { VoterList, VoterSearch } from './pages/Voter';
import { 
  PrivacyPolicy, TermsOfService, DataUsage, 
  HelpCenter, Documentation, ContactOfficials, ReportIssue,
  ApiAccess, DataSecurity, StatusCheck 
} from './pages/StaticPages';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div className="h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-bd-green border-t-transparent rounded-full animate-spin"></div></div>;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (user.status === 'pending' && location.pathname !== '/waiting') return <Navigate to="/waiting" replace />;
  if (user.status === 'approved' && location.pathname === '/waiting') return <Navigate to="/dashboard" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" replace />;

  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/register" element={<AuthPage type="register" />} />
            <Route path="/waiting" element={<WaitingPage />} />
            
            {/* Static Pages */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/data-usage" element={<DataUsage />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/contact" element={<ContactOfficials />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            <Route path="/api-access" element={<ApiAccess />} />
            <Route path="/data-security" element={<DataSecurity />} />
            <Route path="/status" element={<StatusCheck />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                {/* Default user dashboard is Search */}
                <VoterSearch /> 
              </ProtectedRoute>
            } />
            
            <Route path="/search" element={
              <ProtectedRoute>
                <VoterSearch />
              </ProtectedRoute>
            } />

            <Route path="/voters" element={
              <ProtectedRoute>
                <VoterList />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
             <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserManagement />
              </ProtectedRoute>
            } />
          </Routes>
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;