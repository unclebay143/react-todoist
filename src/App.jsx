import { Route, Routes } from "react-router-dom";
import TodoDashboard from "./pages/TodoDashboard";
import SingleTodoPreview from "./pages/SingleTodoPreview";

function App() {
  return (
    <Routes>
      <Route path='/' element={<TodoDashboard />} />
      <Route path='/todo/:todo_id' element={<SingleTodoPreview />} />
    </Routes>
  );
}

export default App;
