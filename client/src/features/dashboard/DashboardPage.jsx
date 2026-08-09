import Layout from '../../components/Layout.jsx';
import { useAuth } from '../auth/AuthContext.jsx';
import TodoList from './TodoList.jsx';
import HabitList from './HabitList.jsx';
import PomodoroTimer from './PomodoroTimer.jsx';
import PlannerList from './PlannerList.jsx';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <Layout>
      <h1 className="font-display text-3xl text-paper mb-2">
        Welcome, {user?.name}
      </h1>
      <p className="text-muted mb-8">Here's your overview for today.</p>
      <div className="grid gap-8 md:grid-cols-3">
        <PomodoroTimer />
        <TodoList />
        <HabitList />
        <PlannerList />
      </div>
    </Layout>
  );
}

export default DashboardPage;