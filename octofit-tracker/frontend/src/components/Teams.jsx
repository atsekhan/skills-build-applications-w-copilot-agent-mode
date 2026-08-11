import { useEffect, useState } from 'react';
import { getApiUrl, normalizeListResponse } from '../lib/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(getApiUrl('teams'));
        if (!response.ok) {
          throw new Error(`Failed to fetch teams (${response.status})`);
        }

        const payload = await response.json();
        setTeams(normalizeListResponse(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        <h2 className="h5 mb-0">Teams</h2>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {teams.map((team) => (
            <li key={team._id || team.id} className="list-group-item">
              <strong>{team.name}</strong>
              <div className="text-muted small">Points: {team.points}</div>
              <div className="small text-secondary">Members: {(team.members || []).length}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
