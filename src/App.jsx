import { Route, Routes } from "react-router-dom";
import TodoDashboard from "./pages/TodoDashboard";
import SingleTodoPreview from "./pages/SingleTodoPreview";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Profile from "./pages/dashboard/Profile";
import Index from "./pages/dashboard/Index";

function App() {
  return (
    <Routes>
      <Route path='/' element={<TodoDashboard />} />
      <Route path='/todo/:todo_id' element={<SingleTodoPreview />} />
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route index element={<Index />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
