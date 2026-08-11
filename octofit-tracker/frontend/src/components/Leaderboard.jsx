import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeListResponse } from '../lib/api';

const leaderboardUrl = `${getApiBaseUrl()}-8000.app.github.dev/api/leaderboard/`;

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(leaderboardUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard (${response.status})`);
        }

        const payload = await response.json();
        setEntries(normalizeListResponse(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white">
        <h2 className="h5 mb-0">Leaderboard</h2>
      </div>
      <div className="card-body">
        <ol className="mb-0 ps-3">
          {entries.map((entry, index) => (
            <li key={entry._id || entry.id} className="mb-2">
              <strong>{entry.name || 'Anonymous'}</strong> — {entry.points} points
              {entry.teamName && <span className="text-muted small"> ({entry.teamName})</span>}
              {index === 0 && <span className="badge bg-warning text-dark ms-2">Top</span>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
