import { useEffect, useState } from 'react';
import { getApiUrl, normalizeListResponse } from '../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl('workouts'));
        if (!response.ok) {
          throw new Error(`Failed to fetch workouts (${response.status})`);
        }

        const payload = await response.json();
        setWorkouts(normalizeListResponse(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-info text-dark">
        <h2 className="h5 mb-0">Workouts</h2>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {workouts.map((workout) => (
            <li key={workout._id || workout.id} className="list-group-item">
              <strong>{workout.title}</strong>
              <div className="text-muted small">
                {workout.difficulty} · {workout.durationMinutes ?? workout.duration} min
              </div>
              {workout.focus && <div className="small text-secondary">Focus: {workout.focus}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
