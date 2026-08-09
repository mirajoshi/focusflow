import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext.jsx';

function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-ink">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="font-display text-xl text-paper">FocusFlow</span>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm text-muted">{user.name}</span>}
          <button
            onClick={handleLogout}
            className="text-sm text-accent hover:text-accent-hover"
          >
            Log out
          </button>
        </div>
      </nav>
      <main className="px-6 py-8">{children}</main>
    </div>
  );
}

export default Layout;