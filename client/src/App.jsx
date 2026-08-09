import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './features/auth/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;