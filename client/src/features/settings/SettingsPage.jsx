import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout.jsx';
import { useAuth } from '../auth/AuthContext.jsx';
import { updateProfileRequest, updatePreferencesRequest, deleteAccountRequest } from '../../api/userApi.js';

function SettingsPage() {
  const { user, logout, setTheme: setGlobalTheme } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [theme, setTheme] = useState(user?.preferences?.theme || 'dark');
  const [pomodoroDuration, setPomodoroDuration] = useState(user?.preferences?.pomodoroDuration || 25);
  const [profileMessage, setProfileMessage] = useState('');
  const [prefsMessage, setPrefsMessage] = useState('');

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileMessage('');
    try {
      await updateProfileRequest({ name });
      setProfileMessage('Profile updated.');
    } catch (err) {
      setProfileMessage('Failed to update profile.');
    }
  };

  const handlePrefsSave = async (e) => {
  e.preventDefault();
  setPrefsMessage('');
  try {
    await updatePreferencesRequest({ theme, pomodoroDuration: Number(pomodoroDuration) });
    setGlobalTheme(theme);
    setPrefsMessage('Preferences updated.');
  } catch (err) {
    setPrefsMessage('Failed to update preferences.');
  }
};

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This cannot be undone.'
    );
    if (!confirmed) return;

    await deleteAccountRequest();
    await logout();
    navigate('/register');
  };

  return (
    <Layout>
      <h1 className="font-display text-3xl text-paper mb-8">Settings</h1>

      <div className="grid gap-8 md:grid-cols-2 max-w-3xl">
        <form
          onSubmit={handleProfileSave}
          className="p-6 rounded bg-surface border border-border space-y-4"
        >
          <h2 className="font-display text-xl text-paper mb-2">Profile</h2>

          <div>
            <label className="block text-sm text-muted mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded bg-ink border border-border text-paper focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-3 py-2 rounded bg-ink border border-border text-muted opacity-60"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-accent hover:bg-accent-hover text-paper font-medium transition-colors"
          >
            Save Profile
          </button>

          {profileMessage && <p className="text-sm text-sage">{profileMessage}</p>}
        </form>

        <form
          onSubmit={handlePrefsSave}
          className="p-6 rounded bg-surface border border-border space-y-4"
        >
          <h2 className="font-display text-xl text-paper mb-2">Preferences</h2>

          <div>
            <label className="block text-sm text-muted mb-1">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 rounded bg-ink border border-border text-paper focus:outline-none focus:border-accent"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Pomodoro Duration (minutes)</label>
            <input
              type="number"
              min="1"
              max="120"
              value={pomodoroDuration}
              onChange={(e) => setPomodoroDuration(e.target.value)}
              className="w-full px-3 py-2 rounded bg-ink border border-border text-paper focus:outline-none focus:border-accent"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-accent hover:bg-accent-hover text-paper font-medium transition-colors"
          >
            Save Preferences
          </button>

          {prefsMessage && <p className="text-sm text-sage">{prefsMessage}</p>}
        </form>
      </div>

      <div className="mt-8 p-6 rounded bg-surface border border-danger max-w-3xl">
        <h2 className="font-display text-xl text-paper mb-2">Danger Zone</h2>
        <p className="text-sm text-muted mb-4">
            Deleting your account is permanent and cannot be undone.
        </p>
        <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 rounded bg-danger hover:bg-danger-hover text-paper font-medium transition-colors"
        >
            Delete Account
        </button>
        </div>
    </Layout>
  );
}

export default SettingsPage;