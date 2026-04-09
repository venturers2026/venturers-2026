import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/adminApi';
import { clearAdminToken, getAdminSession } from '../lib/adminSession';

export default function AdminShell({ title, subtitle, children }) {
  const navigate = useNavigate();
  const session = getAdminSession();

  const logout = async () => {
    try {
      await apiRequest('/api/admin/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network/logout errors and clear local session regardless.
    } finally {
      clearAdminToken();
      navigate('/admin/auth', { replace: true });
    }
  };

  return (
    <div className="admin-page-wrap">
      <div className="admin-page-noise" aria-hidden="true" />
      <header className="admin-topbar">
        <Link to="/" className="admin-brand">VENTURERS</Link>
        <nav className="admin-nav" aria-label="Admin navigation">
          <NavLink to="/admin/panel" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>Panel</NavLink>
          <NavLink to="/admin/participants-analysis" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>Participants Analysis</NavLink>
          <NavLink to="/admin/pending-requests" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>Pending Requests</NavLink>
        </nav>
        <div className="admin-meta">
          <span className="admin-chip">{session.email || 'Admin'}</span>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-section-head">
          <div className="admin-section-copy">
            <p className="admin-kicker">Organization Dashboard</p>
            <h1>{title}</h1>
            {subtitle ? <p className="admin-subtitle">{subtitle}</p> : null}
          </div>
          <button type="button" className="admin-logout-btn" onClick={logout}>Logout</button>
        </div>
        {children}
      </main>
    </div>
  );
}
