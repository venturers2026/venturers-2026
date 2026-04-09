import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Cursor from './components/Cursor';
import AdminRouteGuard from './components/AdminRouteGuard';
import { getAdminSession } from './lib/adminSession';
import AdminAuthPage from './pages/AdminAuthPage';
import AdminPanelPage from './pages/AdminPanelPage';
import LandingPage from './pages/LandingPage';
import PendingRequestsPage from './pages/PendingRequestsPage';
import ParticipantsAnalysisPage from './pages/ParticipantsAnalysisPage';

function AdminEntryRedirect() {
  const session = getAdminSession();
  return <Navigate to={session.isAuthenticated ? '/admin/panel' : '/admin/auth'} replace />;
}

export default function App() {
  return (
    <>
      <Cursor />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminEntryRedirect />} />
        <Route path="/admin/auth" element={<AdminAuthPage />} />

        <Route element={<AdminRouteGuard />}>
          <Route path="/admin/panel" element={<AdminPanelPage />} />
          <Route path="/admin/participants-analysis" element={<ParticipantsAnalysisPage />} />
          <Route path="/admin/pending-requests" element={<PendingRequestsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
