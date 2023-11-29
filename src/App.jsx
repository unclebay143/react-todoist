import { Route, Routes } from "react-router-dom";
import TodoDashboard from "./pages/TodoDashboard";
import SingleTodoPreview from "./pages/SingleTodoPreview";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import Playground from "./pages/Playground";

function App() {
  return (
    <Routes>
      <Route path='/' element={<TodoDashboard />} />
      <Route path='/todo/:todo_id' element={<SingleTodoPreview />} />
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route index element={<DashboardIndex />} />
        <Route path='profile' element={<Profile />} />
        <Route path='settings' element={<Settings />} />
      </Route>
      <Route path='/playground' element={<Playground />} />
    </Routes>
  );
}

export default App;
