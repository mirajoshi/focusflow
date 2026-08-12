import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext.jsx';

function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-ink flex">
      <aside className="w-64 border-r border-border flex flex-col shrink-0">
        <div className="px-6 py-5 flex items-center gap-2 border-b border-border">
          <Sparkles size={20} className="text-accent" />
          <span className="font-display text-xl text-paper">FocusFlow</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-accent text-paper'
                    : 'text-muted hover:bg-surface hover:text-paper'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-border">
          {user && (
            <div className="px-3 py-2 mb-1">
              <p className="text-sm text-paper font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:bg-surface hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 px-8 py-8 overflow-y-auto">{children}</main>
    </div>
  );
}

export default Layout;