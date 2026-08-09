import Layout from '../../components/Layout.jsx';
import { useAuth } from '../auth/AuthContext.jsx';
import TodoList from './TodoList.jsx';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <Layout>
      <h1 className="font-display text-3xl text-paper mb-2">
        Welcome, {user?.name}
      </h1>
      <p className="text-muted mb-8">Here's your overview for today.</p>
      <TodoList />
    </Layout>
  );
}

export default DashboardPage;