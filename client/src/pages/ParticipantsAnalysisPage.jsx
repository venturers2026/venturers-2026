import React, { useEffect, useMemo, useState } from 'react';
import AdminShell from '../components/AdminShell';
import { apiRequest } from '../lib/adminApi';
import { getAdminSession, hasPermission } from '../lib/adminSession';
import { EVENT_CATALOG } from '../lib/eventCatalog';

function normalizeParticipantEvents(eventsApplied) {
  if (Array.isArray(eventsApplied)) {
    return eventsApplied.map((eventName) => String(eventName).trim()).filter(Boolean);
  }

  if (typeof eventsApplied === 'string' && eventsApplied.trim()) {
    return eventsApplied.split(',').map((eventName) => eventName.trim()).filter(Boolean);
  }

  return [];
}

function formatEvents(eventsApplied) {
  const normalizedEvents = normalizeParticipantEvents(eventsApplied);
  return normalizedEvents.length > 0 ? normalizedEvents.join(', ') : '-';
}

export default function ParticipantsAnalysisPage() {
  const session = getAdminSession();
  const canView = hasPermission(session, 'VIEW');

  const [participants, setParticipants] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [selectedEventTitles, setSelectedEventTitles] = useState(
    EVENT_CATALOG.length > 0 ? [EVENT_CATALOG[0].title] : []
  );

  const loadParticipants = async () => {
    setBusy(true);
    setError('');

    try {
      const data = await apiRequest('/api/admin/panel/participants');
      setParticipants(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || 'Unable to fetch participants for analysis.');
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!canView) {
      setBusy(false);
      return;
    }

    loadParticipants();
  }, [canView]);

  const filteredParticipants = useMemo(() => {
    if (selectedEventTitles.length === 0) return [];

    const uniqueParticipants = new Map();

    participants.forEach((participant) => {
      const participantEvents = normalizeParticipantEvents(participant.eventsApplied);
      const matchesAllSelectedEvents = selectedEventTitles.every((eventTitle) => participantEvents.includes(eventTitle));

      if (!matchesAllSelectedEvents) return;

      const participantKey = participant.id ?? participant.email;
      if (!uniqueParticipants.has(participantKey)) {
        uniqueParticipants.set(participantKey, participant);
      }
    });

    return Array.from(uniqueParticipants.values());
  }, [participants, selectedEventTitles]);

  const selectedEventsLabel = selectedEventTitles.length > 0
    ? selectedEventTitles.join(', ')
    : 'No events selected';

  const toggleEventSelection = (eventTitle) => {
    setSelectedEventTitles((prev) => (
      prev.includes(eventTitle)
        ? prev.filter((title) => title !== eventTitle)
        : [...prev, eventTitle]
    ));
  };

  return (
    <AdminShell
      title="Participants Analysis"
      subtitle="Filter registered participants by event combinations and inspect overlaps across the full event list."
    >
      {!canView ? (
        <p className="admin-msg err">Your account does not have VIEW permission for participant analysis.</p>
      ) : (
        <div className="admin-analysis-panel">
          <section className="admin-filter-panel" aria-labelledby="participants-analysis-filters">
            <p className="admin-filter-label" id="participants-analysis-filters">Select Events</p>
            <div className="admin-event-filter-row" role="group" aria-label="Event filters">
              {EVENT_CATALOG.map((eventItem) => {
                const isSelected = selectedEventTitles.includes(eventItem.title);

                return (
                  <button
                    key={eventItem.id}
                    type="button"
                    className={`admin-event-chip ${isSelected ? 'active' : ''}`}
                    aria-pressed={isSelected}
                    onClick={() => toggleEventSelection(eventItem.title)}
                  >
                    {eventItem.title}
                  </button>
                );
              })}
            </div>
          </section>

          <div className="admin-analysis-summary">
            <article className="admin-stat-card">
              <span>Total Participants</span>
              <strong>{selectedEventTitles.length > 0 ? filteredParticipants.length : 0}</strong>
            </article>

            <div className="admin-analysis-selection">
              {selectedEventTitles.length > 0 ? (
                <p>Showing participants registered for: <strong>{selectedEventsLabel}</strong></p>
              ) : (
                <p>Select one or more events to view matching participants.</p>
              )}
            </div>
          </div>

          {error ? <p className="admin-msg err">{error}</p> : null}

          <div className="admin-table-wrap">
            {busy ? (
              <p className="admin-analysis-empty">Loading participants...</p>
            ) : selectedEventTitles.length === 0 ? (
              <p className="admin-analysis-empty">Select at least one event to start the analysis.</p>
            ) : filteredParticipants.length === 0 ? (
              <p className="admin-analysis-empty">No participants match the selected event combination.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Events Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.map((participant) => (
                    <tr key={participant.id ?? participant.email}>
                      <td>{participant.firstName} {participant.lastName}</td>
                      <td>{participant.phoneNumber}</td>
                      <td>{participant.email}</td>
                      <td className="admin-cell-wrap">{formatEvents(participant.eventsApplied)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
