import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeListResponse } from '../lib/api';

const activitiesUrl = `${getApiBaseUrl()}-8000.app.github.dev/api/activities/`;

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(activitiesUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch activities (${response.status})`);
        }

        const payload = await response.json();
        setActivities(normalizeListResponse(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-warning text-dark">
        <h2 className="h5 mb-0">Activities</h2>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {activities.map((activity) => (
            <li key={activity._id || activity.id} className="list-group-item">
              <strong>{activity.type}</strong>
              <div className="text-muted small">
                {activity.durationMinutes ?? activity.duration} min · {activity.points} pts
              </div>
              {activity.userId && (
                <div className="small text-secondary">
                  User: {typeof activity.userId === 'object' ? activity.userId.name : activity.userId}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
