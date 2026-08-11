import { useEffect, useState } from 'react';
import { getApiUrl, normalizeListResponse } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(getApiUrl('users'));
        if (!response.ok) {
          throw new Error(`Failed to fetch users (${response.status})`);
        }

        const payload = await response.json();
        setUsers(normalizeListResponse(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h2 className="h5 mb-0">Users</h2>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li key={user._id || user.id} className="list-group-item">
              <strong>{user.name}</strong>
              <div className="text-muted small">{user.email}</div>
              {user.teamId && (
                <div className="small text-secondary">
                  Team: {typeof user.teamId === 'object' ? user.teamId.name : user.teamId}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
